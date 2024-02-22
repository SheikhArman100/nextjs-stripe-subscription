import { NextResponse } from 'next/server.js'
import Stripe from 'stripe'

export async function POST(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SK)
    const { email, priceId, success_url, cancel_url } = await request.json()
    if (!email || !priceId || !success_url || !cancel_url) {
      return NextResponse.json(
        { message: 'Invalid or incomplete user data' },
        { status: 400 }
      )
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it! the actual Session ID is returned in the query parameter when your customer is redirected to the success page.
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url,
      customer_email: email
    })

    return NextResponse.json(session,{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
