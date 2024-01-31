import Image from "next/image";
import { Input } from "../ui/input";
import { AuthModal } from "../auth/AuthModal";

export default function AppNav() {
  return (
    <nav className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
            <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="logo"
            />
            <Input placeholder="Search..." className="rounded-3xl" />
        </div>
        <div>
            <AuthModal />
        </div>
    </nav>
  )
}
