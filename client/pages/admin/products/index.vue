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
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Events </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="$router.push({ name: 'admin-events-create' })"
            >
              New Item
            </v-btn>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    :disabled="loading"
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="
              $router.push({
                name: 'admin-events-id-edit',
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
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import trimString from '@/utils/trim-string'
import WithPagination from '@/components/admin/with-pagination'
export default {
  name: 'AdminEvents',
  components: { WithPagination },
  layout: 'admin',
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
          text: 'Title',
          value: 'title',
        },
        { text: 'Actions', value: 'actions', sortable: false },
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
      loading: 'loading/loading',
      items: 'events/data',
    }),
    formTitle() {
      return this.editedIndex > -1 ? 'Edit Item' : 'Add Item'
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
      deleteItemInLocalState: 'events/spliceItem',
    }),
    ...mapActions({
      fetchAll: 'events/fetchAll',
      dropItem: 'events/delete',
      showSnackbar: 'snackbar/showSnack',
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
        await this.deleteItemInLocalState(this.editedItem)
        this.showSnackbar({ text: 'Successfully Deleted', color: 'success' })
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
  },
}
</script>
