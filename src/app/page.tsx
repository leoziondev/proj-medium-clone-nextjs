import { CustomSession, authOptions } from "./api/auth/[...nextauth]/authOptions";
import { getServerSession } from 'next-auth'
import AppNav from "@/components/common/AppNav";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions)

  return (
    <div>
      <AppNav />
      {JSON.stringify(session)}
    </div>
  );
}
