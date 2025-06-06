import { writeFileSync } from 'fs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import {
  allAuthors,
  allBlogs,
  allCommunities,
  allProjects,
} from '../.contentlayer/generated/index.mjs'

function omitBody(post) {
  return { ...post, body: undefined }
}

async function generateJSON() {
  // allBlogs: omit body.raw, sort as in RSS
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  const sortedBlogs = sortPosts(publishPosts)
  const blogsNoBodyRaw = sortedBlogs.map(omitBody)
  writeFileSync('./public/allBlogs.json', JSON.stringify(blogsNoBodyRaw, null, 2))

  // allAuthors
  writeFileSync('./public/allAuthors.json', JSON.stringify(allAuthors, null, 2))

  // allCommunities
  writeFileSync('./public/allCommunities.json', JSON.stringify(allCommunities, null, 2))

  // allProjects
  writeFileSync('./public/allProjects.json', JSON.stringify(allProjects, null, 2))

  console.log('JSON endpoints generated...')
}

const json = async () => {
  await generateJSON()
  console.log('JSON endpoints generated...')
}
export default json
