'use client'

import { Blog, Project, Video } from 'contentlayer2/generated'
import { useRouter } from 'next/navigation'
import { KBarSearchProvider } from 'pliny/search/KBar'

export const SearchProvider = ({ children }) => {
  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h', 'h'],
            section: 'Home',
            perform: () => router.push('/'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p'],
            section: 'Home',
            perform: () => router.push('/projects'),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((item: Blog | Video | Project) => {
            if (item.type === 'Video') {
              return {
                id: item.url,
                name: item.title,
                keywords: [item.summary, item.tags?.join(' ')].filter(Boolean).join(' '),
                section: 'Video',
                subtitle: item.tags?.join(', '),
                perform: () => window.open(item.url, '_blank', 'noopener,noreferrer'),
              }
            }
            if (item.type === 'Project') {
              return {
                id: item.slug,
                name: item.title,
                keywords: [item.description, item.tags?.join(' ')].filter(Boolean).join(' '),
                section: 'Project',
                subtitle: item.tags?.join(', '),
                perform: () =>
                  item.href
                    ? window.open(item.href, '_blank', 'noopener,noreferrer')
                    : router.push('/projects'),
              }
            }
            return {
              id: item.path,
              name: item.title,
              keywords: item.body.raw,
              section: 'Blog',
              subtitle: item.tags.join(', '),
              perform: () => router.push('/' + item.path),
            }
          })
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
