<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
         <v-alert
          type="warning"
          transition="fab-transition"
          v-show="messageError.length != 0"
          v-text="messageError"
        ></v-alert>
        <v-alert
          type="success"
          transition="fab-transition"
          v-show="messageSuccess.length != 0"
          v-text="messageSuccess"
        ></v-alert>
        <v-card ref="form">
          <v-card-text>
            <v-text-field label="Nazwa PL" v-model="category.cat_name_pl"></v-text-field>
            <v-text-field label="Nazwa EN" v-model="category.cat_name_eng"></v-text-field>
            <v-text-field label="Opis PL" v-model="category.cat_des_pl"></v-text-field>
            <v-text-field label="Opis EN" v-model="category.cat_des_eng"></v-text-field>
            <v-combobox
              v-model="select"
              :items="categories"
              outlined
              label="Wybierz nadrzędne kategorie"
              chips
              clearable
            ></v-combobox>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn text>Anuluj</v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition></v-slide-x-reverse-transition>
            <v-btn color="primary" text @click="save">Dodaj</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      messageSuccess: "",
      messageError: "",
      categories: [],
      categoriesId: [],
      select: null,
      category: {
        cat_name_pl: "",
        cat_name_eng: "",
        cat_des_pl: "",
        cat_des_eng: ""
      }
    };
  },
  mounted() {
    this.loading = true;
    this.axios.get(this.$api+"/api/cat/getallp").then(response => {
      response.data.rows.forEach(element => {
        this.categories.push(element.cat_name_pl);
        this.categoriesId.push(element.parent_id);
      });
      this.loading = false;
    });
  },
  methods: {
    save() {
        var index = this.categories.findIndex(el => el == this.select);
      this.axios
        .post(this.$api+"/api/cat/add", {
          cat_name_pl: this.category.cat_name_pl,
          cat_name_eng: this.category.cat_name_eng,
          cat_des_pl: this.category.cat_des_pl,
          cat_des_eng: this.category.cat_des_eng,
          parent: this.categoriesId[index]
        })
        .then(response => {
          if (response.data.name == "error") {
              this.messageError="Wystąpił błąd dodawania";
               setTimeout(() => {
                this.messageError = "";
              }, 5000);
          } else {
              this.messageSuccess = "Pomyślnie dodano";
              setTimeout(() => {
                this.messageSuccess = "";
              }, 5000);
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
