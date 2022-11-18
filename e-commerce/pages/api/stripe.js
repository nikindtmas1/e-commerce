import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payments_method_type: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: '' },
                { shipping_rate: '' },
            ],
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: "{{PRICE_ID}}",
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.messge });
    }
  }
}
