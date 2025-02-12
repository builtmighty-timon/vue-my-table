<template>
  <div class="table-app-container">
  <!-- <TableSystem :tableData="tableData"/> -->
  <TableSplash :tableData="tableData"/>
  </div>
</template>
  
  <script>
  import TableSystem from './component/TableSystem.vue';
  import TableSplash from './component/TableSplash.vue';

  export default {
    name: 'App',
    props: {
      tableData: {
        type: Array,
        required: true
      }
    },
    components: {
        TableSystem
    }
  };
  </script>

<style scoped>
.table-app-container {
  margin: 2rem;
}

</style>