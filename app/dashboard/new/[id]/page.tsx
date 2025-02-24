import { SubmitButton } from "@/app/components/Submitbutton";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      title: true,
      description: true,
      id: true,
    },
  });
  return data;
}
export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const data = await getData({
    userId: session?.user?.id as string,
    noteId: (await params).id,
  });
  async function postData(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: session?.user?.id,
      },
      data: {
        description,
        title,
      },
    });
    revalidatePath("/dashboard");
    return redirect("/dashboard");
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now edit your notes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for you note"
              defaultValue={data?.title}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
              required
              defaultValue={data?.description}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant={"destructive"}>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
