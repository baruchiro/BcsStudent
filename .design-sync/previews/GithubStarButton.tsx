import { GithubStarButton } from 'BscStudent'

// NOTE: the real react-github-btn widget loads an external buttons.github.io
// iframe; in the sandbox it's replaced by a static, on-brand Star button shim
// (see .design-sync/shims/github-btn.tsx and NOTES.md).
export const Default = () => (
  <div dir="ltr">
    <GithubStarButton href="https://github.com/Checkmarx/2ms" />
  </div>
)
