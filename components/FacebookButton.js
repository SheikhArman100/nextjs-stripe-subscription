"use client";
import { Button } from "@/components/ui/button.jsx";
import SupabaseBrowser from "@/lib/supabase/browser.js";
import { useSearchParams } from "next/navigation.js";

const FacebookButton = () => {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "";
  const handleAuthWithFacebook = () => {
    const supabase = SupabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next
      },
    });
  };
  return (
    <Button
      variant="outline"
      className="w-full bg-background sm:w-auto"
      onClick={handleAuthWithFacebook}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        className="mr-2 size-4"
      >
        <path
          fill="currentColor"
          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
        />
      </svg>
      Facebook
    </Button>
  );
};

export default FacebookButton;
