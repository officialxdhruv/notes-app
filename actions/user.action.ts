"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const postData = async (formData: FormData) => {
    const session = await auth();
    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;

    await prisma.user.update({
        where: {
            id: session?.user?.id, 
        },
        data: {
            name: name ?? undefined,
            colorScheme : colorScheme ?? undefined,
        },
    });

    revalidatePath("/", "layout")
};