"use client";
import UseUserInfo from "@/hook/UseUserInfo.js";
import Link from "next/link.js";
import ThemeButton from "./ThemeButton.js";
import UserAvatar from "./UserAvatar.js";
import { Button } from "./ui/button.jsx";
import { Skeleton } from "./ui/skeleton.jsx";
import { usePathname } from "next/navigation.js";

const Navbar = () => {
  const { data, isPending } = UseUserInfo();
 const pathname=usePathname()


  return (
    <div className="w-full h-16  border-b border-b-border flex  items-center justify-between px-8 lg:px-[2rem] xl:px-[4rem]">
      <Link href="/" className="text-3xl font-bold">LOGO</Link>
      
      <div className="flex items-center  gap-x-3">
        <ThemeButton />

        {isPending ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : data ? (
          <UserAvatar user={data} />
        ) : (
          <Button asChild>
            <Link href={`/auth/signin?next=${pathname}`} className="">
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
