// ...host/api/create-checkout-session
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    // description: item.description,
    quantity: 1,
    price_data: {
      currency: "gbp",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [
          `${process.env.NEXT_PUBLIC_API_URL}${item.images[0].image}/`
        //   `${process.env.NEXT_PUBLIC_API_URL}/${item.images[1].image}`,
        //   `${process.env.NEXT_PUBLIC_API_URL}/${item.images[2].image}`,
        //   `${process.env.NEXT_PUBLIC_API_URL}/${item.images[3].image}`,
        //   `${process.env.NEXT_PUBLIC_API_URL}/${item.images[4].image}`,
        ],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {amount: 0, currency: 'gbp'},
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {unit: 'business_day', value: 1},
              maximum: {unit: 'business_day', value: 3},
            },
          },
        },
      ],
    // shipping_rates: ["shr_1ME7ByE0XZqQYdekEBVnM1v5"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "RU", "NL"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success/`,
    cancel_url: `${process.env.HOST}/checkout/`,
    metadata: {
      email,
      images: JSON.stringify(
        items.map(
          (item) => `${process.env.NEXT_PUBLIC_API_URL}${item.images[0].image}/`
        )
      ),
    },
  });

  res.status(200).json({ id: session.id });
  // console.log(transformedItems, session)
};
