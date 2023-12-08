<template>
<v-container>
    <v-form>
        <v-row>
            <v-col cols="4">
                <v-text-field label="Ficha"></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field label="Nivel"></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field label="Situación contractual"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field label="Nombre"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field label="Àrea"></v-text-field>
            </v-col>
        </v-row>
    </v-form>
</v-container>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>