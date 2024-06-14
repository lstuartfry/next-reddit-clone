import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/paths";
import { db } from "@/db";
import PostShowLoading from "@/components/posts/post-show-loading";

type Props = {
  params: {
    slug: string;
    postId: string;
  };
};

export default async function PostShowPage({ params }: Props) {
  const { slug, postId } = params;

  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow post={post} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
