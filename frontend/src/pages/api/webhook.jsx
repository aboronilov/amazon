import { buffer } from "micro";
import axios from "axios";

// connect to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const createOrder = async (session) => {
//   console.log(`Creating order ${session}`);
  const email = session.metadata.email;
  const amount = session.amount_total / 100;
  const amount_shipping = session.total_details.amount_shipping;

  console.log(email)

//   await axios.post(`${NEXT_PUBLIC_API_URL}/api/order/`, {
//     email,
//     amount,
//     amount_shipping,
//   });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = reg.headers["stripe-signature"];

    let event;

    // verify that event came from Stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log(`Webhook error: ${error.message}`);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // hande the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

    //   console.log(session)

      // create the order in DB
      return createOrder(session).then(() =>
        res
          .status(200)
          .catch((err) => res.status(400).send(`Webhook error ${err.message}`))
      );
    }
  }
};

export const config = {
  api: {
    bodyPareser: false,
    externalResorver: true,
  },
};
