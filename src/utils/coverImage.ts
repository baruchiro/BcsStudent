export const getCoverImage = <T extends string | string[] | undefined>(images: T) => {
  if (Array.isArray(images)) {
    return images[0]
  }
  return images as string
}
