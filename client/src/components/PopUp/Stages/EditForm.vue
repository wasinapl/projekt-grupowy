<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      overlay-opacity="0.9"
    >
    <v-card v-if="item !== null">
        <v-card-title>
          <span>Edycja modułów etapu</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters v-if="select.length > 0">
                <v-col cols="10">
                <v-select :items="select" outlined dense v-model="modul">
                </v-select>
                </v-col>
                <v-col cols="2">
                    <v-btn color="green lighten-2" outlined block class="ml-2 green--text" style="padding: 19px 15px !important;" @click="addModule">Dodaj</v-btn>
                </v-col>
            </v-row>
            <v-row no-gutters v-if="item.modules.length > 0">
                <v-col cols="12" v-for="(item, i) in item.modules" :key="i">
                    <v-row>
                      <v-col cols="9">
                      <h4>{{i+1}} - {{item.text}}</h4>
                      </v-col>
                      <v-col cols="3" class="text-right">
                      <v-btn color="red" outlined small @click="deleteModule(i)">Skasuj</v-btn>
                      </v-col>
                      <v-divider></v-divider>
                    </v-row>

                </v-col>
            </v-row>
            <v-row no-gutters v-if="select.length < 1">
                <v-col cols="12" class="text-center">
                    <h3>Brak dostępnych modułów dla tego warzywa!</h3>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-4" class="elevation-0" small @click="cancel()">Anuluj</v-btn>
          <v-btn color="green lighten-5" class="green--text elevation-0" small @click="update()">Zapisz</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>

 export default {
    name: 'StagesEdit',
    props:{
       item:  Object,
    },
    data: () => ({
        loading: false,
        dialog: false,
        modul: null,
        lista: [],
        select: []
    }),
    watch:{
      item(val){
        if(val) {
            this.dialog = true;
            this.lista = this.item.modules;
            this.formDialogs(val.resource_id)
        }else this.dialog = false;
      }
    },
    methods:{
      addModule(){
          let found = this.select.find(el => el.value === this.modul);
          if(found){
          this.item.modules.push(found);
          }
      },
      deleteModule(i){
          this.lista.splice(i, 1);
      },
      cancel(){
        this.dialog = false;
        this.$emit('onClose', false);
      },
      async update(){
        try{
            let modules = this.item.modules.map(el => el.value);
            let response =  await this.axios.post(this.$api + "/api/stages/modules", {data: {id: this.item.id, modules: modules}});
            this.$toast.success("Pomyślnie dodano moduły do etapu!");
            this.$emit('onClose', true)
            console.log(response);
        }catch(e){
          this.$toast.error("Wystąpił błąd przy tworzeniu etapu! Sprawdź konsolę");
          console.error(e);
        }
      },
      formDialogs(id){
        this.loading = true;
        this.axios.get(this.$api + "/api/modules/byVegetable/", {params: {id: id}})
          .then(res => {
              this.select = res.data;
          })
          .catch(err => {
            console.error(err);
            this.$toast.error("Wystąpił błąd przy pobieraniu modułów!");
          })
          .finally(() => {this.loading = false;})
      }
    },
    }
</script>