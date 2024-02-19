"use client"
import Spinner from '@/components/Spinner.js'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'
import { ToastAction } from '@/components/ui/toast.jsx'
import { useToast } from '@/components/ui/use-toast.js'
import SupabaseBrowser from '@/lib/supabase/browser.js'
import { ChangePasswordSchema } from '@/lib/zod_schema.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation.js'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const FormChangePassword = ({next}) => {
  const { toast } = useToast();
  const router=useRouter()
  const [isHidden, setIsHidden] = useState({
    password: true,
    passwordConfirmation: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const supabase = SupabaseBrowser()
  const changePasswordMutation=useMutation({
    mutationFn:async(data)=>{
      const response= await supabase.auth.updateUser({
        password: data
      })
      return response

    }
    

  })
  const handleChangePassword=(data)=>{
    changePasswordMutation.mutate(data.password,{
      onSuccess:(data)=>{
        if (data?.error) {
          toast({
            title: data.error.message,
            action: <ToastAction altText="change password error">Undo</ToastAction>,
          });
        } else {
          
          router.push(next)
          reset()
          toast({
            title: "Password has been changed successfully",
            action: <ToastAction altText="change password successfully">Undo</ToastAction>,
          });
        }
      }
    })
    
  }
  return (
    <form
      className="flex flex-col gap-y-3"
      onSubmit={handleSubmit(handleChangePassword)}
    >
     <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="password">New Password</Label>
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
        <Label htmlFor="confirm password">Confirm New Password</Label>
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
      <Button className="grid w-full  items-center">
        {changePasswordMutation.isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <p>Change</p>
          )}
          
      </Button>
    </form>
  )
}

export default FormChangePassword