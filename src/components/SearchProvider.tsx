'use client'

import { Blog, Video } from 'contentlayer2/generated'
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
          return json.map((item: Blog | Video) => {
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
