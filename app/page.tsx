import { auth } from "@/auth";
import { AuthButton } from "./components/auth/AuthButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if(session){
    return redirect("/dashboard")
  }
  return (
    <>
      <section className="flex items-center justify-center bg-background  h-[80vh]">
        <div className="relative items-center w-full px-4 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="w-auto px-6 py-3 rounded-full bg-secondary">
                <span className="text-sm font-medium text-primary">
                  Sort Your notes easily
                </span>
              </span>
              <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                Create Notes with ease
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl ">
                Capture your thoughts effortlessly. Stay organized, take notes,
                and boost your productivity with ease.
              </p>
            </div>
            <div className="flex justify-center max-w-sm mx-auto mt-10">
              <AuthButton
                variant="outline"
                action="SignIn"
                fullWidth
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
