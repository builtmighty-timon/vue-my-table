<template>

  <a href="/special-shop-page" class="order-tests btn btn-primary">Order Tests</a>

  <div class="table-app-container">
  <!-- <TableSystem :tableData="tableData"/> -->
  <TableSplash :tableData="tableData"/>
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
        TableSplash
    }
  };
  </script>

<style scoped>
.table-app-container {
  margin: 2rem;
}

</style>