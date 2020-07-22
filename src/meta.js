const prefixes = ['', 'og:', 'twitter:']

const createMetaTags = (tagName, value) => prefixes.map((prefix) => ({
    property: prefix + tagName,
    name: prefix + tagName,
    content: value
}))

export default (title, description, image, imageWidth, imageHeight) => {

    const meta = []

    if (title) meta.push(...createMetaTags('title', title))
    if (description) meta.push(...createMetaTags('description', description))
    if (image) meta.push(...createMetaTags('image', image))

    if (imageWidth) meta.push(...createMetaTags('image:width', imageWidth))
    if (imageHeight) meta.push(...createMetaTags('image:height', imageHeight))

    meta.push({
        property: 'twitter:card',
        content: image ? 'summary_large_image' : 'summary'
    })

    return meta
}