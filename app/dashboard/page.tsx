import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Edit, File } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { TrashDelete } from "../components/Submitbutton";
async function getData(userId: string) {
  const data = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
export default async function page() {
  const session = await auth();
  const data = await getData(session?.user?.id as string);
  async function deleteNote(formData: FormData) {
    "use server";
    const noteId = formData.get("noteId") as string;
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    revalidatePath("/dashboard");
  }
  return (
    <div className="gird items-start gap-8">
      <div className="flex items-center justify-between px-2 mb-8">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create a new Note</Link>
        </Button>
      </div>
      {data.length < 1 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don&apos;t have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6  text-muted-foreground max-w-sm mx-auto">
            You currently don&apos;t have any notes. Please create some so that
            you can see them right here.
          </p>
          <Button asChild>
            <Link href="/dashboard/new">Create a new Note</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {data.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <h2 className="font-semibold text-xl text-primary">
                  {item.title}
                </h2>
                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(item.createdAt))}
                </p>
              </div>

              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${item.id}`}>
                  <Button variant={"outline"} size={"icon"}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={item.id} />
                  <TrashDelete />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
