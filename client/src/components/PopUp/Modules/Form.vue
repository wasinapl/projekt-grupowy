<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      overlay-opacity="0.9"
    >
    <v-card v-if="item !== null">
        <v-card-title>
          <span v-if="item.id === null">Tworzenie modułu</span>
          <span v-else>Edycja modułu</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field label="Nazwa modułu *" required outlined v-model="item.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Wartość" required outlined v-model.number="item.value"></v-text-field>
              </v-col>
              <v-col cols="12">
                 <v-select
                  :items="select.vegetables"
                  label="Warzywo"
                  v-model="item.vegetable"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="select.resources"
                  label="Napęd"
                  v-model="item.energy"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
               <v-switch
                  v-model="item.waste"
                  inset
                  label="Odpady"
                ></v-switch>
              </v-col>

            </v-row>
          </v-container>
          <small>*wymagane pola</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-4" class="elevation-0" small @click="cancel()">Anuluj</v-btn>
          <v-btn color="green lighten-5" class="green--text elevation-0" small @click="save()"><span v-if="inDatabase">Zapisz</span><span v-else>Dodaj</span></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>

 export default {
    name: 'ModulesForm',
    props:{
      item: {
        type: Object,
        default: () => ({
            id: null,
            name: '',
            value: 0,
            vegetable: 0,
            energy: 0,
            waste: false
        })
      }
    },
    data: () => ({
        loading: false,
        dialog: false,
        select: {
          vegetables: [],
          resources: [],
        }
    }),
    watch:{
      item(val){
        if(val) this.dialog = true;
        else this.dialog = false;
      }
    },
    computed:{
        inDatabase: function(){
            if(this.item.id === null) return false;
            return true;
        }
    },
    methods:{
      cancel(){
        this.dialog = false;
        this.$emit('onClose');
      },
      save(){
          if(this.item.id === null) this.create();
          else this.update();
      },
      async create(){
        try{
            let response =  await this.axios.post(this.$api + "/api/modules", this.item);
            console.log(response);
            this.$toast.success("Pomyślnie utworzono moduł!");
        }catch(e){
          console.error(e);
        }
        this.$emit('onClose');
      },
      async update(){
        try{
            let response =  await this.axios.put(this.$api + "/api/modules", this.item);
            console.log(response);
            this.$toast.success("Pomyślnie zaktualizowano moduł!");
        }catch(e){
          console.error(e);
        }
        this.$emit('onClose');
      },
      formDialogs(){
        this.loading = true;
        this.axios.get(this.$api + "/api/modules/formSelect")
          .then(res => {
              this.select = res.data;
          })
          .catch(err => {
            console.error(err);
            this.$toast.error("Wystąpił błąd przy pobieraniu warzyw i napędów!");
          })
          .finally(() => {this.loading = false;})
      }
    },
    created(){
      this.formDialogs();
    }
  }
</script>