<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Dodaj źródło</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6">
              <v-text-field label="DOI" outlined></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field label="Opis" outlined></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea label="BibTex" auto-grow outlined rows="4" row-height="25"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                @change="onFileChange"
                color="deep-purple accent-4"
                counter
                label="Plik"
                placeholder="Wybierz plik"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >+{{ files.length - 2 }} plik(ów)</span>
                </template>
              </v-file-input>
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
      files: [],
      selectedFile: "",
      editedItem: {},
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
     
    };
  },
  watch: {
    dialog(val) {
      if (!val) this.$emit("close");
    }
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {},
    close() {
      this.$emit("close");
    },
    save() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file

      // sending file to the backend
      console.log(formData.getAll("file"));
      this.axios
        .post(this.$api+"/api/resources/sourceUploadFile", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.$emit("created");
    }
  }
};
</script>

<style></style>
