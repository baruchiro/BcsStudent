import { genPageMetadata } from '@/app/seo'
import Card from '@/components/Card'
import { getEnhancedProjectsData } from '@/data/projectsData'

export const metadata = genPageMetadata({ title: 'פרויקטים' })

export default async function Projects() {
  const projectsData = await getEnhancedProjectsData()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            פרויקטים
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            מסודר לפי כוכבים בגיטהאב
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                tags={d.tags}
                language={d.language}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
