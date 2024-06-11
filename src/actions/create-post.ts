"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { type Post } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";

const createTopicSchema = z.object({
  title: z.string().min(3, { message: "Must be at least 3 letters long" }),
  content: z.string().min(10),
});

type FormState = {
  errors?: {
    _form?: string[];
    title?: string[];
    content?: string[];
  };
};

export async function createPost(
  slug: string,
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  // check if user is signed in. If not, return an error message.
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a post"],
      },
    };
  }

  const result = createTopicSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  // return field errors if any exist
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const topic = await db.topic.findFirst({ where: { slug } });

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  let post: Post;

  // create the post, or return an error.
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId: topic.id,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  // once post is successfully created, revalidate the topic show page and redirect to the new post show page.
  revalidatePath(paths.topicShow(topic.slug));
  redirect(paths.postShow(topic.slug, post.id));
}
