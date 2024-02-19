"use client";
import SupabaseBrowser from "@/lib/supabase/browser.js";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation.js";
import { Button } from "./ui/button.jsx";

const LogoutButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const handleLogout = async () => {
    const supabase = SupabaseBrowser();
    queryClient.removeQueries({
      queryKey: ["user"],
      exact: true,
    });
    await supabase.auth.signOut();
    router.replace(`/auth/signin?next=${pathname}`);
    router.refresh();
    

  };
  return (
    <Button
      variant="ghost"
      className="w-full px-2  flex items-center justify-between"
      onClick={handleLogout}
    >
      Log out
      <LogOut className="size-5" />
    </Button>
  );
};

export default LogoutButton;
