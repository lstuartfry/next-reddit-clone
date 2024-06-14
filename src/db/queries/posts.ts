import { db } from "..";

export type EnrichedPost = Awaited<
  ReturnType<
    | typeof fetchPostsByTopicSlug
    | typeof fetchPostsByTopicSlug
    | typeof fetchPostsBySearchTerm
  >
>[number];

export function fetchPostsBySearchTerm(term: string) {
  return db.post.findMany({
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}

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
