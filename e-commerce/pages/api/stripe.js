import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.cartItems);
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payments_method_type: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1M5UehE2FMJg1suoFCxFunaf' },
                { shipping_rate: 'shr_1M5UgVE2FMJg1suonJoG8gOQ' },
            ],
            line_items: req.body.cartItems.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https//cdn.sanity.io/images/rfpmlxtj/production/').replace('-webp', '.webp');
                
                return {
                  price_date: { 
                    currency: 'usd',
                    product_data: {
                      name: item.name,
                      images: [newImage],
                    },
                    unit_amount: item.price * 100, 
                   },
                   adjustable_quantity: {
                    enabled: true,
                    minmum: 1,
                   },
                   quantity: item.quantity
                }
            }),
            // mode: "payment",
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
