<template>
  <a href="/special-shop-page" class="order-tests btn btn-primary">Order Tests</a>

  <div class="table-app-container">
    <TableSplash v-if="showSplash" :tableData="tableData" v-model:filters="filters" v-model:showSplash="showSplash"/>
    <TableSystem v-if="!showSplash" :tableData="tableData" v-model:filters="filters" v-model:showSplash="showSplash"/>
  </div>
</template>

<script>
import TableSplash from './component/TableSplash.vue';
import TableSystem from './component/TableSystem.vue';

export default {
  name: 'App',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  components: {
    TableSplash,
    TableSystem
  },
  data() {
    return {
      filters: {
        testCode: '',
        expirationStart: '',
        expirationWithinDays: '',
        test: '',
        language: '',
        search: '',
        showSplash: true,
      },
      showSplash: true,
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.showSplash = false;
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.table-app-container {
  margin: 2rem;
}
</style>