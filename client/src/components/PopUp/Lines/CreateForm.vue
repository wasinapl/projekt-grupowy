<template>
    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
      overlay-opacity="0.9"
    >
    <v-card>
        <v-card-title>
          <span>Tworzenie lini</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field label="Nazwa etapu" required outlined v-model="item.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                 <v-select
                  :items="select"
                  label="Warzywo"
                  v-model="item.vegetable"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-4" class="elevation-0" small @click="cancel()">Anuluj</v-btn>
          <v-btn color="green lighten-5" class="green--text elevation-0" small @click="create()">Dodaj</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>

 export default {
    name: 'LinesCreate',
    props:{
      show: Boolean,
    },
    data: () => ({
        loading: false,
        item: {
          name: '',
          vegetable: 0,
        },
        select: {}
    }),
    methods:{
      clearInputs(){
        this.item.name = "",
        this.item.vegetable = 0;
      },
      cancel(){
        this.dialog = false;
        this.clearInputs();
        this.$emit('onClose');
      },
      async create(){
        try{
            let response =  await this.axios.post(this.$api + "/api/lines", this.item);
            let etap = response.data[0];
            this.$toast.success("Pomyślnie utworzono linie!");
            this.clearInputs();
            this.$emit('onCreated', etap);
        }catch(e){
          this.$toast.error("Wystąpił błąd przy tworzeniu lines! Sprawdź konsolę");
          console.error(e);
        }
      },
      formDialogs(){
        this.loading = true;
        this.axios.get(this.$api + "/api/modules/formSelect")
          .then(res => {
              this.select = res.data.vegetables;
          })
          .catch(err => {
            console.error(err);
            this.$toast.error("Wystąpił błąd przy pobieraniu warzyw!");
          })
          .finally(() => {this.loading = false;})
      }
    },
    created(){
      this.formDialogs();
    }
  }
</script>