import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import React from 'react'
import FormChangePassword from './FormChangePassword.js'
import SupabaseServer from '@/lib/supabase/server.js'
import { redirect } from 'next/navigation.js'

const ChangePassword = async({searchParams}) => {
  const next=searchParams.next ?? "/"
  // const supabase=SupabaseServer()
  //   const { data } = await (await supabase).auth.getUser()
  //   if (!data?.user) {
  //     redirect('/')
  //   }
  return (
    <section className="w-full flex-1 flex items-center justify-center px-8 lg:px-[2rem] xl:px-[4rem]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>Request for password change</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormChangePassword next={next}/>
        </CardContent>
      </Card>
    </section>
  )
}

export default ChangePassword