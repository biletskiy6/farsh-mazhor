<template>
  <with-pagination :fetch-data="fetchAll">
    <template slot-scope="{ page, limit, updateItemsPerPage, updatePage }">
      <v-data-table
        :headers="headers"
        :loading="loading"
        :items="items"
        :page="page"
        :items-per-page="limit"
        @update:items-per-page="updateItemsPerPage"
        @update:page="updatePage"
      >
        <template #body>
          <client-only>
            <draggable v-model="dndItems" tag="tbody" @change="onDragChange">
              <tr v-for="(category, index) in dndItems" :key="index">
                <td>
                  <v-icon small class="page__grab-icon"> mdi-arrow-all </v-icon>
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ category.name }}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="
                      $router.push({
                        name: 'admin-categories-id-edit',
                        params: { id: category.id },
                      })
                    "
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon small class="mr-2" @click="deleteItem(category)">
                    mdi-trash-can
                  </v-icon>
                </td>
                <!--              <td>-->
                <!--                <v-icon small @click="editUser(user.id)"> mdi-pencil </v-icon>-->
                <!--              </td>-->
              </tr>
            </draggable>
          </client-only>
        </template>
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Категории</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="$router.push({ name: 'admin-categories-create' })"
            >
              Новая категория
            </v-btn>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Вы уверены, что хотите удалить категорию?</v-card-title
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
      </v-data-table>
    </template>
  </with-pagination>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { mapMutations, mapActions, mapGetters } from "vuex"
import trimString from "@/utils/trim-string"
import WithPagination from "@/components/admin/with-pagination"
export default {
  name: "AdminEvents",
  components: { WithPagination },
  layout: "admin",
  data() {
    return {
      dialog: null,
      dialogDelete: null,
      search: null,
      editedIndex: -1,
      editedItem: {
        name: null,
      },
      defaultItem: {
        name: null,
      },
      headers: [
        {
          text: "",
          value: null,
        },
        {
          text: "#",
          value: "id",
        },
        {
          text: "Название категории",
          value: "name",
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
      items: "categories/data",
    }),
    dndItems: {
      get() {
        return this.items
      },
      set(items) {
        this.updateDndItems(items)
      },
    },
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
  },
  methods: {
    ...mapMutations({
      deleteItemInLocalState: "categories/spliceItem",
      swapItems: "categories/swapItems",
      updateDndItems: "categories/updateDndItems",
    }),
    ...mapActions({
      fetchAll: "categories/fetchAll",
      dropItem: "categories/delete",
      updateCategory: "categories/update",
      showSnackbar: "snackbar/showSnack",
      changeOrder: "categories/changeOrder",
    }),

    showContent(item) {
      return trimString(item.content)
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
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
    async onDragChange({ moved }) {
      try {
        // const from = moved.element
        // const newIndex = moved.newIndex
        // const oldIndex = moved.oldIndex
        // const to = this.dndItems[oldIndex]
        // console.log(this.dndItems)
        // console.log("FROM:", from)
        // console.log("TO:", to)
        // console.log("OLDINDEX:", oldIndex)
        // console.log("NEW INDEX:", newIndex)
        // console.log(from, to, oldIndex, newIndex)
        await this.changeOrder({ dndItems: this.dndItems })
        this.showSnackbar({ text: "Успешно обновлено", color: "success" })
        // this.swapItems({ newIndex, oldIndex })
      } catch (e) {}
    },
  },
}
</script>
