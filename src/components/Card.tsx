import GithubStarButton from './GithubStarButton'
import Image from './Image'
import LanguageBadge from './LanguageBadge'
import Link from './Link'
import Tag from './Tag'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  tags?: string[]
  language?: {
    name: string
    color: string
  }
}

const getGithubPreviewUrl = (href: string) => {
  try {
    const url = new URL(href)
    if (url.hostname === 'github.com') {
      const [username, repo] = url.pathname.split('/').filter(Boolean)
      return `https://opengraph.githubassets.com/1/${username}/${repo}`
    }
  } catch {
    return null
  }
  return null
}

const Card = ({ title, description, imgSrc, href, tags = [], language }: CardProps) => {
  const imageUrl = imgSrc || (href && getGithubPreviewUrl(href))

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imageUrl && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imageUrl &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imageUrl}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imageUrl}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <div className="flex items-center justify-between">
                <Link href={href} aria-label={`Link to ${title}`}>
                  {title}
                </Link>
                <div dir="ltr">
                  <GithubStarButton href={href} />
                </div>
              </div>
            ) : (
              title
            )}
          </h2>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
            {language && <LanguageBadge language={language.name} color={language.color} />}
          </div>
          <p className="prose mb-4 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex items-center justify-end">
            {href && (
              <Link
                href={href}
                className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
              >
                לפרויקט &larr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
