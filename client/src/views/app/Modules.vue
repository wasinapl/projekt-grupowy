<template>
  <div>
      <v-card outlined>
          <v-card-title primary-title>
            Dostępne moduły
              <v-spacer></v-spacer>
            <v-btn color="primary" small outlined @click="createItem()">Dodaj</v-btn>
          </v-card-title>
          <v-card-text>
                <v-row v-if="loading">
                  <v-col cols="6" md="3" >
                   <v-skeleton-loader
                      class="mx-auto"
                      max-width="300"
                      type="card"
                  ></v-skeleton-loader>
                  </v-col>
                </v-row>
                <v-row v-else-if="!loading">
                  <v-col cols="6" md="3" v-for="item in items" :key="item.id" >
                      <v-card outlined>
                          <v-card-title primary-title class="py-2">
                            {{item.name}}
                          </v-card-title>
                          <v-card-text class="py-1">
                              Wartość: <b>{{item.value}}</b><br />
                              Napęd: <b>{{item.energy_name}}</b><br />
                              Warzywo: <b>{{item.vegetable_name}}</b><br />
                              Odpad: <b v-if="item.waste">Tak</b><b v-else-if="!item.waste">Nie</b>

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
                  <v-col cols="12" class="text-center">
                      <h4>Brak wyników</h4>
                  </v-col>
                </v-row>
          </v-card-text>
          <DeleteConfirmation keep-alive :item="deletedItem" @onConfirm="deleteItem()" @onCancel="deletedItem = null;" />
          <ModulesForm keep-alive :item="editedItem" @onClose="formClose()"/>
      </v-card>
  </div>
</template>

<script>
import DeleteConfirmation from '../../components/PopUp/DeleteConfrimation.vue';
import ModulesForm from '../../components/PopUp/Modules/Form.vue';

export default {
  name: "ModulesPage",
  components: {
    DeleteConfirmation,
    ModulesForm
  },
  data: () => ({
    loading: false,
    deletedItem: null,
    editedItem: null,
    items: []
  }),
  methods:{
    deleteAlert: function(item){
      this.deletedItem = item;
    },
    editItem: function(item){
      this.editedItem = item;
    },
    async deleteItem(){
      try{
          await this.axios.delete(this.$api + '/api/modules', {data: {id: this.deletedItem.id}});
          this.$toast.success("Pomyślnie skasowano moduł!");
          this.fetchAll();
      }catch(e){
          if(typeof e.response.data.message !== 'undefined')  this.$toast.error(e.response.data.message);
          else this.$toast.error("Wystąpił problem przy kasowaniu modułu! Sprawdź konsolę");
          console.error(e);
      }
         this.deletedItem = null;
    },
    createItem: function(){
      this.editedItem = {
        id: null,
        name: '',
        value: 0,
        vegetable: 0,
        energy: 0,
        waste: false
      };
    },
    formClose: function(){
        this.editedItem = null;
        this.fetchAll();
    },
    fetchAll: function(){
      this.loading = true;
      this.axios.get(this.$api + '/api/modules/getall')
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
