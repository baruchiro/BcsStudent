import { prisma } from '@/lib/prisma'
import { PullRequestState } from '@prisma/client'
import Image from 'next/image'

async function getContributors() {
  const users = await prisma.githubUser.findMany({
    include: {
      _count: {
        select: {
          createdPRs: {
            where: {
              state: PullRequestState.open,
            },
          },
        },
      },
      createdPRs: {
        select: {
          state: true,
          mergedAt: true,
        },
      },
    },
    orderBy: {
      createdPRs: {
        _count: 'desc',
      },
    },
  })

  // Calculate stats for each user
  const usersWithStats = users.map((user) => ({
    ...user,
    stats: {
      open: user.createdPRs.filter((pr) => pr.state === 'open').length,
      closed: user.createdPRs.filter((pr) => pr.state === 'closed' && !pr.mergedAt).length,
      merged: user.createdPRs.filter((pr) => pr.state === 'closed' && pr.mergedAt).length,
    },
  }))

  return usersWithStats
}

export default async function ContributorsPage() {
  const contributors = await getContributors()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Contributors
        </h1>
      </div>

      <div className="py-12">
        <div className="space-y-4">
          {contributors.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800"
            >
              {user.avatarUrl && (
                <Image
                  src={user.avatarUrl}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">@{user.username}</h2>
                <div className="mt-1 flex gap-4 text-sm">
                  <span className="text-green-600 dark:text-green-400">{user.stats.open} open</span>
                  <span className="text-red-600 dark:text-red-400">{user.stats.closed} closed</span>
                  <span className="text-purple-600 dark:text-purple-400">
                    {user.stats.merged} merged
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
