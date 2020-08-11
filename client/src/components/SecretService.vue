<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(item, i) in items">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img :src="item.img" height="225px">
                <v-card-title class="title white--text">
                  <v-row class="fill-height flex-column" justify="space-between">
                    <p class="mt-4 subheading text-left">{{ item.title }}</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-bold font-italic text-left">{{ item.text }}</p>
                      <p class="caption font-weight-medium font-italic text-left">{{ item.subtext }}</p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        color="transparent"
                        icon
                        @click.prevent="playSound( icon, item.file)"
                      >
                        <v-icon :class="{ 'show-btns': hover }" color="transparent">{{ icon }}</v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
    items: [
      {
        title: "Leno Paleno",
        text: "It's New Release Friday",
        subtext: "Newly released songs. Updated daily.",
        img: "https://i.ytimg.com/vi/qMMo0Y5JPvg/hqdefault.jpg",
        file: "http://localhost:8080/r1.mp3"
      },
      {
        title: "Damian gościu",
        text: "Greatest Rock Hits",
        subtext: "Lose yourself in rock tunes.",
        img:
          "https://www.wykop.pl/cdn/c3201142/comment_isQi5EEMyd3xs511eWO3KNFYhuCuveq5,w400.jpg",
        file: "http://localhost:8080/r2.mp3"
      },
      {
        title: "Mellow Moods",
        text: "Ambient Bass",
        subtext: "Chill beats to mellow you out.",
        img: "https://i.ytimg.com/vi/dZLa4gYjp84/maxresdefault.jpg"
      }
    ],
    transparent: "rgba(255, 255, 255, 0)"
  }),
  methods: {
    playSound(icon, sound) {
      if (sound && icon == "mdi-play") {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>