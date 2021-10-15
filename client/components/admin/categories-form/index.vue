<template>
  <base-form
    :form-fields="formFields"
    :default-values="defaultValues"
    :map-form-fields="mapFormFields"
    entity-name="categories"
    @input="(payload) => $emit('input', payload)"
    @edit="handleEdit"
    @create="handleCreate"
  >
    <form @submit.prevent="handleSubmit">
      <template
        v-if="defaultValues && typeof defaultValues['cover_image'] === 'string'"
      >
        <div class="d-flex mt-4 mb-4 justify-center">
          <v-img
            class="mb-10"
            max-width="450px"
            max-height="350px"
            :src="categoryImage({ cover_image: defaultValues['cover_image'] })"
          ></v-img>
        </div>
      </template>
      <v-text-field
        v-model="formFields['name']"
        label="Название категории"
      ></v-text-field>
      <!--      <v-textarea-->
      <!--        v-model="formFields['description']"-->
      <!--        name="input-7-1"-->
      <!--        label="Описание"-->
      <!--      ></v-textarea>-->
      <v-file-input
        v-model="formFields['cover_image']"
        placeholder="Картинка"
      ></v-file-input>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading"
        class="mt-1"
        color="primary"
        >Сохранить</v-btn
      >
    </form>
  </base-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import BaseForm from "../base-form"
import { entityStatuses } from "@/utils/entity-statuses"
import { serializeForm } from "@/utils/forms"
import { isFileInstance } from "@/utils/file"
import fileService from "@/services/file.service"
import {
  ENTITY_SUCCESSFULLY_CREATED,
  ENTITY_SUCCESSFULLY_UPDATED,
} from "@/utils/messages"

export default {
  name: "CategoriesForm",
  components: { BaseForm },
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
      formFields: {
        name: "",
        description: "",
        cover_image: null,
      },
      dateTime: null,
    }
  },
  computed: {
    ...mapGetters({
      loading: "loading/loading",
      categoryImage: "categories/image",
    }),
  },
  methods: {
    ...mapActions({
      showShackbar: "snackbar/showSnack",
      createCategory: "categories/create",
      updateCategory: "categories/update",
    }),
    async handleEdit() {
      try {
        const data = _.omit(serializeForm(this.formFields), ["cover_image"])
        const id = this.$route.params.id
        // eslint-disable-next-line no-unreachable
        if (isFileInstance(this.formFields.cover_image)) {
          const file = await fileService.send(
            "categories",
            this.formFields.cover_image
          )
          data.cover_image = file.filename
        }
        await this.updateCategory({ id, data })
        this.showShackbar({
          text: ENTITY_SUCCESSFULLY_UPDATED,
          color: "success",
        })
      } catch (e) {}
    },
    async handleCreate() {
      try {
        const data = serializeForm(this.formFields)
        // eslint-disable-next-line no-unreachable
        if (isFileInstance(this.formFields.cover_image)) {
          const file = await fileService.send(
            "categories",
            this.formFields.cover_image
          )
          data.cover_image = file.filename
        }
        await this.createCategory({ data })
        this.showShackbar({
          text: ENTITY_SUCCESSFULLY_CREATED,
          color: "success",
        })
      } catch (e) {}
    },
    handleSubmit() {
      return this.defaultValues ? this.handleEdit() : this.handleCreate()
    },
  },
}
</script>
