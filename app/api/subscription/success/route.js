import { NextResponse } from 'next/server.js'
import Stripe from 'stripe'

export async function GET(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SK)
    const { searchParams } = new URL(request.url)
    const session_id = searchParams.get('session_id')
    if (!session_id) {
      return NextResponse.json(
        { message: 'Invalid or incomplete user data' },
        { status: 400 }
      )
    }
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const customer = await stripe.customers.retrieve(session.customer)
    return NextResponse.json(customer, { status: 200 })
  } catch (error) {
    // console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
