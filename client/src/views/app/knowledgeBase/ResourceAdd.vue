<template>
  <v-container>
    <v-card class="mx-auto" max-width="800" tile>
      <v-form ref="form" class="mt-2">
        <v-list-item>
          <v-text-field v-model="resource.name_pl" label="Nazwa PL" required outlined></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="resource.name_eng" label="Nazwa EN" required outlined></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="resource.description_pl" label="Opis PL" outlined></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="resource.description_eng" label="Opis EN" outlined></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="resource.cat_id"
            :items="categories"
            item-text="cat_name_pl"
            item-value="cat_id"
            label="Kategoria"
            outlined
          ></v-select>
        </v-list-item>
      </v-form>

      <v-spacer></v-spacer>
      <v-data-table :headers="headers" :items="resource.factors" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Współczynniki</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <template>
              <v-btn dark class="mx-2" fab small @click="sourcePop = true">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:[`item.combine`]="{ item }">
          {{ item.factor }} {{ item.factor_unit }}/{{ item.resource_unit_1 }}
        </template>
      </v-data-table>

      <v-card-actions>
        <v-btn @click="addRes" color="primary">Dodaj</v-btn>
        <v-spacer />
        <router-link :to="{ name: 'resources' }" tag="v-btn">
          <v-btn color="warning">Anuluj</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
    <source-pop
      v-if="sourcePop"
      @close="sourceClose"
      @created="sourceCreated"
      @save="saveItem"
      :editedItem="editedItem"
      :editedIndex="editedIndex"
    ></source-pop>
  </v-container>
</template>

<script>
import SourcePop from "@/components/PopUp/Source1AddPop.vue"

export default {
  components: {
    SourcePop
  },
  data: () => ({
    dialog: false,
    sourcePop: false,
    categories:[],
    headers: [
      {
        text: "Nazwa",
        value: "factor_name_pl"
      },
      { text: "Wartość", value: "combine" },
      { text: "Niepewność", value: "uncertainty" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    //    {
    //   factor_id: null,
    //   source_id: null,
    //   factor: null,
    //   factor_unit: null,
    //   resource_unit_1: null,
    //   uncertainty: null,
    //   factor_name_pl: null,
    // },
    resource: {
      name_pl: null,
      name_eng: null,
      description_pl: null,
      description_eng: null,
      cat_id: null,
      factors: [],
    },
    editedIndex: -1,
    editedItem: {
      factor_id: null,
      source_id: null,
      factor: null,
      factor_unit: null,
      resource_unit_1: null,
      uncertainty: null,
      factor_name_pl: null
    },
    defaultItem: {
      factor_id: null,
      source_id: null,
      factor: null,
      factor_unit: null,
      resource_unit_1: null,
      uncertainty: null,
      factor_name_pl: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.axios
      .get(this.$api+"/api/cat/getall")
      .then((response) => {
        this.categories = response.data.rows;
      });
  },

  methods: {
    sourceClose() {
      this.sourcePop = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    sourceCreated(source) {
      this.resource.factors.push(source);
      this.sourcePop = false;
    },

    editItem(item) {
      this.editedIndex = this.resource.factors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.sourcePop = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    saveItem(item) {
      Object.assign(this.resource.factors[this.editedIndex], item);
      this.editedIndex = -1;
      this.sourcePop = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    addRes(){
      this.axios.post(this.$api+"/api/resources/add", this.resource)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>
