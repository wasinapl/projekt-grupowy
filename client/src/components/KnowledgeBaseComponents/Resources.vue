<template>
  <v-container>
    <v-card>
      <v-card-title>
        Surowce
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="resources"
        :search="search"
        sort-by="calories"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Szukaj"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'resourcesadd' }" tag="v-btn">
            <v-btn color="primary">Dodaj</v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      loading: false,
      editedItem: {},
      headers: [
        {
          text: "Lp",
          align: "start",
          sortable: false
        },
        { text: "Nazwa PL", value: "name_pl" },
        { text: "Nazwa ENG", value: "name_eng" },
        { text: "Ślad węglowy", value: "cf" },
        { text: "Ślad wodny", value: "wf" },
        { text: "Wartość energetyczna", value: "ev" },
        { text: "Źródło", value: "source" },
        { text: "Kategorie", value: "category" }
      ],
      resources: []
    };
  },
  mounted() {
    this.loading = true;
    this.axios
      .get(this.$api+"/api/resources/getall")
      .then((response) => {
          console.log(response.data)
        this.resources = response.data;
        this.loading = false;
      });
  }
};
</script>

<style></style>
