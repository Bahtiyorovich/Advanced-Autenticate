import { useCreatePost } from "@/hooks/use-create-post";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { postSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const CreatePost = () => {
  const { onClose, isOpen } = useCreatePost();
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    console.log(values);
  }

  function onFileChange(values: z.infer<typeof postSchema>){}
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a post</SheetTitle>
          <SheetDescription>Please, create a your post</SheetDescription>
        </SheetHeader>
        <div className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="write some text" {...field} className="bg-secondary "/>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      This is your post title text.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="write some text" {...field} className="bg-secondary "/>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      This is your post description text.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="mt-2">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" onChange={onFileChange}/>
              </div>
              <Button type="submit" >Submit</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePost;
