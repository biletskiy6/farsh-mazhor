<template>
  <base-form
    :form-fields="formFields"
    :default-values="defaultValues"
    :map-form-fields="mapFormFields"
    entity-name="categories"
    @input="(payload) => $emit('input', payload)"
  >
    <form @submit.prevent="handleSubmit">
      <v-text-field v-model="formFields['title']" label="Название категории"></v-text-field>
      <v-textarea
        v-model="formFields['description']"
        name="input-7-1"
        label="Описание"
      ></v-textarea>
      <v-file-input v-model="formFields['cover_image']" placeholder="Картинка"></v-file-input>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading"
        class="mt-1"
        color="primary"
        >Save</v-btn
      >
    </form>
  </base-form>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseForm from '../base-form'
import formConfig from './formConfig'
import { entityStatuses } from '@/utils/entity-statuses'

export default {
  name: 'CategoriesForm',
  components: {  BaseForm },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    defaultValues: {
      type: Object,
      default: () => {},
      required: false,
    },
    mapFormFields: {
      default: null,
      required: false,
    },
  },
  data() {
    return {
      files: [],
      entityStatuses,
      timelineMenu: false,
      formFields: { ...formConfig },
      dateTime: null,
    }
  },
  computed: {
    ...mapGetters({
      entityLoading: 'events/loading',
      loading: 'loading/loading',
      locations: 'locations/data',
      performers: 'performers/data',
    }),
  },
  methods: {
    handleSubmit() {
      console.log(1)
    }
  },
}
</script>
