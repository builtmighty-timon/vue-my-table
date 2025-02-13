import { createApp } from 'vue';
import App from './vue/App.vue';

document.addEventListener('DOMContentLoaded', () => {
    const app = createApp(App, { tableData: window.simpleTableData.tableData })
    app.mount('#vue-table-app');
});
