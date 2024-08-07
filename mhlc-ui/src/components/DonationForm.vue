<template>
    <v-container class="donation-form">
        <v-alert>
            <p class="instructions">
                There are two ways to give to Mt. Horeb Lutheran Church online.
                You can send an online donation via either PayPal or Tithe.ly.
                To get started, choose the tab below for the donation option you wish to use.
                If you have any questions, please check out the Frequently Asked Questions (FAQs) tab below
                or contact the church office.
            </p>
        </v-alert>
        <v-tabs
            v-model="tab"
            align-tabs="center"
            color="deep-purple-accent-4"
        >
            <v-tab :value="1">PayPal</v-tab>
            <v-tab :value="2">Tithe.ly</v-tab>
            <v-tab :value="3">FAQs</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
                <v-container>
                    <h2>Donate via PayPal</h2>
                    <v-alert>
                        <p class="instructions">Use the form below to make either a one-time or recurring donation. Payments are processed through PayPal, however, if you don't have a PayPal account, you can use your credit card.</p>
                        <p class="required-note"><v-icon color="red" size="x-small">mdi-asterisk</v-icon> indicates a required field.</p>
                    </v-alert>
                    <v-alert v-if="paypalDonation.validationResult && !paypalDonation.validationResult.valid" type="error">
                        <div v-if="paypalDonation.validationResult.errors.firstName">
                            The first name field is required.
                        </div>
                        <div v-if="paypalDonation.validationResult.errors.lastName">
                            The last name field is required.
                        </div>
                        <div v-if="paypalDonation.validationResult.errors.emailAddress">
                            A valid email address is required.
                        </div>
                        <div v-if="paypalDonation.validationResult.errors.donationFrequency">
                            A donation frequency selection is required.
                        </div>
                        <div v-if="paypalDonation.validationResult.errors.donationAmount">
                            A donation amount is required.
                        </div>
                    </v-alert>
                    <br />
                    <v-form>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="paypalDonation.request.firstName"
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
                                    v-model="paypalDonation.request.lastName"
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
                                    v-model="paypalDonation.request.emailAddress"
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
                                    v-model="paypalDonation.confirm.emailAddressConfirmation"
                                    label="Confirm Email Address"
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
                                    v-model="paypalDonation.request.donationFrequency"
                                    label="Donation Frequency"
                                    :items="['One Time Donation', 'Weekly Recurring Donation', 'Monthly Recurring Donation']"
                                    variant="outlined"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model.number="paypalDonation.request.donationAmount"
                                    label="Donation Amount"
                                    type="number"
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
                                <v-btn
                                    color="red"
                                    block
                                    @click="submitPaypal()"
                                >
                                    Submit
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-tabs-window-item>
            <v-tabs-window-item :value="2">
                <v-container>
                    <h2>Donate via Tithe.ly</h2>
                    <v-alert>
                        <p class="instructions">Use the "Donate" button below to be directed to the Tithe.ly donation form.</p>
                    </v-alert>
                    <v-container class="d-flex justify-center">
                        <v-btn
                            class="tithely-give-btn"
                            rounded="xl"
                            size="x-large"
                            color="red"
                            data-church-id="1572140"
                        >
                            Donate
                        </v-btn>
                    </v-container>
                </v-container>
            </v-tabs-window-item>
            <v-tabs-window-item :value="3">
                <v-container>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <v-icon>mdi-help-circle-outline</v-icon>
                                Can I Direct My Donation to a Specific Fund?
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                You will be able to choose to direct your donation to any of the following:

                                General Fund
                                Building Fund
                                Debt reduction
                                Memorial
                                Cemetery
                                Other (please specify in notes)
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <v-icon>mdi-help-circle-outline</v-icon>
                                Can I make One-Time or Recurring Donations?
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                You can make a one-time gift or a recurring gift. The recurring gift can be made in any of the following frequencies, on the day of the week of your choosing.

                                Every week
                                Every 2 weeks
                                Every month
                                1st &amp; 15th of monthly
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <v-icon>mdi-help-circle-outline</v-icon>
                                How Can I Give?
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                You may donate using either a credit card or direct bank draft
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <v-icon>mdi-help-circle-outline</v-icon>
                                Who Pays the Fees?
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                You can choose whether you want the payment processing fees to be added to your donation, so you are paying the fees, or whether they should be deducted from your gift, where the church is paying the fees.
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <v-icon>mdi-help-circle-outline</v-icon>
                                How Can I Change My Gift in the Future?
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                Tithe.ly will securely store your information so that future giving is easier. You’ll be prompted to create a password and a PIN.You can create an account so that you can login later to make changes or discontinue your gift.
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-container>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { useDonationsStore } from '@/store/donations';
    import { storeToRefs } from 'pinia';
    import { ref, watch } from 'vue';
    import { validate } from '../utils/validationUtils';
    import paypalDonationRequestSchema from '@mhlc/content-api/schemas/paypalRequest.json';

    const contentStore = useContentStore();
    const tab = ref(1);
    const paypalDonation = ref({
        request: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            donationFrequency: '',
            donationAmount: null
        },
        confirm: {
            emailAddressConfirmation: '',
        },
        validationResult: null
    });

    watch(tab, () => {
        if (tab.value === 2) {
            const tithelyScript = document.createElement('script')
            tithelyScript.setAttribute('src', 'https://tithe.ly/widget/v3/give.js?3')
            tithelyScript.onload = () => {
                create_tithely_widget();
            };
            document.head.appendChild(tithelyScript)
        }
    });
    const submitPaypal = async () => {
        paypalDonation.value.validationResult = validate(paypalDonation.value.request, paypalDonationRequestSchema);
        if(paypalDonation.value.validationResult.valid) {
            const { url } = await useDonationsStore().getPayPalRequest(paypalDonation.value.request);
            window.location = url;
        } else {
            console.log(paypalDonation.value.validationResult);
        }
    };
</script>

<style>
    .v-container.donation-form .v-alert { margin-bottom: 20px; }
    .v-container.donation-form .v-alert .instructions { margin-bottom: 5px; }
    .v-container.donation-form .v-alert .required-note { text-align: right; }
    .v-container.donation-form .v-col { padding-top: 0px; padding-bottom: 0px; }
    .v-container.donation-form .v-expansion-panel-title { font-weight: bold; }
    .v-container.donation-form .v-expansion-panel-title .v-icon { margin-right: 5px; }
</style>