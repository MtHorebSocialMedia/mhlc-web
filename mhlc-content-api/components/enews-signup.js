const signups = document.querySelectorAll('form[data-component="enews-signup"]');

signups.forEach(signup => {

    const firstNameInput = signup.querySelector('input[name="firstName"]');
    const lastNameInput = signup.querySelector('input[name="lastName"]');
    const emailInput = signup.querySelector('input[name="emailAddress"]');
    const submitButton = signup.querySelector('button[type="submit"]');
    const successConfirmationMsg = signup.querySelector('.message.success[data-name=confirmation]');
    const firstNameRequiredMsg = signup.querySelector('.message.error[data-name=firstNameRequired]');
    const lastNameRequiredMsg = signup.querySelector('.message.error[data-name=lastNameRequired]');
    const validEmailAddressRequiredMsg = signup.querySelector('.message.error[data-name=validEmailAddressRequired]');

    signup.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            emailAddress: emailInput.value
        };

        try {
            // Reset messages
            successConfirmationMsg.style.display = 'none';
            firstNameRequiredMsg.style.display = 'none';
            lastNameRequiredMsg.style.display = 'none';
            validEmailAddressRequiredMsg.style.display = 'none';

            const response = await fetch('/api/newsletter/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                successConfirmationMsg.style.display = 'block';
                signup.reset();
            } else {
                response.json().then(errorData => {
                    if (errorData && errorData.valid === false) {
                        if (errorData.errors['body.firstName']) {
                            firstNameRequiredMsg.style.display = 'block';
                        }
                        if (errorData.errors['body.lastName']) {
                            lastNameRequiredMsg.style.display = 'block';
                        }
                        if (errorData.errors['body.emailAddress']) {
                            validEmailAddressRequiredMsg.style.display = 'block';
                        }
                    } else {
                        // tech difficulties or unexpected error
                    }
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error. Please try again.');
        }
    });})