<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="5">
            <v-alert
              type="warning"
              v-show="message.length != 0"
              transition="fab-transition"
              v-text="message"
            >
            </v-alert>

            <v-card ref="form">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Rejestracja</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  prepend-icon="fas fa-user"
                  ref="email"
                  v-model="email"
                  :rules="emailRules"
                  label="Adres e-mail"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="fas fa-user-tag"
                  ref="username"
                  v-model="username"
                  :rules="nameRules"
                  label="Nazwa użytkownika"
                  type="text"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  :append-icon="show1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  prepend-icon="fas fa-lock"
                  ref="pass"
                  v-model="pass"
                  :rules="passRules"
                  label="Hasło"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  counter
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  :append-icon="show2 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  prepend-icon="fas fa-lock"
                  ref="passRepeat"
                  v-model="passRepeat"
                  :type="show2 ? 'text' : 'password'"
                  label="Powtórz hasło"
                  @click:append="show2 = !show2"
                  counter
                  outlined
                  required
                ></v-text-field>
              </v-card-text>
              <v-divider class="mt-6"></v-divider>
              <v-card-actions>
                <v-btn color="primary" text @click="register"
                  >Zarejestruj</v-btn
                >
                <v-spacer></v-spacer>
                <router-link to="/login" tag="v-btn">
                  <v-btn color="dark" text>
                    Logowanie
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
export default {
  name: "Register",

  components: {},

  data: () => ({
    email: "",
    username: "",
    pass: "",
    passRepeat: "",
    message: "",
    isSending: false,
    badLogin: false,
    show1: false,
    show2: false,
    emailRules: [
      (v) => !!v || "E-mail jest wymagany!",
      (v) => /.+@.+/.test(v) || "E-mail musi być poprawny!",
    ],
    nameRules: [
      (v) =>
        v.length >= 5 ||
        "Nazwa użytkownika musi zawierać co najmniej 5 znaków!",
    ],
    passRules: [
      (v) => v.length >= 6 || "Hasło musi zawierać co najmniej 6 znaków!",
    ],
  }),

  methods: {
    register() {
      this.axios
        .post(this.$api+"/api/register", {
          email: this.email,
          username: this.username,
          password: this.pass,
        })
        .then((response) => {
          this.router.push({ name: "login", query: { register: true } });
          console.log(response);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>
