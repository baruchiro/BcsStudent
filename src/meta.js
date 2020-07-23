export default (url, title, description, image, imageWidth, imageHeight) => {

    const meta = []

    if (url)
        meta.push({
            property: 'og:url',
            content: url
        })

    if (title)
        meta.push(
            {
                name: 'title',
                content: title
            },
            {
                property: 'og:title',
                content: title
            }
        )

    if (description)
        meta.push(
            {
                name: 'description',
                content: description
            },
            {
                property: 'og:description',
                content: description
            }
        )

    if (image)
        meta.push(
            {
                property: 'og:image',
                content: image
            }
        )

    if (imageWidth)
        meta.push({
            property: 'og:image:width',
            content: imageWidth
        })

    if (imageHeight)
        meta.push({
            property: 'og:image:height',
            content: imageHeight
        })


    meta.push({
        name: 'twitter:card',
        content: image ? 'summary_large_image' : 'summary'
    })

    return meta
}