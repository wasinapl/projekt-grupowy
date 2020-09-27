<template>
    <v-container fluid>
      <v-card outlined>
        <v-alert
          type="success"
          v-show="messageSuccess.length != 0"
          transition="fab-transition"
          v-text="messageSuccess"
        ></v-alert>
        <v-card-title>
          Jednostki
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
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">Dodaj</v-btn>
                </template>

                <v-alert
                  type="warning"
                  transition="fab-transition"
                  v-show="messageError.length != 0"
                  v-text="messageError"
                ></v-alert>
                <v-alert
                  type="success"
                  v-show="successQuan.length != 0"
                  transition="fab-transition"
                  v-text="successQuan"
                ></v-alert>
                <v-card>
                  <v-card-text>
                    <v-container id="edit">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.unit_name_pl" label="Nazwa PL"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.unit_name_eng" label="Nazwa ENG"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.unit" label="Skrót"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-row rows="12">
                            <v-select
                              v-model="editedItem.base_unit"
                              :items="quantities"
                              item-value="quantity_id"
                              item-text="quantity_name_pl"
                              menu-props="auto"
                              label="Wielkość fizyczna"
                              hide-details
                              single-line
                              @change="selectChange"
                            ></v-select>

                            <div class="text-center">
                              <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-x
                              >
                                <template v-slot:activator="{ on }">
                                  <v-btn v-on="on" fab dark small color="primary">
                                    <v-icon dark>mdi-plus</v-icon>
                                  </v-btn>
                                </template>
                                <v-alert
                                  type="error"
                                  transition="fab-transition"
                                  v-show="messNotExsist.length != 0"
                                  v-text="messNotExsist"
                                ></v-alert>
                                <v-card>
                                  <v-list>
                                    <v-list-item>
                                      <v-list-item-content>
                                        <v-list-item-title>Wprowadź wielkośc fiz/chem</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>

                                  <v-divider></v-divider>

                                  <v-list>
                                    <v-list-item>
                                      <v-list-item-action>
                                        <v-text-field
                                          v-model="inputItem.unit_name_pl"
                                          label="Nazwa PL"
                                        ></v-text-field>
                                      </v-list-item-action>
                                    </v-list-item>

                                    <v-list-item>
                                      <v-list-item-action>
                                        <v-text-field
                                          v-model="inputItem.unit_name_eng"
                                          label="Nazwa ENG"
                                        ></v-text-field>
                                      </v-list-item-action>
                                    </v-list-item>
                                    <v-list-item>
                                      <v-list-item-action>
                                        <v-text-field
                                          v-model="inputItem.unit"
                                          label="Jednostka bazowa"
                                        ></v-text-field>
                                      </v-list-item-action>
                                    </v-list-item>
                                  </v-list>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn text @click="closeInput">Anuluj</v-btn>
                                    <v-btn color="primary" text @click="saveInput">Zapisz</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-menu>
                            </div>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.quantity_name"
                            label="Jednostka bazowa"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.ratio"
                            label="Przelicznik"
                            type="number"
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
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
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
      dialog: false,
      loading: false,
      headers: [
        {
          text: "Lp",
          align: "start",
          sortable: false
        },
        { text: "Skrót", value: "unit" },
        { text: "Nazwa PL", value: "unit_full_name_pl" },
        { text: "Nazwa EN", value: "unit_full_name_eng" },
        { text: "Wielkość PL", value: "quantity_name_pl" },
        { text: "Wielkość EN", value: "quantity_name_eng" },
        { text: "Jednostka bazowa", value: "base_unit" },
        { text: "Przelicznik", value: "ratio" }
      ],
      menu: null,
      messageSuccess: "",
      messageError: "",
      messNotExsist: "",
      successQuan: "",
      desserts: [],
      editedIndex: -1,
      inputItem: {
        unit_name_pl: "",
        unit_name_eng: "",
        unit: ""
      },
      editedItem: {
        unit: "",
        unit_name_pl: "",
        unit_name_eng: "",
        base_unit: null,
        ratio: "",
        quantity_name: ""
      },
      defaultItem: {
        resource_name_pl: "",
        resource_name_eng: "",
        gus_id: "",
        resource_description_pl: "",
        resource_description_eng: ""
      },
      quantities: []
      /*
      {
            "quantity_id": 1,
            "quantity_name_pl": "objętość",
            "base_unit": "m³"
        },
      */
    };
  },
  mounted() {
    this.loading = true;
    this.axios.get(this.$api+"/api/units/getall").then(response => {
      this.desserts = response.data.rows;
      this.loading = false;
    });
    this.axios
      .get(this.$api+"/api/quantities/getall")
      .then(response => {
        this.quantities = response.data.rows;
        this.loading = false;
      });
  },
  methods: {
    selectChange() {
      let index = this.quantities.findIndex(
        el => el.quantity_id == this.editedItem.base_unit
      );
      this.editedItem.quantity_name = this.quantities[index].base_unit;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
          .then(response => {
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
          .post(this.$api+"/api/units/add", {
            unit: this.editedItem.unit,
            unit_full_name_pl: this.editedItem.unit_name_pl,
            unit_full_name_eng: this.editedItem.unit_name_eng,
            ratio: this.editedItem.ratio,
            quantity_id: this.editedItem.base_unit
          })
          .then(response => {
            if (response.data.name == "error") {
              this.messageError =
                response.data.code == "23505"
                  ? "Wielkość jest już w bazie"
                  : "Nie udało się";
            } else {
              this.desserts.push(response.data.rows[0]);
              this.messageError = "";
              this.messageSuccess = "Pomyślnie dodano";
              setTimeout(() => {
                this.messageSuccess = "";
              }, 5000);
              this.close();
            }
          })
          .catch(err => console.log(err));
      }
    },
    closeInput() {
      this.menu = false;
    },
    saveInput() {
      this.axios
        .post(this.$api+"/api/quantities/add", {
          unit_full_name_pl: this.inputItem.unit_name_pl,
          unit_full_name_eng: this.inputItem.unit_name_eng,
          unit: this.inputItem.unit
        })
        .then(response => {
          if (response.data.name == "error") {
            this.messNotExsist = "Wielkość nie istnieje!";
            setTimeout(() => {
              this.messNotExsist = "";
            }, 5000);
          } else {
            this.messNotExsist = "";
            this.quantities.push(response.data.rows[0]);
            this.successQuan = "Pomyślnie dodano";
            this.inputItem.unit_name_pl = "";
            this.inputItem.unit_name_eng = "";
            this.inputItem.unit = "";
            setTimeout(() => {
              this.successQuan = "";
            }, 5000);
            this.menu = false;
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
