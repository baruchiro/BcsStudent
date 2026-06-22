#!/usr/bin/env bash
#
# Re-vendor the skills listed in .github/skills-sources.json from their
# upstream GitHub repositories into .claude/skills/<name>.
#
# Each skill is a plain copy (not a symlink) so its contents stay committed
# and reviewable in the diff. The workflow that calls this opens a PR only
# when the copy differs from what is already committed.
#
# SECURITY: vendored skills are instructions Claude will follow. Whoever
# reviews the resulting PR must read the diff for newly introduced scripts,
# network calls, install hooks, or prompt-injection before merging.

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

manifest=".github/skills-sources.json"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

count="$(jq 'length' "$manifest")"
for i in $(seq 0 $((count - 1))); do
  name="$(jq -r ".[$i].name" "$manifest")"
  repo="$(jq -r ".[$i].repo" "$manifest")"
  ref="$(jq -r ".[$i].ref" "$manifest")"
  path="$(jq -r ".[$i].path" "$manifest")"

  echo "==> $name  <-  $repo@$ref:$path"

  tarball="$tmp/$name.tgz"
  extract="$tmp/$name"
  mkdir -p "$extract"

  # codeload serves a tarball of the repo at the given ref.
  curl -fsSL -o "$tarball" \
    "https://codeload.github.com/$repo/tar.gz/refs/heads/$ref"
  tar xzf "$tarball" -C "$extract"

  # Tarball extracts to <repo>-<ref>/...; locate the skill directory inside.
  src="$(find "$extract" -type d -path "*/$path" | head -1)"
  if [ -z "$src" ]; then
    echo "ERROR: '$path' not found in $repo@$ref" >&2
    exit 1
  fi

  dest=".claude/skills/$name"
  rm -rf "$dest"
  mkdir -p "$dest"
  cp -R "$src/." "$dest/"
done

echo "Done. Working tree changes (if any):"
git status --short .claude/skills
