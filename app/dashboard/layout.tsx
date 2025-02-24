import { auth } from "@/auth";
import { DashboardNav } from "../components/DashboardNav";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="grid  flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
