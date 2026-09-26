import { parse } from 'csv-parse/sync'
import { readFileSync, writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import { join } from 'path'

// Read the CSV file
const csvContent = readFileSync('One Dollar Apps Ideas.csv', 'utf-8')

// Parse CSV content
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
})

// Create MDX files for each record
records.forEach((record) => {
  const { Name, Description, Tags, 'More Info': moreInfo, done } = record

  // Skip if no name or description
  if (!Name || !Description) {
    console.warn('Skipping record due to missing name or description:', record)
    return
  }

  // Create slug from name
  const fileSlug = slug(Name)

  // Parse tags and ensure 'idea' tag is included
  const tagList = Tags ? Tags.split(',').map((tag) => tag.trim()) : []
  if (!tagList.includes('idea')) {
    tagList.push('idea')
  }

  // Extract first paragraph as summary
  const summary = Description.split('\n\n')[0].trim()

  // Create external links array
  const externalLinks = []
  if (moreInfo) {
    externalLinks.push(moreInfo)
  }

  // Determine status
  const status = done === 'done' ? 'done' : 'draft'

  // Create frontmatter
  const frontmatter = {
    title: Name,
    date: new Date().toISOString().split('T')[0], // Current date as YYYY-MM-DD
    tags: tagList,
    status,
    externalLinks,
    implementation: '',
    summary: summary.replace(/'/g, "''").replace(/\n/g, ' '), // Escape single quotes and remove newlines
  }

  // Create MDX content with properly escaped values
  const mdxContent = `---
title: '${frontmatter.title.replace(/'/g, "''")}'
date: ${frontmatter.date}
tags: [${frontmatter.tags.map((t) => `'${t}'`).join(', ')}]
status: ${frontmatter.status}
externalLinks: [${frontmatter.externalLinks.map((link) => `'${link.replace(/'/g, "''")}'`).join(', ')}]
implementation: '${frontmatter.implementation}'
summary: '${frontmatter.summary}'
---

${Description}
`

  // Write to file
  const filePath = join('data', 'blog', 'ideas', `${fileSlug}.mdx`)
  writeFileSync(filePath, mdxContent, 'utf-8')
  console.log(`Created ${filePath}`)
})

console.log('Migration complete!')
