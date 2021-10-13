<template>
  <div>
    <basic-filter
      v-model="filterData"
      :params="[
        {
          label: 'Поиск товара',
          type: 'query',
        },
      ]"
      @applyFilter="handleApplyFilter"
      @resetFilter="handleResetFilter"
    >
    </basic-filter>

    <v-checkbox v-model="isPopular" label="Популярные товары"></v-checkbox>
    <with-pagination ref="with-pagination" :fetch-data="fetchAll">
      <template slot-scope="{ page, limit, updateItemsPerPage, updatePage }">
        <v-data-table
          :headers="headers"
          :loading="loading"
          :items="items"
          :page="page"
          :items-per-page="limit"
          :footer-props="{
            itemsPerPageOptions: [15, 25],
          }"
          @update:items-per-page="updateItemsPerPage"
          @update:page="updatePage"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Товары</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="$router.push({ name: 'admin-products-create' })"
              >
                Добавить товар
              </v-btn>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Вы уверены, что хотите удалить товар?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Отмена</v-btn
                    >
                    <v-btn
                      :disabled="loading"
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                      >Да</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template #[`item.cover_image`]="{ item }">
            <v-img
              max-height="80"
              max-width="80"
              :src="productImage(item)"
            ></v-img>
          </template>

          <template #[`item.category`]="{ item }">
            {{ item.category && item.category.name }}
          </template>

          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="
                $router.push({
                  name: 'admin-products-id-edit',
                  params: { id: item.id },
                })
              "
            >
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">
              mdi-trash-can
            </v-icon>
          </template>
        </v-data-table>
      </template>
    </with-pagination>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { mapMutations, mapActions, mapGetters } from "vuex"
import BasicFilter from "../../../components/admin/filters/basic-filter"
import trimString from "@/utils/trim-string"
import WithPagination from "@/components/admin/with-pagination"
export default {
  name: "AdminEvents",
  components: { BasicFilter, WithPagination },
  layout: "admin",
  data() {
    return {
      dialog: null,
      dialogDelete: null,
      search: null,
      editedIndex: -1,
      isPopular: false,
      filterData: null,
      editedItem: {
        name: null,
      },
      defaultItem: {
        name: null,
      },
      headers: [
        {
          text: "Изображение",
          value: "cover_image",
          sortable: false,
        },
        {
          text: "Название Товара",
          value: "name",
          sortable: false,
        },
        {
          text: "Категория",
          value: "category",
          sortable: false,
        },
        { text: "Действия", value: "actions", sortable: false },
      ],
      data: [],
    }
  },
  validations: {
    editedItem: {
      name: { required },
    },
  },
  computed: {
    ...mapGetters({
      loading: "loading/loading",
      items: "products/data",
      productImage: "products/image",
    }),
    formTitle() {
      return this.editedIndex > -1 ? "Edit Item" : "Add Item"
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    isPopular(newValue) {
      return newValue ? this.fetchPopularProducts() : this.fetchAll()
    },
  },
  methods: {
    ...mapMutations({
      deleteItemInLocalState: "products/spliceItem",
    }),
    ...mapActions({
      fetchAll: "products/fetchAll",
      dropItem: "products/delete",
      showSnackbar: "snackbar/showSnack",
    }),

    showContent(item) {
      return trimString(item.content)
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async fetchPopularProducts() {
      try {
        await this.fetchAll({ params: { type: "popular" } })
      } catch (e) {}
    },

    async deleteItemConfirm() {
      try {
        const id = this?.editedItem?.id
        await this.dropItem({ id })
        await this.deleteItemInLocalState(id)
        this.showSnackbar({ text: "Успешно удалено", color: "success" })
      } catch (e) {}
      // this.data.splice(this.editedIndex, 1)
      // this.deleteItemInLocalState(this.editedItem)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, {})
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async handleResetFilter() {
      try {
        await this.fetchAll({
          params: { page: 1 },
        })
        this.$refs["with-pagination"].resetPage()
      } catch (e) {}
    },
    async handleApplyFilter() {
      try {
        const { query } = this.filterData
        await this.fetchAll({
          params: { query },
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
