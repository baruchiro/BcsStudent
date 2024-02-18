export default (baseUrl, { path, title, summary, image, twitterImage }) => {
  const meta = [];

  meta.push({
    property: "og:url",
    content: baseUrl + (path || ""),
  });

  if (title)
    meta.push(
      {
        name: "title",
        content: title,
      },
      {
        property: "og:title",
        content: title,
      },
    );

  if (summary)
    meta.push(
      {
        name: "description",
        content: summary,
      },
      {
        property: "og:description",
        content: summary,
      },
    );

  if (image) {
    meta.push({
      property: "og:image",
      content: image.path,
    });

    meta.push({
      name: "twitter:image",
      content: baseUrl + image.path,
    });

    meta.push({
      name: "twitter:card",
      content: "summary_large_image",
    });

    if (image.width)
      meta.push({
        property: "og:image:width",
        content: image.width,
      });

    if (image.height)
      meta.push({
        property: "og:image:height",
        content: image.height,
      });
  }

  meta.push({
    name: "twitter:creator",
    content: "@baruchiro",
  });

  meta.push({
    name: "author",
    content: "Baruch Odem",
  });

  return meta;
};
