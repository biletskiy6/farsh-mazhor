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
      <v-text-field
        v-model="formFields['name']"
        label="Название Товара"
      ></v-text-field>
      <v-textarea
        v-model="formFields['excerpt']"
        name="input-7-1"
        label="Краткое Описание"
      ></v-textarea>
      <v-text-field v-model="formFields['price']" label="Цена"></v-text-field>
      <quill-editor
        v-model="formFields['description']"
        :content="formFields['description']"
      ></quill-editor>

      <v-autocomplete
        v-if="categories"
        v-model="formFields['category']"
        :items="categories"
        label="Категория товара"
        item-text="name"
        item-value="id"
      ></v-autocomplete>

      <v-checkbox
        v-model="formFields['is_popular']"
        label="Популярный товар"
      ></v-checkbox>

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
import QuillEditor from "../quill-editor"
import { entityStatuses } from "@/utils/entity-statuses"
import { serializeForm } from "@/utils/forms"
import { isFileInstance } from "@/utils/file"
import fileService from "@/services/file.service"
import {
  ENTITY_SUCCESSFULLY_CREATED,
  ENTITY_SUCCESSFULLY_UPDATED,
} from "@/utils/messages"

export default {
  name: "ProductsForm",
  components: { QuillEditor, BaseForm },
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
        name: null,
        excerpt: null,
        price: null,
        description: null,
        category: null,
        cover_image: null,
        is_popular: false,
      },
      dateTime: null,
    }
  },
  computed: {
    ...mapGetters({
      loading: "loading/loading",
      categories: "categories/data",
    }),
  },
  async mounted() {
    try {
      await this.fetchCategories()
    } catch (e) {}
  },
  methods: {
    ...mapActions({
      showShackbar: "snackbar/showSnack",
      createProduct: "products/create",
      updateProduct: "products/update",
      fetchCategories: "categories/fetchAll",
    }),
    async handleEdit() {
      try {
        const data = _.omit(serializeForm(this.formFields), ["cover_image"])
        const id = this.$route.params.id
        // eslint-disable-next-line no-unreachable
        if (isFileInstance(this.formFields.cover_image)) {
          const file = await fileService.send(
            "products",
            this.formFields.cover_image
          )
          data.cover_image = file.filename
        }
        await this.updateProduct({ id, data })
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
            "products",
            this.formFields.cover_image
          )
          data.cover_image = file.filename
        }
        await this.createProduct({ data })
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
