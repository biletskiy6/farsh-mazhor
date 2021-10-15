<template>
  <v-app id="inspire">
    <client-only><app-snackbar></app-snackbar></client-only>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Войти в аккаунт</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Пароль"
                    name="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="loading"
                  :loading="loading"
                  @click="handleSubmit"
                  >Войти</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import { email, minLength, required } from "vuelidate/lib/validators"
import AppSnackbar from "@/components/notification/app-snackbar"
import ErrorMixin from "@/mixins/error"
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  mixins: [ErrorMixin],
  components: {
    AppSnackbar,
  },
  computed: {
    ...mapGetters({
      loading: "loading/loading",
    }),
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    ...mapMutations({
      setError: "error/setError",
      setLoading: "loading/setLoading",
      resetLoading: "loading/resetLoading",
    }),
    async handleSubmit() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) return
        this.setLoading()
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.resetLoading()
      } catch (e) {
        console.log(e)
        const responseData = e?.response?.data
        responseData && this.setError(responseData)
        this.resetLoading()
      }
    },
  },
}
</script>
