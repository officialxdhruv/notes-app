"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";

interface AuthButtonProps {
  variant: "default" | "outline" | "ghost";
  action: "SignIn" | "SignOut";
  size?: "default" | "icon" | "lg" | "sm";
  fullWidth?: boolean;
  children?: ReactNode;
}

export function AuthButton({
  variant,
  action,
  size,
  fullWidth,
  children,
}: AuthButtonProps) {
  const handleAuth = () => {
    if (action === "SignIn") {
      signIn("google", { callbackUrl: "/dashboard" });
    } else {
      signOut({ callbackUrl: "/" });
    }
  };
  return (
    <>
      <Button
        variant={variant}
        onClick={handleAuth}
        className={fullWidth ? "w-full" : ""}
        size={size}
      >
        {action === "SignIn" ? (
          <>
            {children ? (
              children
            ) : (
              <>
                <FcGoogle />
                <span>Sign in with Google</span>
              </>
            )}
          </>
        ) : children ? (
          children
        ) : (
          <span>Sign out</span>
        )}
      </Button>
    </>
  );
}
