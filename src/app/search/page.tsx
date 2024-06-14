import { paths } from "@/paths";
import { redirect } from "next/navigation";

import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";

type Props = {
  searchParams: {
    term: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const { term } = searchParams;

  if (!term) {
    redirect(paths.home());
  }

  return <PostList fetchPosts={() => fetchPostsBySearchTerm(term)} />;
}
