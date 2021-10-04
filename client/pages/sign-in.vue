<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
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
                    label="Password"
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
                  >Login</v-btn
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
import { email, minLength, required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: "victorbiletskiy82@gmail.com",
      password: "12345678",
    }
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
      setError: 'error/setError',
      setLoading: 'loading/setLoading',
      resetLoading: 'loading/resetLoading',
    }),
    async handleSubmit() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) return
        this.setLoading()
        await this.$auth.loginWith('local', {
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
