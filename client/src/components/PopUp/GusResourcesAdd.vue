<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Dodaj nową nazwę nośnika energii wg GUS</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-text-field
                v-model="saveData.resource_name_pl"
                label="Nośnik"
                outlined
                required
              ></v-text-field>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-text-field
                v-model="saveData.gus_id"
                label="Kod GUS "
                @change="fillRestGUS"
                outlined
                counter
                maxlength="3"
                required
              ></v-text-field>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="close">Anuluj</v-btn>
          <v-btn color="primary" text @click="save">Dodaj</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: true,
      saveData: {},
    };
  },
  watch: {
    menu(val) {
      if (!val) this.$emit("close");
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.axios
        .post(this.$api + "/api/energyresources/addreswithgus", this.saveData)
        .then((response) => {
            console.log(response);
          this.$emit("save", this.saveData);
        });
    },
    fillRestGUS(val) {
      if (val.length == 1) {
        this.saveData.gus_id = "00" + val;
      } else if (val.length == 2) {
        this.saveData.gus_id = "0" + val;
      }
    },
  },
};
</script>

<style></style>
