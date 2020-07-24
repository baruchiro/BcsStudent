// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const siteName = 'ברוך אודם - B.Cs Student'
const siteUrl = process.env.URL || 'http://localhost:8080'

module.exports = {
  siteName,
  siteDescription: 'Be a Computer Science student',
  siteUrl,

  templates: {
    Post: [
      {
        path: (node) => `/${node.fileInfo.name}`
      },
      {
        name: 'title',
        path: (node) => `/${node.title.split(' ').join('-').replace('?', '')}`
      },
      {
        name: 'date',
        path: '/:date'
      }
    ],
    Tag: '/tag/:id'
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/**/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          },
          author: {
            typeName: 'Author',
            create: true
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: siteName,
          feed_url: `${siteUrl}/rss.xml`,
          site_url: siteUrl
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: `${siteUrl}/${node.fileInfo.name}`,
          author: node.author || 'ברוך אודם'
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs',
        ['remark-align', {
          left: 'align-start',
          center: 'align-center',
          right: 'align-end',
        }]
      ]
    }
  }
}
