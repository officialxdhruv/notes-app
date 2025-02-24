import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  return (
    <>
      <div className="border m-4 rounded-md bg-slate-950 p-4 ">
        <pre className="whitespace-pre-wrap break-words">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </>
  );
}
