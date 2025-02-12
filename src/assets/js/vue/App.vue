<template>
  <TableSystem :tableData="tableData"/>
</template>
  
  <script>
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
        TableSystem
    }
  };
  </script>