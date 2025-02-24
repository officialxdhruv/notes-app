import { DashboardNav } from "../components/DashboardNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
