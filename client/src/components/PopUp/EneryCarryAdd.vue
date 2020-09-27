<template>
  <v-dialog v-model="dialog" max-width="500px" >
    <v-card>
      <v-card-title>
        Dodawanie nośnika energii
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
              <v-select
                v-model="saveData.gus_id"
                :items="gus"
                item-text="resource_name_pl"
                item-value="gus_id"
                label="Nośnik wg GUS"
                outlined
                append-outer-icon="mdi-plus"
                @click:append-outer="gusPop = true"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="saveData.gus_id"
                label="Kod GUS"
                disabled
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.gus_id"
                label="Nazwa "
                outlined
              ></v-text-field>
            </v-col>
              <v-col cols="4">
                <v-subheader>Equiv kg CO2/unit</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.resource_description_pl"
                  label="Wpisz wartość"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="saveData.factor_id"
                  :items="units"
                  item-text="unit"
                  item-value="unit"
                  label="Jednostka"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-subheader>NCV [MJ/kg]</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.resource_description_pl"
                  label="Wpisz wartość"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4"></v-col>
              <v-col cols="4">
                <v-subheader>WE [kg/GJ]</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="editedItem.resource_description_pl"
                  label="Wartość"
                  disabled
                  outlined
                ></v-text-field>
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
    <GusResourcesAdd @close="gusClose" @save="gusSave" v-if="gusPop" ></GusResourcesAdd>
  </v-dialog>
</template>

<script>

import GusResourcesAdd from './GusResourcesAdd'

export default {
  props: ["editedItem"],
  components: {
    GusResourcesAdd
  },
  data() {
    return {
      dialog: true,
      gusPop: false,
      saveData: {},
      factors: [],
      gus: [],
      units: [],
    };
  },
  watch: {
    dialog(val) {
      if (!val) this.$emit("close");
    },
  },
  mounted() {
    this.axios
      .get(this.$api + "/api/energyresources/getbygusall")
      .then((response) => {
        this.gus = response.data.rows;
      });
    this.axios
      .get(this.$api + "/api/energyresources/getallunits")
      .then((response) => {
        this.units = response.data.rows;
      });
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {

      this.$emit("created");
    },
    gusClose(){
      this.gusPop = false;
    },
    gusSave(el){
      this.gus.push(el);
      this.gusPop = false;
    }
  },
};
</script>

<style></style>
