import { Tag } from 'BscStudent'

export const Group = () => (
  <div dir="rtl" className="flex flex-wrap items-center gap-1">
    <Tag text="קוד פתוח" />
    <Tag text="mcp" />
    <Tag text="ai" />
    <Tag text="git" />
  </div>
)

export const Single = () => <Tag text="typescript" />
