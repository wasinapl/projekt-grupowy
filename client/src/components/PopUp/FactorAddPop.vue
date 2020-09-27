<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Dodawanie nowego współczynnika</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field label="Nazwa PL" outlined></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="Nazwa EN" outlined></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="Skrót" outlined></v-text-field>
            </v-col>
            <v-col cols="6"></v-col>

            <v-col cols="12">
              <v-text-field label="Opis PL" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Opis EN" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Anuluj</v-btn>
        <v-btn color="blue darken-1" text @click="save">Dodaj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      items: [],
      editedItem: {},
    };
  },
  watch: {
    dialog(val) {
      if (!val) this.$emit("close");
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("created");
    },
  },
};
</script>

<style></style>
