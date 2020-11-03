<template>
  <div>
      <v-card outlined>
          <v-card-title primary-title>
               Kalkulator śladu węglowego
          </v-card-title>
          <v-card-text>
              <v-row>
                  <v-col cols="12">
                    <v-select v-model="line" :items="linesSelect" :disabled="loading" :loading="loading" label="Linia" outlined @change="test"></v-select>
                  </v-col>
              </v-row>
              <v-row  no-gutters v-if='line'>
                  <v-col cols="12"  class="my-0">
                      <v-text-field
                          label="Warzywo"
                          outlined
                          :value="lineDetails.resource_name_pl"
                          readonly
                          dense
                      ></v-text-field>
                  </v-col>
                    <v-col cols="12" class="my-0">
                      <v-text-field
                          label="Surowiec"
                          placeholder="10"
                          suffix="kg"
                          outlined
                          v-model.number="settings.surowiec"
                          dense
                      ></v-text-field>
                  </v-col>
                    <v-col cols="12" class="my-0">
                      <v-text-field
                          label="Produkt"
                          placeholder="5"
                          suffix="kg"
                          outlined
                          v-model.number="settings.produkt"
                          dense
                      ></v-text-field>
                  </v-col>
                    <v-col cols="12" class="my-0" v-for="(stage, i) in lineDetails.stages" :key="i">
                        <v-card>
                            <v-card-title primary-title>
                                {{stage.text}}
                            </v-card-title>
                            <v-card-text>
                                <div v-for="(modul, i) in stage.modules" :key="i">
                                    <h4>{{modul.name}}</h4>
                                        Wartość: <b>{{modul.energy}}</b><br />
                                        Napęd: <b>{{modul.energy_name}}</b><br />
                                        <v-text-field
                                            v-if="modul.waste"
                                            label="Odpad"
                                            placeholder="5"
                                            suffix="kg"
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-divider></v-divider>
                                </div>
                            </v-card-text>
                        </v-card>
                  </v-col>
              </v-row>
          </v-card-text>
      </v-card>
  </div>
</template>

<script>

export default {
  name: "StagesPage",
  components: {
  },
  data: () => ({
      loading: false,
      line: null,
      availableLines: [],
      settings:{
          surowiec: '',
          produkt: '',
      }
  }),
  computed:{
      linesSelect: function(){
          let items = [];
          this.availableLines.map(x => items.push({value: x.id, text: x.name}));
          return items;
      },
      lineDetails: function(){
          if(this.line) return this.availableLines.filter(x => x.id === this.line)[0];
          return [];
      }
  },
  methods:{
      test(e){
          console.log(e)
      },
      async fetchAll(){
          this.loading = true;
          try{
             let response = await this.axios.get(this.$api + "/api/lines/getall");
             this.availableLines = response.data;
             this.loading = false;
          }catch(e){
              console.error(e);
          }
      }
  },
  created(){
      this.fetchAll();
  }
};
</script>

<style></style>
