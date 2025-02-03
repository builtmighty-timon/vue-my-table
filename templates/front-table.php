<?php ?>
<div id="vue-table-app" class="container">
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
                         &nbsp; Search</span>
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
                            <option v-for="testVal in uniqueValues('test')" :key="testVal">
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
                        <label class="form-label">Expiring</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <select id="test" class="form-select" v-model="filters.expirationWithinDays">
                            <option value="">All</option>
                            <option value="60">60 Days</option>
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
        <div class="row">
        <div class="table-filters mb-4 container">
            </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-light">
                <tr>
                    <th v-for="col in columns" @click="sort(col)" class="text-center">
                         {{col.label}}
                        <span v-if="sortKey.key === col.key"> {{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="row in filteredData" :key="row.test_code">
                        <td>{{ row.test_code }}</td>
                        <td>{{ row.test }}</td>
                        <td>{{ row.language }}</td>
                        <td>{{ row.order_num }}</td>
                        <td>{{ row.taker_name }}</td>
                        <td>{{ row.taker_email }}</td>
                        <td>{{ row.expiration_date }}</td>
                        <td>{{ row.used_on_date }}</td>
                        <td>{{ row.results }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
