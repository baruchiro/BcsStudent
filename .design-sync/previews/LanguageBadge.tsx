import { LanguageBadge } from 'BscStudent'

export const Languages = () => (
  <div className="flex flex-wrap items-center gap-2">
    <LanguageBadge language="TypeScript" color="#3178c6" />
    <LanguageBadge language="Python" color="#3572A5" />
    <LanguageBadge language="Go" color="#00ADD8" />
    <LanguageBadge language="JavaScript" color="#f1e05a" />
  </div>
)

export const Single = () => <LanguageBadge language="TypeScript" color="#3178c6" />
