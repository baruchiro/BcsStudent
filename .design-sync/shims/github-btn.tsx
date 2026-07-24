import * as React from 'react'

// Bundle-time shim for `react-github-btn`. The real widget loads an external
// iframe from buttons.github.io that cannot populate in a sandboxed preview.
// This renders a static, visually faithful GitHub "Star" button so the
// enclosing component (GithubStarButton / Card) previews meaningfully.
type Props = { href?: string; children?: React.ReactNode; ['aria-label']?: string }
const GitHubButton = ({ href, children = 'Star', ...rest }: Props) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '14px',
      color: '#24292f',
      background: 'linear-gradient(180deg,#f6f8fa,#ebeef1)',
      border: '1px solid rgba(27,31,36,0.15)',
      borderRadius: '6px',
      padding: '3px 10px',
      whiteSpace: 'nowrap',
    }}
    {...rest}
  >
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
    {children}
    <span
      style={{
        marginInlineStart: '6px',
        paddingInlineStart: '6px',
        borderInlineStart: '1px solid rgba(27,31,36,0.15)',
        color: '#57606a',
      }}
    >
      128
    </span>
  </span>
)
export default GitHubButton
