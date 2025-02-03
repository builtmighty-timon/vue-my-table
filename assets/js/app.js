document.addEventListener('DOMContentLoaded', () => {

    const v = new Vue({
        el: '#vue-table-app',
        data: {
            columns: [
                {key: 'test_code', label: 'Test Code'},
                {key: 'test', label: 'Test'},
                {key: 'language', label: 'Language'},
                {key: 'order_num', label: 'Order #'},
                {key: 'taker_name', label: 'Test Taker Name'},
                {key: 'taker_email', label: 'Test Taker Email'},
                {key: 'expiration_date', label: 'Expires On'},
                {key: 'used_on_date', label: 'Used On'},
                {key: 'results', label: 'Results'},
            ],
            data: simpleTableData.tableData, // Comes from php localization
            filters: {
                testCode: '',
                expirationStart: '',
                expirationWithinDays: '',
                test: '',
                language: '',
                search: '',
            },
            sortKey: '',
            sortOrder: 'asc',
        },
        created: function() {
            // Step 1: Parse the "test" parameter from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const testFilter = urlParams.get('test');
            const expiryWithinFilter = urlParams.get('expiration_within_days');

            // Step 2: Set the value in the `filters.test` model
            if (testFilter) {
                this.filters.test = testFilter;
            }

            if (expiryWithinFilter) {
                this.filters.expirationWithinDays = expiryWithinFilter;
            }
        },
        methods: {
            clearSearch() {
                const searchInput = document.getElementById('search');
                searchInput.value = '';
                this.filters.search = '';
            },
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
                        const today = new Date();
                        if (this.filters.expirationWithinDays && expiration) {
                            if ( expiration > new Date(new Date().setDate(new Date().getDate() + parseInt(this.filters.expirationWithinDays)))) {
                                return false;
                            }
                            if ( expiration < today) {
                                return false;
                            }
                        }

                        if (this.filters.expirationStart && expiration < new Date(this.filters.expirationStart)) return false;

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