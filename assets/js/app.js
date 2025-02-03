document.addEventListener('DOMContentLoaded', () => {

    const tableSystem = new Vue({
        el: '#vue-table-app',
        data: {
            showSplash: true,
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
                showSplash: true,
            },
            sortKey: '',
            sortOrder: 'asc',
            currentPage: 1,
            itemsPerPage: 10
        },
        created: function() {
            // Step 1: Parse the "test" parameter from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const testFilter = urlParams.get('test');
            const expiryWithinFilter = urlParams.get('expiration_within_days');

            // Step 2: Set the value in the `filters.test` model
            if (testFilter) {
                this.filters.test = testFilter;
                this.showSplash = false;
            }

            if (expiryWithinFilter) {
                this.filters.expirationWithinDays = expiryWithinFilter;
                this.showSplash = false;
            }
        },
        methods: {
            toggleSplash( on = null  ) {
                if ( on === null ) {
                    this.showSplash = !this.showSplash;
                }
                else {
                    this.showSplash = on;
                }
            },
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
            paginatedData(data) {
                const startIndex = Math.max(0, this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return data.slice(startIndex, endIndex); // Fetch only items for the current page
            },
            nextPage() {
                if (
                    this.currentPage <
                    Math.ceil(this.data.length / this.itemsPerPage)
                ) {
                    this.currentPage = this.currentPage + 1;
                }
            },
            prevPage() {
                if (this.currentPage > 0) {
                    this.currentPage = this.currentPage - 1;
                }
            },
            goToPage(page) {
                if (
                    page >= 1 &&
                    page <=
                    Math.ceil(this.filteredData.length / this.itemsPerPage)
                ) {
                    this.currentPage = page;
                }
            },
            filterData(data) {
                return data
                    .filter(row => {
                        if (this.filters.testCode) {
                            switch (this.filters.testCode) {
                                case('unused'):
                                    if ( row.used_on_date ) {
                                        return false;
                                    }
                                    break;
                                case('used'):
                                    if ( !row.used_on_date ) {
                                        return false;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
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
                        if (!this.sortKey || !this.sortKey.hasOwnProperty('key')) return 0;
                        const valA = a[this.sortKey.key];
                        const valB = b[this.sortKey.key];
                        if (this.sortOrder === 'asc') return valA > valB ? 1 : -1;
                        return valA < valB ? 1 : -1;
                    });
            },
        },
        computed: {
            filteredData() {
                const filtered = this.filterData(this.data);
                return this.paginatedData(filtered);
            },
        },
    });


});