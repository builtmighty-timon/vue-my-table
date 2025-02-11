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
                {key: 'expires_at', label: 'Expires On'},
                {key: 'redeemed_at', label: 'Used On'},
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
                this.goToPage(1);
            },
            uniqueValues(key) {
                return [...new Set(this.data.map(row => row[key]))];
            },
            sort(keyObject) {
                const key = keyObject.key;
                const date_keys = ['expires_at', 'redeemed_at'];
                this.sortOrder = this.sortKey === key && this.sortOrder === 'asc' ? 'desc' : 'asc';
                if ( date_keys.includes(key) ) {
                    sortDates(this, key);
                } else {
                    sortStrings(this, key);
                }

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
                const truePage = page - 1;
                if (
                    truePage >= 0 &&
                    truePage <=
                    ( 1 + Math.ceil(this.filteredData.length / this.itemsPerPage))
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
                                    if ( row.redeemed_at ) {
                                        return false;
                                    }
                                    break;
                                case('used'):
                                    if ( !row.redeemed_at ) {
                                        return false;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (this.filters.test && row.test !== this.filters.test) return false;
                        if (this.filters.language && row.language !== this.filters.language) return false;

                        const expiration = new Date(row.expires_at);
                        const today = new Date();
                        if (this.filters.expirationWithinDays && expiration) {
                            if ( new Date(expiration) > new Date(new Date().setDate(new Date().getDate() + parseInt(this.filters.expirationWithinDays)))) {
                                return false;
                            }
                            if ( new Date( expiration ) < today) {
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
        watch: {
            'filters.search': function filteredData( newVal, oldVal ) {
                this.goToPage(1);
            }
        }
    });

    function sortDates(vue, key) {
        vue.data.sort((a, b) => {
            const valA = a.hasOwnProperty(key) ? new Date(a[key]) : 0;
            const valB = b.hasOwnProperty(key) ? new Date(b[key]) : 0;
            if (vue.sortOrder === 'asc') return valA > valB ? 1 : -1;
            return valA < valB ? 1 : -1;
        });
    }

    function sortStrings(vue, key) {
        vue.data.sort((a, b) => {
            const valA = (a.hasOwnProperty(key) && a[key]) ? a[key].toString().toLowerCase() : 0;
            const valB = (b.hasOwnProperty(key) && b[key]) ? b[key].toString().toLowerCase() : 0;
            if (vue.sortOrder === 'asc') return valA > valB ? 1 : -1;
            return valA < valB ? 1 : -1;
        });
    }


});