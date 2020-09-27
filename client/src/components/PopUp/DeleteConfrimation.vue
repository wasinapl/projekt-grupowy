<template>
    <v-dialog
      v-model="dialog"
      max-width="50vw"
    >
      <v-card>
        <v-card-title class="headline">
          Czy napewno chcesz usunąć {{name}}?
        </v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'DeleteConfrimation',
    props:{
      name: {
        type: String,
        default: ''
      }
    },
    data: () => ({
        dialog: true,
    })
  }
</script>