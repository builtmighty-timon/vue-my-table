<template>
  <TableSystem :tableData="tableData"/>
   <!-- <TableSplash :tableData="tableData"/> -->
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