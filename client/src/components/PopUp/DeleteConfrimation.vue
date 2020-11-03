<template>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          Czy napewno chcesz usunąć?
        </v-card-title>

        <v-card-text>
          Spowoduje to trwałe usunięcie tego elementu. Czy napewno chcesz to zrobić?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-4" class="elevation-0" small @click="cancelDelete()">Anuluj</v-btn>
          <v-btn color="red lighten-5" class="red--text elevation-0" small @click="confirmDelete()">Skasuj</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'DeleteConfrimation',
    props:{
      item: {
        type: Object
      }
    },
    data: () => ({
        dialog: false,
    }),
    watch:{
      item(val){
        if(val) this.dialog = true;
        else this.dialog = false;
      }
    },
    methods:{
      cancelDelete(){
        this.dialog = false;
        this.$emit('onCancel');
      },
      confirmDelete(){
        this.dialog = false;
        this.$emit('onConfirm');
      }
    }
  }
</script>