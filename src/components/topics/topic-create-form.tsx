"use client";

import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Textarea,
} from "@nextui-org/react";
import { useFormState } from "react-dom";

import * as actions from "@/actions";
import SubmitFormButton from "@/components/common/submit-form-button";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a topic</h3>
            <Input
              label="name"
              labelPlacement="outside"
              name="name"
              placeholder="name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              label="description"
              labelPlacement="outside"
              name="description"
              placeholder="describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form && (
              <div className="p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            )}
            <SubmitFormButton>submit</SubmitFormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
