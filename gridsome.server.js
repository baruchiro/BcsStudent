// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const privateSocialLinks = [
  'mailto:baruchiro@gmail.com',
  'https://github.com/baruchiro',
  'https://www.linkedin.com/in/baruch-rothkoff/',
  'https://twitter.com/baruchiro',
  'https://stackoverflow.com/users/839513/baruchiro'
]

const blogSocialLinks = [
  'https://www.facebook.com/BcsStudentBlog',
  'https://twitter.com/BcsStudent1',
  'https://github.com/baruchiro/BcsStudent',
  '/feed.xml'
]

const tagDescriptions = {
  Idea: `רעיונות שעולים לי בראש, אבל אין לי זמן לפתח אותם.
אני חושב שבמקום לפתח עוד מחשבון כשלומדים שפת תכנות, אפשר לקחת כפרויקט את אחד מהרעיונות האלה.
אני אעזור בשמחה למי שמעוניין לבצע את אחד הרעיונות.`
}

module.exports = function (api) {
  api.loadSource(({ addCollection, addSchemaResolvers }) => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api/

    const socialCollection = addCollection('Social')

    privateSocialLinks.forEach((link) => {
      socialCollection.addNode({
        link,
        blog: false
      })
    })

    blogSocialLinks.forEach((link) => {
      socialCollection.addNode({
        link,
        blog: true
      })
    })

    addSchemaResolvers({
      Tag: {
        description: {
          type: 'String',
          resolve: ({ id }) => {
            return tagDescriptions[id]
          }
        }
      }
    })
  })
}
