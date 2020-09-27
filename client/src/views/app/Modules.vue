<template>
  <div>
      <v-card outlined>
          <v-card-title primary-title>
            Dostępne moduły
              <v-spacer></v-spacer>
            <v-btn color="primary" small outlined>Dodaj</v-btn>
          </v-card-title>
          <v-card-text>
                <v-row>
                  <v-col cols="6" md="3">
                      <v-card outlined>
                          <v-card-title primary-title class="py-2">
                            Obieranie marchewki
                          </v-card-title>
                          <v-card-text class="py-1">
                              Wartość: <b>1,5 KW</b><br />
                              Napęd: <b>Prąd</b><br />
                              Warzywo: <b>Marchewka</b><br />
                              Odpad: <b>Tak</b>

                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red lighten-5" class="red--text elevation-0" small>Skasuj</v-btn>
                            <v-btn color="blue lighten-5" class="blue--text elevation-0" small>Edytuj</v-btn>

                          </v-card-actions>
                      </v-card>
                  </v-col>
                </v-row>
          </v-card-text>
          <DeleteConfirmation />
      </v-card>
  </div>
</template>

<script>
import DeleteConfirmation from '../../components/PopUp/DeleteConfrimation.vue';

export default {
  name: "ModulesPage",
  components: {
    DeleteConfirmation
  },
  data: () => ({

  })
};
</script>

<style></style>
