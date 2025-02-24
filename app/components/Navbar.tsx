import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { auth } from "@/auth";
import { AuthButton } from "./auth/AuthButton";

export async function Navbar() {
  const session = await auth();
  return (
    <nav className="sticky top-0  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-[10vh] px-4">
          <Link href="/">
            <h1 className="font-bold text-3xl text-primary tracking-wide ">
              NoteApp
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {session ? (
              <AuthButton action="SignOut" variant="default" />
            ) : (
              <div className="flex items-center space-x-5">
                <AuthButton action="SignIn" variant="outline">
                  Sign In
                </AuthButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
