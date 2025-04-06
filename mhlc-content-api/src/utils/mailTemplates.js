function getDonationRequestEmailTemplate(donationRequest) {
    const subject = 'Donation Request from mthoreb.net';
    const body = `
    <html>
        <body>
            <h1>Donation Request</h1>
            <p>
                A donation request form was submitted with the following information.
            </p>
            <p>
                <b>Note:</b> This notice is purely informational.  It does not guarantee that they completed the donation on PayPal.
            </p>
            <table>
                <tr>
                    <td><b>First Name:</b></td>
                    <td>${donationRequest.firstName}</td>
                </tr>
                <tr>
                    <td><b>Last Name:</b></td>
                    <td>${donationRequest.lastName}</td>
                </tr>
                <tr>
                    <td><b>Email Address:</b></td>
                    <td>${donationRequest.emailAddress}</td>
                </tr>
                <tr>
                    <td><b>Donation Frequency:</b></td>
                    <td>${donationRequest.donationFrequency}</td>
                </tr>
                <tr>
                    <td><b>Donation Amount:</b></td>
                    <td>$${donationRequest.donationAmount}</td>
                </tr>
                <tr>
                    <td><b>Note:</b></td>
                    <td>${donationRequest.note}</td>
                </tr>
            </table>
        </body>
    </html>
    `;
    return { subject, body };
}

function getPaypalDonationConfirmationEmailTemplate(confirmation) {
    const subject = 'Paypal Confirmation from mthoreb.net';
    const body = `
    <html>
        <body>
            <h1>Paypal Confirmation</h1>
            <p>
                A donation was completed on Paypal and redirected back to mthoreb.net with the following information:
            </p>
            <table>
                <tr>
                    <td><b>Transaction:</b></td>
                    <td>${confirmation.tx}</td>
                </tr>
                <tr>
                    <td><b>Status:</b></td>
                    <td>${confirmation.st}</td>
                </tr>
                <tr>
                    <td><b>Donation Frequency:</b></td>
                    <td>${confirmation.item_name}</td>
                </tr>
                <tr>
                    <td><b>Donation Amount:</b></td>
                    <td>${confirmation.amt} ${confirmation.cc}</td>
                </tr>
                <tr>
                    <td><b>Note:</b></td>
                    <td>${confirmation.cm}</td>
                </tr>
            </table>
        </body>
    </html>
    `;
    return { subject, body };
}

function getSystemStartupEmailTemplate() {
    const subject = 'mthoreb.net Server Startup Notice';
    const body = `
    <html>
        <body>
            <h1>mthoreb.net Server Startup Notice</h1>
            <p>
                A server for mthoreb.net has just started up.
            </p>
            <p>
                If this was not expected, it is recommended to checkout <a href="https://mthoreb.net">mthoreb.net</a> to ensure that
                it is still functioning properly.
            </p>
        </body>
    </html>
    `;
    return { subject, body };
}

module.exports = { getDonationRequestEmailTemplate, getPaypalDonationConfirmationEmailTemplate, getSystemStartupEmailTemplate };
