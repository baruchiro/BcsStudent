import { slug } from 'github-slugger'
import Link from 'next/link'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`} className="link-primary mr-3 text-sm font-medium uppercase">
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
