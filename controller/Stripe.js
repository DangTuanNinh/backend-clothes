const Stripe = require('stripe');
const stripe = Stripe('sk_test_51I0p5CE2oIGbiAkNKJaWSk365kSmnPzzrfvQAp4lkM6iGiNTugbQdol1nl11aWzArovRmGu176bRgJAzeikbuZFX00XBiDY3EB');

exports.payment = async (req, res) => {
    const { email, price } = req.body;
    if (price < 50) {
        res.json({ 'error': "Amount must be at least $0.50" })
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: email
        });
        res.json({ 'client_secret': paymentIntent['client_secret'] })
    }
};
