import { StatusComponent } from 'BscStudent'

export const DoneWithLink = () => (
  <div dir="rtl">
    <StatusComponent status="done" implementation="https://github.com/baruchiro/actual-mcp" />
  </div>
)

export const Done = () => (
  <div dir="rtl">
    <StatusComponent status="done" />
  </div>
)

export const InProgress = () => (
  <div dir="rtl">
    <StatusComponent status="in-progress" />
  </div>
)
