import { createApp } from 'vue';
import App from './vue/App.vue';

const app = createApp(App, { tableData: window.tableData })
app.mount('#vue-table-app');
