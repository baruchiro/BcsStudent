import { genPageMetadata } from '@/app/seo'
import DirectionWrapper from '@/components/DirectionWrapper'
import SocialIcon, { SocialKind } from '@/components/social-icons'
import Tag from '@/components/Tag'
import { allCommunities } from 'contentlayer/generated'
import Image from 'next/image'

export const metadata = genPageMetadata({ title: 'קהילות' })

export default function CommunitiesPage() {
  return (
    <DirectionWrapper>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            קהילות
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            קהילות שאפשר למצוא אותי בהן
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {allCommunities.map((community) => (
              <div
                key={community.slug}
                className="m-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={community.image}
                    alt={community.name}
                    width={120}
                    height={120}
                    className="mb-4 rounded-full object-cover"
                  />
                  <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {community.name}
                  </h2>
                  <p className="mb-2 text-center text-gray-700 dark:text-gray-300">
                    {community.description}
                  </p>
                  <div className="mb-2 flex flex-wrap justify-center gap-2">
                    {community.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(community.links).map(([network, link]) => (
                      <SocialIcon
                        key={network}
                        kind={network as SocialKind}
                        href={link as string}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DirectionWrapper>
  )
}
