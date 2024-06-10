"use client";

import { useFormState } from "react-dom";
import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import * as actions from "@/actions";
import SubmitFormButton from "@/components/common/submit-form-button";

interface Props {
  slug: string;
}

export default function PostCreateForm({ slug }: Props) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {}
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">create a post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="title"
              isInvalid={!!formState.errors?.title}
              errorMessage={formState.errors?.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="content"
              isInvalid={!!formState.errors?.content}
              errorMessage={formState.errors?.content?.join(", ")}
            />
            {formState.errors?._form && (
              <div className="p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            )}
            <SubmitFormButton>create post</SubmitFormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
