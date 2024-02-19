"use client";
import Spinner from "@/components/Spinner.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { ToastAction } from "@/components/ui/toast.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import SupabaseBrowser from "@/lib/supabase/browser.js";
import { signupSchema } from "@/lib/zod_schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation.js";

import { useState } from "react";
import { useForm } from "react-hook-form";

const FormSignup = () => {
  const [isHidden, setIsHidden] = useState({
    password: true,
    passwordConfirmation: true,
  });
  const router = useRouter();
  const { toast } = useToast();

  //react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const supabase = SupabaseBrowser();
  //mutation for signup
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      return result;
    },
  });

  const handleSignup = async (data) => {
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", data.email)
      .single();
    if (existingUser) {
      toast({
        title: "Email is already registered",
        description: "use another email",
        action: <ToastAction altText="duplicate email">Undo</ToastAction>,
      });
      return;
    }
    signupMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          router.push("/");
          toast({
            title: "Confirmation email has been sent",
            description: "verify your email first",
            action: <ToastAction altText="confirm email">Undo</ToastAction>,
          });
        },
        onError: (data) => {
          toast({
            title: result.error.message,
            action: <ToastAction altText="error email">Undo</ToastAction>,
          });
        },
      }
    );
  };

  return (
    <form
      className="flex flex-col gap-y-3"
      autoComplete="off"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className="grid w-full  items-center gap-1.5">
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
            type={isHidden.password ? "password" : "text"}
            id="password"
            placeholder="Password"
            className="flex-1 bg-transparent"
          />
          <button
            type="button"
            onClick={() =>
              setIsHidden({ ...isHidden, password: !isHidden.password })
            }
          >
            {isHidden.password ? (
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="confirm password">Confirm Password</Label>
        <div className="flex justify-between items-center  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <input
            {...register("passwordConfirmation")}
            type={isHidden.passwordConfirmation ? "password" : "text"}
            id="confirm password"
            placeholder="Confirm Password"
            className="flex-1 bg-transparent"
          />
          <button
            type="button"
            onClick={() =>
              setIsHidden({
                ...isHidden,
                passwordConfirmation: !isHidden.passwordConfirmation,
              })
            }
          >
            {isHidden.passwordConfirmation ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        {errors.passwordConfirmation?.message && (
          <p className="text-xs font-semibold text-red-700 mt-1">
            *{errors.passwordConfirmation?.message}
          </p>
        )}
      </div>
      <Button className="grid w-full items-center">
      {signupMutation.isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <p>Register</p>
        )}</Button>
    </form>
  );
};

export default FormSignup;
