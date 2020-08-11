<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Dodaj współczynnik</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="saveData.factor_id"
                :items="factors"
                item-text="factor_id"
                item-value="factor_id"
                label="Nazwa współczynnika"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="1" justify="center" align="center" class="mt-1">
              <v-btn dark fab small @click="factorPop = true">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="4">
              <v-select
                v-model="saveData.source_id"
                :items="sources"
                item-text="source_description"
                item-value="source_id"
                label="Źródło"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="1" justify="center" align="center" class="mt-1">
              <v-btn dark fab small @click="sourcePop = true">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="saveData.factor"
                label="Wartość"
                :hint="'kg/(kg*kg)'"
                :persistent-hint="true"
              ></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-select
                v-model="saveData.factor_unit"
                :items="units"
                item-text="unit"
                item-value="unit"
                label="kg"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="saveData.resource_unit_1"
                :items="units"
                item-text="unit"
                item-value="unit"
                label="m3"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                :items="units"
                item-text="unit"
                item-value="unit"
                label="kg"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="saveData.uncertainty"
                label="Niepewność"
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
      <FactorAddPop
        v-if="factorPop"
        @created="factorCreated"
        @close="factorClose"
      ></FactorAddPop>
      <SourceAddPop
        v-if="sourcePop"
        @created="sourceCreated"
        @close="sourceClose"
      ></SourceAddPop>
    </v-card>
  </v-dialog>
</template>

<script>
import FactorAddPop from "./FactorAddPop";
import SourceAddPop from "./SourceAddPop";

export default {
  props: ["editedItem", "editedIndex"],
  components: {
    FactorAddPop,
    SourceAddPop,
  },
  data() {
    return {
      items: [],
      dialog: true,
      factorPop: false,
      sourcePop: false,
      loading: false,
      factors: [],
      sources: [],
      units: [],
      saveData: {
        factor_id: null,
        source_id: null,
        factor: null,
        factor_unit: null,
        resource_unit_1: null,
        uncertainty: null,
      },
    };
  },
  mounted() {
    this.axios
      .get(this.$api+"/api/resources/getallfactor")
      .then((response) => {
        this.factors = response.data;
      });
    this.axios
      .get(this.$api+"/api/resources/getallsource")
      .then((response) => {
        this.sources = response.data;
      });
    this.axios
      .get(this.$api+"/api/resources/getallunit")
      .then((response) => {
        this.units = response.data;
      });
    this.saveData = this.editedItem;
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
      let index = this.factors.findIndex(
        (el) => el.factor_id == this.saveData.factor_id
      );
      this.saveData.factor_name_pl = this.factors[index].factor_name_pl;
      if (this.editedIndex != -1) {
        this.$emit("save", this.saveData);
      } else {
        this.$emit("created", this.saveData);
      }
    },
    factorClose() {
      this.factorPop = false;
    },
    sourceClose() {
      this.sourcePop = false;
    },
  },
};
</script>

<style></style>
