import { type Post } from "@prisma/client";
import { db } from "..";

export interface PostWithMetadata extends Post {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
}

export function fetchPostsByTopicSlug(
  slug: string
): Promise<PostWithMetadata[]> {
  return db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

// export function fetchTopPosts(slug: string): Promise<PostWithMetadata[]> {}
