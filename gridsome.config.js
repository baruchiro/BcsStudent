// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const siteName = 'ברוך אודם - B.Cs Student'
const siteDescription = 'Be a Computer Science student'
const siteUrl = process.env.URL || 'http://localhost:8080'

module.exports = {
  siteName,
  siteDescription,
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
      use: 'gridsome-plugin-feed',
      options: {
        // Required: array of `GraphQL` type names you wish to include
        contentTypes: ['Post'],
        // Optional: any properties you wish to set for `Feed()` constructor
        // See https://www.npmjs.com/package/feed#example for available properties
        feedOptions: {
          title: siteName,
          description: siteDescription,
          id: siteUrl,
          link: siteUrl,
          language: 'he',
          image: `${siteUrl}/logo/LOGO.png`,
          feedLinks: {
            json: "https://example.com/json",
            atom: "https://example.com/atom"
          },
          author: {
            name: "ברוך אודם",
            email: "baruchiro@gmail.com",
            link: siteUrl
          }
        },
        // === All options after this point show their default values ===
        // Optional; opt into which feeds you wish to generate, and set their output path
        rss: {
          enabled: true,
          output: '/feed.xml'
        },
        atom: {
          enabled: false,
          output: '/feed.atom'
        },
        json: {
          enabled: false,
          output: '/feed.json'
        },
        // Optional: the maximum number of items to include in your feed
        maxItems: 25,
        // Optional: an array of properties passed to `Feed.addItem()` that will be parsed for
        // URLs in HTML (ensures that URLs are full `http` URLs rather than site-relative).
        // To disable this functionality, set to `null`.
        htmlFields: null,
        // Optional: if you wish to enforce trailing slashes for site URLs
        enforceTrailingSlashes: false,
        // Optional: a method that accepts a node and returns true (include) or false (exclude)
        // Example: only past-dated nodes: `filterNodes: (node) => node.date <= new Date()`
        filterNodes: (node) => node.published,
        // Optional: a method that accepts a node and returns an object for `Feed.addItem()`
        // See https://www.npmjs.com/package/feed#example for available properties
        // NOTE: `date` field MUST be a Javascript `Date` object
        nodeToFeedItem: (node) => ({
          ...node,
          image: node.cover_image
        })
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
