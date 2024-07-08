<template>
    <v-container class="contact">
        <h2>Contact</h2>
        <hr />
        <v-alert>
            <p class="instructions">Please fill out and submit the following form and we will contact you as soon as possible.</p>
            <p class="required-note"><v-icon color="red" size="x-small">mdi-asterisk</v-icon> indicates a required field.</p>
        </v-alert>
        <v-container>
            <v-form>
                <v-row>
                    <v-text-field
                        label="First Name"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label="Last Name"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label="Email Address"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label="Phone Number"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-text-field>
                </v-row>
                <v-row>
                    <v-select
                        label="Preferred Method of Contact"
                        :items="['Email', 'Phone']"
                        variant="outlined"
                    ></v-select>
                </v-row>
                <v-row>
                    <v-select
                        label="Nature of Contact"
                        :items="['Pastor', 'Office', 'Preschool', 'Social Media & Technology', 'Worship', 'Learn', 'Witness', 'Serve', 'Support']"
                        variant="outlined"
                    ></v-select>
                </v-row>
                <v-row>
                    <v-textarea
                        label="Question/Comment"
                        variant="outlined"
                    >
                        <template v-slot:append-inner>
                            <v-icon color="red" size="x-small">mdi-asterisk</v-icon>
                        </template>
                    </v-textarea>
                </v-row>
                <v-row>
                <v-btn color="red" block>Submit</v-btn>
                </v-row>
            </v-form>
        </v-container>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import RichTextRenderer from 'contentful-rich-text-vue-renderer';
    const contentStore = useContentStore();
    const { news } = storeToRefs(contentStore);
    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }
</script>

<style>
.v-container.contact .v-alert { margin-bottom: 20px; }
.v-container.contact .v-alert .instructions { margin-bottom: 5px; }
.v-container.contact .v-alert .required-note { text-align: right; }
.v-container.contact h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.contact hr { margin-bottom: 20px; }
</style>