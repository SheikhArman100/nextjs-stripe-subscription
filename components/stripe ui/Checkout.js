'use client'
import UseUserInfo from '@/hook/UseUserInfo.js'
import { axiosPublic } from '@/lib/axiosInstance.js'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation.js'
import { Button } from '../ui/button.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { toast, useToast } from '../ui/use-toast.js'
import { ToastAction } from '../ui/toast.jsx'
import Spinner from '../Spinner.js'

const Checkout = ({ priceId }) => {
  const router = useRouter()
  const { data: user } = UseUserInfo()
  const { toast } = useToast()
  const checkoutMutation = useMutation({
    mutationFn: async data => {
      const response = await axiosPublic.post(
        '/api/create-checkout-session',
        data
      )
      return response.data
    }
  })
  const handleCheckout = async () => {
    if (user?.id) {
      checkoutMutation.mutate(
        {
          email: user.email,
          priceId,
          success_url: location.origin + '/pricing/success',
          cancel_url: location.origin + '/pricing'
        },
        {
          onSuccess: async data => {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK)
            const res = await stripe.redirectToCheckout({ sessionId: data.id })
            if (res?.error) {
              toast({
                title: 'Checkout failed',
                action: (
                  <ToastAction altText='checkout failed'>Undo</ToastAction>
                )
              })
            }
          },
          onError: data => {
            console.log(data)
          }
        }
      )
    } else {
      router.push('/auth/signin?next=/pricing')
    }
  }
  return (
    <Button className='w-full text-sm font-semibold' onClick={handleCheckout}>
      {checkoutMutation.isPending ? (
        <Spinner className='h-4 w-4' />
      ) : (
        <p>Upgrade</p>
      )}
    </Button>
  )
}

export default Checkout
