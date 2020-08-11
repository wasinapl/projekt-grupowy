<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          Nośniki Energii
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
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
                  <v-btn color="primary" dark class="mb-2" @click="energyAdd = true"
                    >Dodaj</v-btn
                  >

            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <EnergyCarryAdd v-if="energyAdd" @close="popClose" editedItem="editedItem"></EnergyCarryAdd>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import EnergyCarryAdd from './PopUp/EneryCarryAdd'


export default {
  components: {
    EnergyCarryAdd
  },
  data() {
    return {
      search: "",
      dialog: false,
      loading: false,
      energyAdd: false,
      headers: [
        {
          text: "Lp",
          align: "start",
          sortable: false,
          value: "resource_id",
        },
        { text: "Nazwa zasobu PL", value: "resource_name_pl" },
        { text: "Nazwa zasobu ENG", value: "resource_name_eng" },
        { text: "Kod GUS", value: "gus_id" },
        { text: "Ślad węglowy", value: "carbonFootPrint" },
        { text: "Niepewność", value: "uncertainty" },
        { text: "Źródło", value: "source_description" },
        { text: "Kategorie", value: "categories"},
        { text: "Akcje", value: "actions", sortable: false},
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        resource_name_pl: "",
        resource_name_eng: "",
        gus_id: "",
        resource_description_pl: "",
        resource_description_eng: "",
      },
      defaultItem: {
        resource_name_pl: "",
        resource_name_eng: "",
        gus_id: "",
        resource_description_pl: "",
        resource_description_eng: "",
      },
    };
  },
  mounted() {
    this.loading = true;
    this.axios
      .get(this.$api+"/api/energyresources/getall")
      .then((response) => {
        this.desserts = response.data.rows;
        this.loading = false;
      });
  },
  methods: {
    popClose(){
      this.energyAdd = false;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.energyAdd = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      console.log(
        this.$api+"/api/energyresources/delete/" +
          this.desserts[index].resource_id
      );
      confirm("Are you sure you want to delete this item?") &&
        this.axios
          .delete(
            this.$api+"/api/energyresources/delete/" +
              this.desserts[index].resource_id
          )
          .then((response) => {
            console.log(response);
            this.desserts.splice(index, 1);
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.axios.post(
          this.$api+"/api/energyresources/update/" +
            this.desserts[this.editedIndex].resource_id,
          this.editedItem
        );
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.axios
          .post(this.$api+"/api/energyresources/add", {
            resource_name_pl: this.editedItem.resource_name_pl,
            resource_name_eng: this.editedItem.resource_name_eng,
            gus_id: this.editedItem.gus_id,
            resource_description_pl: this.editedItem.resource_description_pl,
            resource_description_eng: this.editedItem.resource_description_eng,
          })
          .then((response) => {
            this.desserts.push(response.data.rows[0]);
          });
      }

      this.close();
    },
  },
};
</script>
