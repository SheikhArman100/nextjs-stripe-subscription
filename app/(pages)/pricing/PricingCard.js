import Checkout from '@/components/stripe ui/Checkout.js'
import { Button } from '@/components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card.jsx'
import { features } from '@/lib/data.js'
import { Check, X } from 'lucide-react'

const PricingCard = ({ plan }) => {
  return (
    <Card className='flex w-full max-w-[350px] flex-col  py-1 h-fit   col-span-1 md:last:col-span-2 xl:last:col-span-1 mx-auto'>
      <CardHeader>
        <CardTitle className='text-lg'>{plan.title}</CardTitle>
        <h6 className='text-3xl font-bold'>${plan.amount}/month</h6>
        <CardDescription className=' line-clamp-2'>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {features.map((feature, index) =>
          plan?.features.includes(feature) ? (
            <div key={index} className='flex items-center gap-x-3 '>
              <div className='p-1 border border-green-500 text-green-500 rounded-full'><Check    className='size-3 '/></div>
              <p className='text-primary font-medium text-sm'>{feature}</p>
            </div>
          ) : (
            <div key={index} className='flex items-center gap-x-3'>
              <div className='p-1 border border-red-500 text-red-500 rounded-full '><X className='size-3'/></div>
              <p className='text-primary font-medium text-sm'>{feature}</p>
            </div>
          )
        )}
      </CardContent>
      <CardFooter className="">
        <Checkout priceId={plan.priceId}/>
      </CardFooter>
    </Card>
  )
}

export default PricingCard
