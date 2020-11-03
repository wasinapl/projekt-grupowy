<template>
  <div>
      <v-card outlined>
          <v-card-title primary-title>
            Dostępne linie
              <v-spacer></v-spacer>
            <v-btn color="primary" small outlined @click="creating = true">Dodaj</v-btn>
          </v-card-title>
          <v-card-text>
                <v-row v-if="loading">
                  <v-col cols="6" md="3">
                   <v-skeleton-loader
                      class="mx-auto"
                      max-width="300"
                      type="card"
                  ></v-skeleton-loader>
                  </v-col>
                </v-row>
                <v-row v-else-if="!loading">
                  <v-col cols="6" sm="4" lg="3" v-for="item in items" :key="item.id" >
                      <v-card outlined>
                          <v-card-title primary-title class="py-2">
                            {{item.name}}
                          </v-card-title>
                          <v-card-text class="py-1 px-1">
                              <span class="px-5 ">Warzywo: <b>{{item.resource_name_pl}}</b></span><br />
                              <v-expansion-panels accordion class="elevation-0 mt-3" focusable flat active-class="blue darken-1">
                                <v-expansion-panel
                                class="elevation-0"
                                  v-for="(step, i) in item.stages"
                                  :key="i"
                                >
                                  <v-expansion-panel-header color="white"><span><small class="font-weight-bold mr-3">{{i+1}}</small> {{step.text}}</span></v-expansion-panel-header>
                                  <v-expansion-panel-content class="pt-3 white--text">
                                      <b v-if="step.modules.length > 0">Moduły składowe<br></b>
                                      <b v-else> nie zawiera modułów składowych<br></b>
                                      <span v-for="(item, j) in step.modules" :key="j">{{j+1}}) {{item.name}}<br></span>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>


                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red lighten-5" class="red--text elevation-0" small @click="deleteAlert(item)">Skasuj</v-btn>
                            <v-btn color="blue lighten-5" class="blue--text elevation-0" small @click="editItem(item)">Edytuj</v-btn>

                          </v-card-actions>
                      </v-card>
                  </v-col>
                </v-row>
                <v-row v-if="!loading && items.length < 1">
                  <v-col cols="12" class="text-center" >
                      <h4>Brak wyników</h4>
                  </v-col>
                </v-row>
          </v-card-text>
          <DeleteConfirmation keep-alive :item="deletedItem" @onConfirm="deleteItem()" @onCancel="deletedItem = null;" />
          <LinesCreate keep-alive :show="creating" @onClose="creating = false;" @onCreated="editCreatedItem"/>
          <LinesEdit :item="editingItem" @onClose="formClose"/>
      </v-card>
  </div>
</template>

<script>
import DeleteConfirmation from '../../components/PopUp/DeleteConfrimation.vue';
import LinesCreate from '../../components/PopUp/Lines/CreateForm.vue';
import LinesEdit from '../../components/PopUp/Lines/EditForm.vue';

export default {
  name: "StagesPage",
  components: {
    DeleteConfirmation,
    LinesCreate,
    LinesEdit
  },
  data: () => ({
    loading: false,
    deletedItem: null,
    editingItem: null,
    creating: false,
    items: []
  }),
  methods:{
    deleteAlert: function(item){
      this.deletedItem = item;
    },
    editCreatedItem: function(item){
      console.log(item);
      this.creating = false;
      this.fetchAll();
      this.editItem(item);
    },
    editItem: function(item){
      this.editingItem = item;
    },
    async deleteItem(){
      try{
          let response = await this.axios.delete(this.$api + '/api/lines', {data: {id: this.deletedItem.id}});
          console.log(response.data);
          this.fetchAll();
      }catch(e){
          this.$toast.error("Wystąpił problem przy kasowaniu lini! Sprawdź konsolę");
          console.error(e.response);
      }
      this.deletedItem = null;
    },
    formClose: function(refresh){
        this.editingItem = null;
        if(refresh) this.fetchAll();
    },
    fetchAll: function(){
      this.loading = true;
      this.axios.get(this.$api + '/api/lines/getall')
        .then(res => {
          this.items = res.data;
        })
        .catch(err => {
          console.error(err.reponse);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted(){
    this.fetchAll();
  }
};
</script>

<style></style>
