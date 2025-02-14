<template>
    <div id="table-system-vue" class="container">
      <a href="/special-shop-page" class="order-tests btn btn-primary">Order Tests</a>
  
      <div class="row g-3 mb-3 table-filters">
        <!-- Search Filter -->
        <div class="col-md-6">
          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <label for="search" class="form-label" value="Search">&nbsp;</label>
              </div>
            </div>
            <div class="row search-field-row">
              <div class="col-12 input-group">
                <input id="search" type="text" class="form-control" v-model="filters.search" placeholder="Search...">
                <div class="input-group-append">
                  <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.25-.34a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                    </svg>
                    &nbsp; Search
                  </span>
                </div>
                <div class="clear-search"><a href="javascript: void(0);" @click="clearSearch">Clear Search</a></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Test Code Filter -->
        <div class="col-md-3">
          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <label for="test-code" class="form-label">Test Codes</label>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <select id="test-code" class="form-select" v-model="filters.testCode">
                  <option value="">All</option>
                  <option value="unused">Unused Codes Only</option>
                  <option value="used">Used Codes Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Test Filter -->
        <div class="col-md-3">
          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <label for="test" class="form-label">Tests</label>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <select id="test" class="form-select" v-model="filters.test">
                  <option value="">All</option>
                  <option v-for="testVal in getMergedTestValues()" :key="testVal">
                    {{ testVal }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row g-3 table-rows">
        <!-- Date Range Filter -->
        <div class="col-md-6"></div>
        <div class="col-md-3">
          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <label class="form-label">Expiration</label>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <select id="test" class="form-select" v-model="filters.expirationWithinDays">
                  <option value="">All</option>
                  <option value="0">Not Expired</option>
                  <option value="-1">Expired</option>
                </select>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Language Filter -->
        <div class="col-md-3">
          <div class="form-group">
            <label for="language" class="form-label">Language</label>
            <select id="language" class="form-select" v-model="filters.language">
              <option value="">All</option>
              <option v-for="lang in uniqueValues('language')" :key="lang">
                {{ lang }}
              </option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              <th v-for="col in columns" @click="sort(col)" class="text-center">
                {{ col.label }}
                <span v-if="sortKey.key === col.key"> {{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in paginateData" :key="row.test_code">
              <td>{{ row.test_code }}</td>
              <td>{{ row.test }}</td>
              <td>{{ row.language }}</td>
              <td>{{ row.order_num }}</td>
              <td>{{ row.taker_name }}</td>
              <td>{{ row.taker_email }}</td>
              <td>{{ row.expires_at }}</td>
              <td>{{ row.redeemed_at }}</td>
              <td><button class="btn btn-light" @click="fetchResultsPdf(row.id)">Download Results</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-controls">
        <div class="per-page-controls">
          <TablePerPageControl :itemsPerPage="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
        </div>
        <!-- Pagination Controls -->
        <div>
          <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button
              v-for="page in Math.ceil(filterData(data).length / itemsPerPage)"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === Math.ceil(filterData(data).length / itemsPerPage)"
            >
              Next
            </button>
            <span>Page {{ currentPage }} of {{ Math.ceil(filterData(data).length / itemsPerPage) }}</span>
          </div>
        </div>

        <!-- Download CSV Button -->
        <button @click="downloadCSV" class="btn btn-light">Download CSV</button>
      </div>
    </div>
  </template>
  
  <script>
  import TablePerPageControl from './TablePerPageControl.vue';
  export default {
    name: 'TableSystem',
    props: {
      tableData: {
        type: Array,
        required: true
      },
      filters: {
        type: Object,
        required: true
      },
      showSplash: {
        type: Boolean,
        required: true
      }
    },
    components: {
      TablePerPageControl
    },
    data() {
      return {
        showSplash: true,
        columns: [
          { key: 'test_code', label: 'Test Code' },
          { key: 'test', label: 'Test' },
          { key: 'language', label: 'Language' },
          { key: 'order_num', label: 'Order #' },
          { key: 'taker_name', label: 'Test Taker Name' },
          { key: 'taker_email', label: 'Test Taker Email' },
          { key: 'expires_at', label: 'Expires On' },
          { key: 'redeemed_at', label: 'Used On' },
          { key: 'results', label: 'Results' },
        ],
        data: this.tableData, // Use the passed prop
        sortKey: '',
        sortOrder: 'asc',
        currentPage: 1,
        itemsPerPage: 10
      };
    },
    watch: {
      filters: {
        handler(newFilters) {
          this.$emit('update:filters', newFilters);
          this.resetPage();
        },
        deep: true
      },
      showSplash: {
        handler(newShowSplash) {
          this.$emit('update:showSplash', newShowSplash);
          this.$emit('update:tableData', this.tableData);
          this.resetPage();
        }
      },
      itemsPerPage: {
        handler(newItemsPerPage) {
          this.itemsPerPage = newItemsPerPage;
          this.$emit('update:itemsPerPage', newItemsPerPage);
          this.resetPage();
        }
      }
    },
    methods: {
      clearSearch() {
        const searchInput = document.getElementById('search');
        searchInput.value = '';
        this.filters.search = '';
        this.filters.testCode = '';
        this.filters.test = '';
        this.filters.expirationWithinDays = '0';
        this.filters.language = '';
        this.resetPage();
      },
      uniqueValues(key) {
        return [...new Set(this.data.map(row => row[key]))];
      },
      sort(keyObject) {
        const key = keyObject.key;
        const date_keys = ['expires_at', 'redeemed_at'];
        this.sortOrder = this.sortKey === key && this.sortOrder === 'asc' ? 'desc' : 'asc';
        if (date_keys.includes(key)) {
          sortDates(this, key);
        } else if (key === 'order_num') {
          sortNumbers(this, key);
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
      resetPage() {
        this.currentPage = 1;
      },
      prevPage() {
        if (this.currentPage > 0) {
          this.currentPage = this.currentPage - 1;
        }
      },
      downloadCSV() {
        if (!this.filterData(this.data) || this.filterData(this.data).length === 0) {
          return;
        }
  
        const data = this.filterData(this.data);
  
        const rows = [this.columns.map(col => col.label)]; // Add headers
        data.forEach(row => {
          rows.push(this.columns.map(col => row[col.key] || ''));
        });
  
        const csvContent = rows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "table_data.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      fetchResultsPdf(id) {
        if (!Number.isInteger(id)) {
          console.error('Invalid test ID');
          return;
        }
  
        // Fetch the results pdf
        fetch('/wp-json/eira/v1/test-results?test_id=' + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'test-results.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
      },
      goToPage(page) {
        const truePage = page - 1;
        if (
          truePage >= 0 &&
          truePage <=
          (1 + Math.ceil(this.filteredData.length / this.itemsPerPage))
        ) {
          this.currentPage = page;
        }
      },
      getMergedTestValues() { 

        let testValues = this.uniqueValues('test');

        let hasRheti = false;
        let hasIVQ = false;

        testValues.forEach(value => {
          if (value === 'IVQ') {
            hasIVQ = true;
          }
          if (value === 'RHETI') {
            hasRheti = true;
          }
        });

        if ( ! hasRheti ) {
          testValues.push('RHETI');
        }

        if ( ! hasIVQ ) {
          testValues.push('IVQ');
        }

        return testValues;
      },
      filterData(data) {
        return data
          .filter(row => {
            if (this.filters.testCode) {
              switch (this.filters.testCode) {
                case 'unused':
                  if (row.redeemed_at) {
                    return false;
                  }
                  break;
                case 'used':
                  if (!row.redeemed_at) {
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
            if ( this.filters.expirationWithinDays === "" ) {
              // Do Nothing.
            }
            else if (this.filters.expirationWithinDays && this.filters.expirationWithinDays > 0 && expiration) {
              if (new Date(expiration) > new Date(new Date().setDate(new Date().getDate() + parseInt(this.filters.expirationWithinDays)))) {
                return false;
              }
              if (new Date(expiration) < today) {
                return false;
              }
            }
            else if (this.filters.expirationWithinDays == 0 ) {
              if (! expiration || expiration < today) {
                return false;
              }
            }
            else if(this.filters.expirationWithinDays == -1 ) {
              if (expiration >= today) {
                return false;
              }
            }
  
            if (this.filters.expriationStart && this.filters.expirationStart !== "0" && expiration < new Date(this.filters.expirationStart)) return false;
  
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
        return filtered;
      },
      paginateData() {
        return this.paginatedData(this.filteredData);
      }
    }
  };

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

    function sortNumbers(vue, key) {
        vue.data.sort((a, b) => {
            const valA = a.hasOwnProperty(key) ? a[key] : 0;
            const valB = b.hasOwnProperty(key) ? b[key] : 0;
            if (vue.sortOrder === 'asc') return valA > valB ? 1 : -1;
            return valA < valB ? 1 : -1;
        });
    }

  </script>
<style>

#table-system-vue .btn-light {
  border-color: #000;
  background-color: #f8f9fa;
  color: #000;

  &:hover {
    background-color: #e9ecef;
  }
}

#table-system-vue .table-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>