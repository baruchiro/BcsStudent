import { YouTubeShort } from 'BscStudent'

// NOTE: renders a youtube-nocookie <iframe>. It loads live in the real
// claude.ai/design browser; the offline render-check sandbox shows it empty
// (recorded as a known network-dependent warn in NOTES.md).
export const Default = () => (
  <div dir="rtl">
    <YouTubeShort id="pRpeEdMmmQ0" />
  </div>
)
