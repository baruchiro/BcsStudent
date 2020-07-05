// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'ברוך אודם - B.Cs Student',
  siteDescription: 'Be a Computer Science student',

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
          }
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
