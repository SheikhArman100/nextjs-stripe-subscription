"use client";
import Spinner from "@/components/Spinner.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { ToastAction } from "@/components/ui/toast.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import SupabaseBrowser from "@/lib/supabase/browser.js";
import { forgetPasswordSchema } from "@/lib/zod_schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation.js";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormForgetPassword = ({next}) => {
  const { toast } = useToast();
  const router=useRouter()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const supabase = SupabaseBrowser();
  const resetEmailMutation = useMutation({
    mutationFn: async (data) => {
      const response = await supabase.auth.resetPasswordForEmail(data,{
        redirectTo:location.origin +"/auth/change-password?next="+ next
      });
      return response;
    },
  });

  const handleForgetPassword = async (data) => {
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", data.email)
      .single();
    if (!existingUser) {
      toast({
        title: "Email is not registered",
        action: (
          <ToastAction altText="reset email is not registered">Undo</ToastAction>
        ),
      });
      return;
    }

    resetEmailMutation.mutate(data.email, {
      onSuccess: (data) => {
        if (data?.error) {
          toast({
            title: data.error.message,
            action: <ToastAction altText="reset email error">Undo</ToastAction>,
          });
        } else {
          reset();
          router.push("/")
          toast({
            title: "Reset password email has been sent",
            action: <ToastAction altText="reset email sent">Undo</ToastAction>,
          });
          
        }
      },
    });
  };
  return (
    <form
      className="flex flex-col gap-y-3"
      onSubmit={handleSubmit(handleForgetPassword)}
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
      <Button className="grid w-full  items-center">
        {resetEmailMutation.isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <p>Send Email</p>
        )}
      </Button>
    </form>
  );
};

export default FormForgetPassword;
