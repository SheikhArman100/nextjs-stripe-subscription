import { Button } from '@/components/ui/button.jsx'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Smile } from 'lucide-react'
import Link from 'next/link.js'
import { redirect } from 'next/navigation.js'

const getUser=async(data)=>{
  const res=await fetch(`http://localhost:3000/api/subscription/success?session_id=${data}`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    redirect("/")
  }
 
 return res.json()

}

const PricingSuccess = async({searchParams}) => {
  const session_id=searchParams.session_id ?? ""
  const data=await getUser(session_id)
  
  
  

  return (
    <section className='flex flex-1 items-center justify-center'>
      <Card className='flex flex-col items-center h-fit w-full max-w-[350px] py-1 '>
        <CardHeader className="flex flex-col items-center">
        <Smile strokeWidth="1"  className='size-24'/>
        <CardTitle className="text-xl font-bold">Payment Success!!</CardTitle>
        <h4 className='text-2xl font-semibold'>Thank You for Purchase</h4>
        <p className='capitalize text-xl font-bold'>{data.name}</p>
        </CardHeader>
        <CardFooter>
          <Button asChild><Link href="/" className='font-semibold'>Go to home</Link></Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default PricingSuccess
