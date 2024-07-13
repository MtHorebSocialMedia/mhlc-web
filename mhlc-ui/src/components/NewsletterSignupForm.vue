<template>
    <v-container class="newsletter-signup-form">
        <v-alert>
            <p class="instructions">
                If you’d like to receive regular news from our website, sign up using the form below.
                After you submit the form, check your email for the confirmation and be sure to check the link to be placed on our list.
            </p>
            <p class="required-note"><v-icon color="red" size="x-small">mdi-asterisk</v-icon> indicates a required field.</p>
        </v-alert>
        <v-form>
            <v-row>
                <v-col>
                    <v-text-field
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
                    <v-btn color="red" block>Sign Me Up!</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    const contentStore = useContentStore();
</script>

<style>
    .v-container.newsletter-signup-form .v-alert { margin-bottom: 20px; }
    .v-container.newsletter-signup-form .v-alert .instructions { margin-bottom: 5px; }
    .v-container.newsletter-signup-form .v-alert .required-note { text-align: right; }
    .v-container.newsletter-signup-form .v-alert .required-note { text-align: right; }
    .v-container.newsletter-signup-form .v-col { padding-top: 0px; padding-bottom: 0px; }
</style>