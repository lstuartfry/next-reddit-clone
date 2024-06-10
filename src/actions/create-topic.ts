"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { type Topic } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Must be at least 3 letters long" })
    .regex(/[a-z-]/, {
      message:
        "Must only be lettercase letters with no dashes or special characters",
    }),
  description: z.string().min(10),
});

interface FormState {
  errors: {
    _form?: string[];
    name?: string[];
    description?: string[];
  };
}

export async function createTopic(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  // check if user is signed in. If not, return an error message.
  const session = await auth();
  if (!session || session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a topic"],
      },
    };
  }

  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // return field errors if any exist
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let topic: Topic;

  // create the topic, or return an error.
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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

  // once topic is successfully created, revalidate the homepage and redirect to the new topic show page.
  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
