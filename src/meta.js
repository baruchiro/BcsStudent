export default (baseUrl, {
    path,
    title,
    description,
    image,
    twitterImage
}) => {
    const meta = []

    meta.push({
        property: 'og:url',
        content: baseUrl + (path || '')
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

    if (image) {
        meta.push({
            property: 'og:image',
            content: image.path
        })

        meta.push({
            name: 'twitter:image',
            content: baseUrl.replace('https', 'https') + twitterImage
        })

        meta.push({
            name: 'twitter:card',
            content: 'summary_large_image'
        })

        if (image.width)
            meta.push({
                property: 'og:image:width',
                content: image.width
            })

        if (image.height)
            meta.push({
                property: 'og:image:height',
                content: image.height
            })
    }

    meta.push({
        name: 'twitter:creator',
        content: '@baruchiro'
    })

    meta.push({
        name: 'author',
        content: 'Baruch Odem'
    })

    return meta
}