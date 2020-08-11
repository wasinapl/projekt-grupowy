<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Dodaj moduł</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Nowy Moduł</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nazwa*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Moc" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" >
                  <v-select :items="items" label="Wybierz warzywo"></v-select>
                </v-col>
                <v-col cols="12" >
                  <v-select :items="items" label="Wybierz zasoby"></v-select>
                </v-col>                
                <v-col cols="12" >
                  <v-select :items="items" label="Wybierz rodzaj selekcji"></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Anuluj</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Zapisz</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-sheet class="mx-auto" elevation="8" max-width="800">
      <v-slide-group v-model="model" class="pa-4" show-arrows>
        <v-slide-item v-for="n in 15" :key="n" v-slot:default="{ active, toggle }">
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="100"
            width="200"
            @click="toggle"
          >
            <v-row align="center" justify="left">
              <v-scale-transition>
                <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
              </v-scale-transition>
            </v-row>
            <v-row align="center" justify="center">siema</v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
          <v-row class="fill-height" align="center" justify="center">
            <h3 class="title">Selected {{ model }}</h3>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    model: null,
    dialog: false
  })
};
</script>

<style></style>
