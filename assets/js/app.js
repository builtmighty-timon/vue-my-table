document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: '#vue-table-app',
        data: {
            columns: [
                {key: 'test_code', label: 'Test Code'},
                {key: 'test', label: 'Test'},
                {key: 'language', label: 'Language'},
                {key: 'order_num', label: 'Order #'},
                {key: 'taker_name', label: 'Test Taker Name'},
                {key: 'taker_email', label: 'Test Taker Email'},
                {key: 'expiration_date', label: 'Expiration Date'},
                {key: 'used_on_date', label: 'Used On Date'},
                {key: 'results', label: 'Results'},
            ],
            data: simpleTableData.tableData, // Comes from php localization
            filters: {
                testCode: '',
                expirationStart: '',
                expirationEnd: '',
                test: '',
                language: '',
                search: '',
            },
            sortKey: '',
            sortOrder: 'asc',
        },
        methods: {
            uniqueValues(key) {
                return [...new Set(this.data.map(row => row[key]))];
            },
            sort(key) {
                this.sortOrder = this.sortKey === key && this.sortOrder === 'asc' ? 'desc' : 'asc';
                this.sortKey = key;
            },
            filterData(data) {
                return data
                    .filter(row => {
                        if (this.filters.testCode && row.test_code !== this.filters.testCode) return false;
                        if (this.filters.test && row.test !== this.filters.test) return false;
                        if (this.filters.language && row.language !== this.filters.language) return false;

                        const expiration = new Date(row.expiration_date);
                        if (this.filters.expirationStart && expiration < new Date(this.filters.expirationStart)) return false;
                        if (this.filters.expirationEnd && expiration > new Date(this.filters.expirationEnd)) return false;

                        if (this.filters.search) {
                            const searchVal = Object.values(row).join(' ').toLowerCase();
                            if (!searchVal.includes(this.filters.search.toLowerCase())) return false;
                        }
                        return true;
                    })
                    .sort((a, b) => {
                        if (!this.sortKey) return 0;
                        const valA = a[this.sortKey];
                        const valB = b[this.sortKey];
                        if (this.sortOrder === 'asc') return valA > valB ? 1 : -1;
                        return valA < valB ? 1 : -1;
                    });
            },
        },
        computed: {
            filteredData() {
                return this.filterData(this.data);
            },
        },
    });
});