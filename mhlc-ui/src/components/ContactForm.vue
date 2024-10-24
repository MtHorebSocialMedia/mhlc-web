<template>
    <v-container class="contact-form">
        <v-alert>
            <p class="instructions">Please fill out and submit the following form and we will contact you as soon as possible.</p>
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
                        label="Preferred Method of Contact"
                        :items="['Email', 'Phone']"
                        variant="outlined"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select
                        label="Nature of Contact"
                        :items="['Pastor', 'Office', 'Preschool', 'Social Media & Technology', 'Worship', 'Learn', 'Witness', 'Serve', 'Support']"
                        variant="outlined"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        label="Question/Comment"
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
                    <v-btn color="red" block>Submit</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
</script>

<style>
    .v-container.contact-form .v-alert { margin-bottom: 20px; }
    .v-container.contact-form .v-alert .instructions { margin-bottom: 5px; }
    .v-container.contact-form .v-alert .required-note { text-align: right; }
    .v-container.contact-form .v-col { padding-top: 0px; padding-bottom: 0px; }
</style>