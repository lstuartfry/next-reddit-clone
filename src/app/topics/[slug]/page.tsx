import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

type Props = {
  params: {
    slug: string;
  };
};

export default async function TopicShowPage({ params }: Props) {
  const { slug } = params;
  const fetchPosts = () => fetchPostsByTopicSlug(slug);
  return (
    <div className="grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchPosts={fetchPosts} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
