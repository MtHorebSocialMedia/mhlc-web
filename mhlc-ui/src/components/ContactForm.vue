<template>
    <v-container class="contact-form">
        <v-alert>
            <p class="instructions">Please fill out and submit the following form and we will contact you as soon as possible.</p>
            <p class="required-note"><v-icon color="red" size="x-small">mdi-asterisk</v-icon> indicates a required field.</p>
        </v-alert>
        <v-alert v-if="contactError" type="error">
            An unexpected error occured while trying to send your request.  Please try again.  If this continues to happen, please contact the church office.
        </v-alert>
        <v-alert v-if="contactMessage.validationResult && !contactMessage.validationResult.valid" type="error">
            <div v-if="contactMessage.validationResult.errors.firstName">
                The first name field is required.
            </div>
            <div v-if="contactMessage.validationResult.errors.lastName">
                The last name field is required.
            </div>
            <div v-if="contactMessage.validationResult.errors.emailAddress">
                A valid email address is required.
            </div>
            <div v-if="contactMessage.validationResult.errors.phoneNumber">
                A valid phone number is required.
            </div>
            <div v-if="contactMessage.validationResult.errors.contactMethod">
                A preferred method of contact is required.
            </div>
            <div v-if="contactMessage.validationResult.errors.message">
                A message is required.
            </div>
        </v-alert>
        <v-form>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="contactMessage.request.firstName"
                        label="First Name"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="contactMessage.request.lastName"
                        label="Last Name"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="contactMessage.request.emailAddress"
                        label="Email Address"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="contactMessage.request.phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select
                        v-model="contactMessage.request.contactMethod"
                        label="Preferred Method of Contact"
                        :items="['Email', 'Phone']"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select
                        v-model="contactMessage.request.contactReason"
                        label="Nature of Contact"
                        :items="['Pastor', 'Office', 'Preschool', 'Social Media & Technology', 'Worship', 'Learn', 'Witness', 'Serve', 'Support']"
                        variant="outlined"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        v-model="contactMessage.request.message"
                        label="Question/Comment/Message"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        color="red"
                        block
                        @click="sendContactRequest()"
                    >
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup>
    import { ref } from 'vue';
    import { validate } from '../utils/validationUtils';
    import { useMailStore } from '../store/mail';
    import contactRequestSchema from '@mhlc/content-api/schemas/contactRequest.json';
    const contactMessage = ref({
        request: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            contactMethod: '',
            contactReason: '',
            message: ''
        },
        validationResult: null,
        sent: false
    });
    const contactError = ref(false);

    const sendContactRequest = async () => {
        contactError.value = false;
        try {
            const contact = contactMessage.value;
            contact.validationResult = validate(contact.request, contactRequestSchema);
            if(contact.validationResult.valid) {
                const { success } = await useMailStore().sendContactRequest(contact.request);
                contact.sent = success;
            }
        } catch (error) {
            console.log('An error occurred attempting to send the request: ', error);
            contactError.value = true;
        }
    };
</script>

<style>
    .v-container.contact-form .v-form { margin-top: 40px; }
    .v-container.contact-form .v-alert { margin-bottom: 20px; }
    .v-container.contact-form .v-alert .instructions { margin-bottom: 5px; }
    .v-container.contact-form .v-alert .required-note { text-align: right; }
    .v-container.contact-form .v-col { padding-top: 0px; padding-bottom: 0px; }
</style>