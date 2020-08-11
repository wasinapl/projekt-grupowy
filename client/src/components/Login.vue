<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="5">
            <v-text-field
              color="primary"
              :loading="isSending"
              v-show="isSending"
              disabled
            ></v-text-field>

            <v-alert
              type="warning"
              v-show="message.length != 0"
              transition="fab-transition"
              v-text="message"
            >
            </v-alert>
            <v-card ref="form" lazy-validation>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Logowanie</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  prepend-icon="fas fa-user"
                  ref="email"
                  class="mt-2"
                  :rules="emailRules"
                  outlined
                  v-model="user.email"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="fas fa-lock"
                  outlined
                  type="password"
                  v-model="user.password"
                  :rules="passRules"
                  label="Hasło"
                  required
                  v-on:keyup.enter="login"
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  class="mr-4"
                  @click="login"
                  :disabled="isSending"
                  text
                >
                  Zaloguj
                </v-btn>
                <v-spacer />
                <router-link to="/register" tag="v-btn">
                  <v-btn color="dark" text>
                    Rejestracja
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import User from "../models/user";

export default {
  name: "Login",

  components: {},
  icons: {
    iconfont: "fa",
  },
  data: () => ({
    user: new User("", ""),
    isSending: false,
    message: "",
    emailRules: [
      (v) => !!v || "E-mail jest wymagany!",
      (v) => /.+@.+/.test(v) || "E-mail musi być poprawny!",
    ],
    passRules: [
      (v) => v.length >= 6 || "Hasło musi zawierać co najmniej 6 znaków!",
    ],
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      this.isSending = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message = error.response.data.message;
          this.isSending = false;
        }
      );
    },
  },
};
</script>
