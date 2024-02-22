import { CustomError } from "@/lib/errorHadling.js"
import SupabaseServer from "@/lib/supabase/server.js"
import PricingCard from "./PricingCard.js"

const Pricing = async() => {
  const supabase=SupabaseServer()
  const {data,error}=await (await supabase).from("plans").select("*").order('amount')
  if(error) throw new CustomError("Something went wrong")
  return (
    <article className='flex flex-1 flex-col items-center px-8 py-12 '>
      <h2 className='text-3xl font-bold'>Subscription Plans</h2>
      <p className='pt-1 text-xl text-gray-400'>
        Choose the plan that&apos;s right for you
      </p>
      <br />
      <section className="w-full flex-1  flex flex-col items-center ">
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5   col-span-2">
       {data?.map((plan,index)=>(
        <PricingCard key={index} plan={plan} />
       ))}
       
        </div>
        


      </section>
    </article>
  )
}

export default Pricing

