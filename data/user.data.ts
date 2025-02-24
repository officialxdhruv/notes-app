"use server";

import { prisma } from "@/lib/prisma";

// export const getUserById = async (id: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });
//     return user;
//   } catch {
//     return null;
//   }
// };


export const getUserData = async (id: string) => {
    const data = await prisma.user.findUnique({
        where : {
            id
        },
        select :{
            name : true,
            email : true,
            colorScheme : true,
        },
    });
    return data;
}