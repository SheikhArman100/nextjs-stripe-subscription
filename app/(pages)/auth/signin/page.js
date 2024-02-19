import FacebookButton from "@/components/FacebookButton.js";
import GithubButton from "@/components/GithubButton.js";
import GoogleButton from "@/components/GoogleButton.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import SupabaseServer from "@/lib/supabase/server.js";
import Link from "next/link.js";
import { redirect } from "next/navigation.js";
import { Suspense } from "react";
import FormSignin from "./FormSignin.js";

const SignIn = async({searchParams}) => {
  const next=searchParams.next ?? "/"
  const supabase=SupabaseServer()
  const { data } = await (await supabase).auth.getUser()
  if (data?.user) {
    redirect('/')
  }

  return (
    <section className="w-full flex-1 flex items-center justify-center px-8 lg:px-[2rem] xl:px-[4rem]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <SignInForm /> */}
          <FormSignin next={next} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
          <Suspense fallback={<div>Loading..</div> }>
            <GoogleButton />
            <FacebookButton />
            <GithubButton />
            </Suspense>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              href={`/auth/signup?next=${next}`}
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href={`/auth/forget-password?next=${next}`}
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Forget password
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignIn;
