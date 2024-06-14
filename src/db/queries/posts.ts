import { db } from "..";

export type EnrichedPost = Awaited<
  ReturnType<typeof fetchPostsByTopicSlug | typeof fetchPostsByTopicSlug>
>[number];

export function fetchPostsByTopicSlug(slug: string) {
  return db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}

export function fetchTopPosts() {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}
