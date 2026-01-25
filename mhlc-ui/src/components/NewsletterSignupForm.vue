<template>
  <v-container class="newsletter-signup-form">
    <v-alert>
      <p class="instructions">
        If you’d like to receive regular news from our website, sign up using the form below.
        After you submit the form, check your email for the confirmation and be sure to check the link to be placed on our list.
      </p>
      <p class="required-note">
        <v-icon
          color="red"
          size="x-small"
        >
          mdi-asterisk
        </v-icon> indicates a required field.
      </p>
    </v-alert>
    <v-alert
      v-if="signupError"
      type="error"
    >
      <p class="instructions">
        We are currently experiencing a technical issue.  Please try again later or contact the church office.
      </p>
    </v-alert>
    <v-alert
      v-if="memberExistsMsg"
      type="warning"
    >
      <p class="instructions">
        The member {{ newsletterSignup.request.emailAddress }} already exists on the church web newsletter list.
      </p>
    </v-alert>
    <v-alert
      v-if="newsletterSignup.validationResult && !newsletterSignup.validationResult.valid"
      type="error"
    >
      <div v-if="newsletterSignup.validationResult.errors.firstName">
        The first name field is required.
      </div>
      <div v-if="newsletterSignup.validationResult.errors.lastName">
        The last name field is required.
      </div>
      <div v-if="newsletterSignup.validationResult.errors.emailAddress">
        A valid email address is required.
      </div>
      <div v-if="newsletterSignup.validationResult.errors.emailAddressConfirmation">
        A matching email address confirmation is required.
      </div>
    </v-alert>
    <v-alert
      v-if="signupComplete"
      type="success"
    >
      Thank you for signing up for our newsletter.  Please check your e-mail for a confirmation request to complete your sign-up.
    </v-alert>
    <br>
    <v-form v-if="!signupComplete">
      <v-row>
        <v-col>
          <v-text-field
            v-model="newsletterSignup.request.firstName"
            label="First Name"
            variant="outlined"
          >
            <template #append-inner>
              <v-icon
                color="red"
                size="x-small"
              >
                mdi-asterisk
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="newsletterSignup.request.lastName"
            label="Last Name"
            variant="outlined"
          >
            <template #append-inner>
              <v-icon
                color="red"
                size="x-small"
              >
                mdi-asterisk
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="newsletterSignup.request.emailAddress"
            label="Email Address"
            variant="outlined"
          >
            <template #append-inner>
              <v-icon
                color="red"
                size="x-small"
              >
                mdi-asterisk
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="newsletterSignup.confirm.emailAddressConfirmation"
            label="Confirm Email Address"
            variant="outlined"
          >
            <template #append-inner>
              <v-icon
                color="red"
                size="x-small"
              >
                mdi-asterisk
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            color="red"
            block
            @click="submitSignupRequest()"
          >
            Sign Me Up!
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
    import { ref } from 'vue';
    import { useMailStore } from '@/store/mail';
    import { validate } from '../utils/validationUtils';
    import newsletterSignupRequestSchema from '@mhlc/content-api/schemas/newsletterSignupRequest.json';

    const newsletterSignup = ref({
        request: {
            firstName: '',
            lastName: '',
            emailAddress: ''
        },
        confirm: {
            emailAddressConfirmation: '',
        },
        validationResult: null
    });

    const signupComplete = ref(false);
    const signupError = ref(false);
    const memberExistsMsg = ref(false);

    const submitSignupRequest = async () => {
        signupError.value = false;
        const signup = newsletterSignup.value;
        signup.validationResult = validate(signup.request, newsletterSignupRequestSchema);
        if (signup.confirm.emailAddressConfirmation.trim() === '' || signup.confirm.emailAddressConfirmation !== signup.request.emailAddress) {
            signup.validationResult.valid = false;
            signup.validationResult.errors = signup.validationResult.errors || {};
            signup.validationResult.errors.emailAddressConfirmation = { failed: { invalid: true }};
        }
        if(signup.validationResult.valid) {
            try {
                const { success, memberExists } = await useMailStore().addMemberToNewsletter(signup.request);
                signupComplete.value = success;
                memberExistsMsg.value = memberExists;
            } catch (error) {
                console.log(error);
                signupError.value = true;
            }
        }
    };
</script>

<style>
    .v-container.newsletter-signup-form .v-alert { margin-bottom: 20px; }
    .v-container.newsletter-signup-form .v-alert .instructions { margin-bottom: 5px; }
    .v-container.newsletter-signup-form .v-alert .required-note { text-align: right; }
    .v-container.newsletter-signup-form .v-col { padding-top: 0px; padding-bottom: 0px; }
</style>