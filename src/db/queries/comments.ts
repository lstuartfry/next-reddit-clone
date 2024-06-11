import { db } from "..";

export type CommentWithAuthor = Awaited<
  ReturnType<typeof fetchCommentsByPostId>
>[number];

export function fetchCommentsByPostId(postId: string) {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
}
