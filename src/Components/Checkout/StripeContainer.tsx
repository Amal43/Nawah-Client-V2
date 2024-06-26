import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
const stripeTestPromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const StripeContainer = () => {
    return (
        <Elements stripe={stripeTestPromise}>
            <Checkout/>
        </Elements>
    );
};
export default StripeContainer;