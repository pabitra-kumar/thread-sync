"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { commentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    // console.log(values);

    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    console.log("Comment added");

    form.reset();
    // router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                <Image
                  src={currentUserImg}
                  alt="Profile Photo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              {/* <div> */}
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus outline-none text-light-1"
                  {...field}
                />
              </FormControl>
              {/* <FormMessage className="text-small-regular text-red-600" /> */}
              {/* </div> */}
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
