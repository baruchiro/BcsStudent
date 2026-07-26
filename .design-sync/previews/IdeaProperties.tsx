import { IdeaProperties } from 'BscStudent'

export const Full = () => (
  <div dir="rtl" className="max-w-xl">
    <IdeaProperties
      post={{
        isIdea: true,
        status: 'done',
        implementation: 'https://github.com/baruchiro/actual-mcp',
        externalLinks: [
          'https://modelcontextprotocol.io',
          'https://github.com/baruchiro/actual-mcp',
        ],
      }}
    />
  </div>
)

export const StatusOnly = () => (
  <div dir="rtl" className="max-w-xl">
    <IdeaProperties post={{ isIdea: true, status: 'in-progress' }} />
  </div>
)

export const LinksOnly = () => (
  <div dir="rtl" className="max-w-xl">
    <IdeaProperties
      post={{ isIdea: true, externalLinks: ['https://n8n.io', 'https://contentlayer.dev'] }}
    />
  </div>
)
