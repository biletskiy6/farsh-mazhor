<template>
  <div class="basic-filter">
    <div v-for="param of params" :key="param.type" class="filter-item">
      <component
        :is="param.type"
        :label="param.label"
        :default="param.default"
        :value="value"
        @input="handleInput"
      ></component>
    </div>
    <div class="filter-submits">
      <div
        class="submit-filter mb-1"
        @click="$emit('applyFilter', filterValues)"
      >
        <v-btn small color="primary">
          <v-icon dark> mdi-search-web </v-icon>
        </v-btn>
      </div>
      <div class="reset-filter">
        <v-btn class="mx-1" small color="primary" @click="handleReset">
          <v-icon dark> mdi-lock-reset </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Role from './inputs/role'
import Query from './inputs/query'
import Date from './inputs/date'
export default {
  components: { Query, Date, Role },
  props: {
    params: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      default: null,
    },
  },

  data() {
    return {
      filterValues: {},
    }
  },

  beforeMount() {
    if (this.params.length < 0) {
      return
    }
    for (const prm of this.params) {
      this.$set(this.filterValues, prm.type, null)
    }
  },
  methods: {
    handleInput({ value, type }) {
      console.log(value)
      try {
        this.filterValues[type] = value
        this.$emit('input', this.filterValues)
      } catch (e) {
        console.log(e)
      }
    },
    handleReset() {
      this.$emit('input', { date: null, query: null, role: null })
      this.$emit('resetFilter')
    },
  },
}
</script>
<style>
.basic-filter {
  display: flex;
  align-items: center;
}
.filter-submits {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 16px;
}
</style>
