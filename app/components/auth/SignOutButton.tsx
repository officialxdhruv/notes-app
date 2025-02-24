"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";
export function SignOutButton({ children }: { children: ReactNode }) {
  return (
    <Button
      className="w-full flex justify-between items-center p-2"
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="ghost"
    >
      {children}
    </Button>
  );
}
