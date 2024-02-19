"use client";
import Spinner from "@/components/Spinner.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { ToastAction } from "@/components/ui/toast.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import SupabaseBrowser from "@/lib/supabase/browser.js";
import { signinSchema } from "@/lib/zod_schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FormSignin = ({ next }) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // const searchParams=useSearchParams()
  // const next=searchParams.get("next")|"/"
  const [isHidden, setIsHidden] = useState(true);
  //react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });
  //mutation for signin
  const signinMutation = useMutation({
    mutationFn: async (data) => {
      const supabase = SupabaseBrowser();
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      return result;
    },
    onSuccess: async () => {
      return queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleSignin = async (data) => {
    signinMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          if (data?.error?.message) {
            toast({
              title: data.error.message,
              action: <ToastAction altText="signin again">Undo</ToastAction>,
            });
          }
          if (data.data.session?.user) {
            router.push(next);

            toast({
              title: "Successfully Sign in",
              action: <ToastAction altText="signin again">Undo</ToastAction>,
            });
          }
        },
      }
    );
  };
  return (
    <form
      className="flex flex-col gap-y-3"
      onSubmit={handleSubmit(handleSignin)}
      autoComplete="off"
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="name@gmail.com"
        />
        {errors.email?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.email?.message}
          </p>
        )}
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">Password</Label>

        <div className="flex justify-between items-center  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <input
            {...register("password")}
            type={isHidden ? "password" : "text"}
            id="password"
            placeholder="Password"
            className="flex-1 bg-transparent"
          />
          <button type="button" onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
        {errors.password?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.password?.message}
          </p>
        )}
      </div>
      <Button className="grid w-full  items-center">
        {signinMutation.isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <p>Sign in</p>
        )}
      </Button>
    </form>
  );
};

export default FormSignin;
