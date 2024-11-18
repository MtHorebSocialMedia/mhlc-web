<template>
    <v-container class="login-form">
        <v-alert>
            <p class="instructions">
                Please provide the appropriate credentials for accessing the administrative features.
            </p>
            <p class="required-note"><v-icon color="red" size="x-small">mdi-asterisk</v-icon> indicates a required field.</p>
        </v-alert>
        <v-alert v-if="loginError" type="error">
            <p class="instructions">
                We are currently experiencing a technical issue.  Please try again later or contact the church office.
            </p>
        </v-alert>
        <v-alert v-if="loginInvalid" type="error">
            <p class="instructions">
                Please provide valid credentials for accessing the administrative features.
            </p>
        </v-alert>
        <v-alert v-if="login.validationResult && !login.validationResult.valid" type="error">
            <div v-if="login.validationResult.errors.userName">
                The user name field is required.
            </div>
            <div v-if="login.validationResult.errors.password">
                The password field is required.
            </div>
        </v-alert>
        <br />
        <v-form v-if="!loginComplete">
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="login.request.userName"
                        label="User Name"
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
                        v-model="login.request.password"
                        label="Password"
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
                        @click="submitLoginRequest()"
                    >
                        Login
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSecurityStore } from '@/store/security';
    import { validate } from '../utils/validationUtils';
    import authenticationRequestSchema from '@mhlc/content-api/schemas/authenticationRequest.json';

    const login = ref({
        request: {
            userName: '',
            password: ''
        },
        validationResult: null
    });

    const loginComplete = ref(false);
    const loginError = ref(false);
    const loginInvalid = ref(false);

    const submitLoginRequest = async () => {
        loginError.value = false;
        loginInvalid.value = false;
        const loginVal = login.value;
        loginVal.validationResult = validate(loginVal.request, authenticationRequestSchema);
        if(loginVal.validationResult.valid) {
            try {
                const { success } = await useSecurityStore().login(loginVal.request);
                loginInvalid.value = !success;
                loginComplete.value = success;
            } catch (error) {
                console.log(error);
                loginError.value = true;
            }
        }
    };
</script>

<style>
    .v-container.login-form .v-alert { margin-bottom: 20px; }
    .v-container.login-form .v-alert .instructions { margin-bottom: 5px; }
    .v-container.login-form .v-alert .required-note { text-align: right; }
    .v-container.login-form .v-col { padding-top: 0px; padding-bottom: 0px; }
</style>