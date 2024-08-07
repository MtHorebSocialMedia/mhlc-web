// https://developer.paypal.com/api/nvp-soap/paypal-payments-standard/integration-guide/formbasics/
// https://developer.paypal.com/api/nvp-soap/paypal-payments-standard/integration-guide/Appx-websitestandard-htmlvariables/

const querystring = require('node:querystring');

const paypalBaseUrl = 'https://www.paypal.com/cgi-bin/webscr/';

const commonParams = {
    // Optional - the URL to which PayPal posts information about the payment, in the form of Instant Payment Notification messages
    // notify_url: 'https://mthoreb.net/?callback=gravityformspaypal',
    charset: 'UTF-8',
    currency_code: 'USD',
    business: process.env.PAYPAL_BUSINESS_ID,
    no_shipping: 1,
    // The URL to which PayPal redirects buyers' browser after they complete their payments. For example, specify a URL on your site that displays a thank you for your payment page.
    return: 'https://mthoreb.net:443/donate-online/?gf_paypal_return=aWRzPTR8MTAyNDEmaGFzaD0yMDQ4NTE5YWI4NjA0N2QzNjdmMGM5YzgzYzY5YjVmMA=',
    // Return method - '2' means a POST to the return URL with all payment variables sent
    rm: 2
};

async function getPaypalUrl(request) {
    const paymentRequest = {
        ...commonParams,
        first_name: request.firstName,
        last_name: request.lastName,
        email: request.emailAddress
    };

    switch(request.donationFrequency) {
        case 'One Time Donation':
            paymentRequest.cmd = '_donations';
            paymentRequest.item_name = 'One Time Donation';
            paymentRequest.amount = request.donationAmount;
            break;
        case 'Weekly Recurring Donation':
            paymentRequest.cmd = '_xclick-subscriptions';
            paymentRequest.item_name = 'Weekly Recurring Donation';
            paymentRequest.a3 = request.donationAmount;
            paymentRequest.p3 = 1;
            paymentRequest.t3 = 'W';
            paymentRequest.src = 1;
            paymentRequest.sra = 1;
            break;
        case 'Monthly Recurring Donation':
            paymentRequest.cmd = '_xclick-subscriptions';
            paymentRequest.item_name = 'Monthly Recurring Donation';
            paymentRequest.a3 = request.donationAmount;
            paymentRequest.p3 = 1;
            paymentRequest.t3 = 'M';
            paymentRequest.src = 1;
            paymentRequest.sra = 1;
            break;
        default:
            break;
    }

    return `${paypalBaseUrl}?${querystring.stringify(paymentRequest)}`;
}

module.exports = {
    getPaypalUrl
};
