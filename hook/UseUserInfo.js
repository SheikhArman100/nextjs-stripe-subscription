"use client";
import SupabaseBrowser from "@/lib/supabase/browser.js";
import { useQuery } from "@tanstack/react-query";


const UseUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = SupabaseBrowser();
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.user) {
      //   // fetch user information profile
        const { data: user } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        return user;
      }
      
    },
  });
};

export default UseUserInfo;
