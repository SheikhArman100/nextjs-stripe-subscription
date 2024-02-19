"use client"
import SupabaseBrowser from '@/lib/supabase/browser.js'
import React from 'react'

const ClientPage = () => {
    const supabase=SupabaseBrowser()
    // const result=supabase.auth.getSession()
  return (
    <div>
      ClientPage
      
    </div>
  )
}

export default ClientPage