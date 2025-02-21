import DirectionWrapper from '@/components/DirectionWrapper'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import type { Authors } from 'contentlayer/generated'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    githubSponsor,
    telegram,
    language = 'he',
  } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            אודות
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>

            <div className="flex space-x-3 pt-6">
              {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
              {twitter && <SocialIcon kind="twitter" href={twitter} size={6} />}
              {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
              {github && <SocialIcon kind="github" href={github} size={6} />}
              {telegram && <SocialIcon kind="telegram" href={telegram} size={6} />}
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <DirectionWrapper language={language}>{children}</DirectionWrapper>
            {githubSponsor && github && (
              <div className="not-prose pt-4">
                <iframe
                  src={`https://github.com/sponsors/${github.split('/').pop()}/card`}
                  title={`Sponsor ${name}`}
                  height="225"
                  width="600"
                  style={{ border: 0 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
