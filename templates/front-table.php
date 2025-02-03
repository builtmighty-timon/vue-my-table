<div id="vue-table-app">
    <div class="table-filters">
        <div>
            <label>Test Code:</label>
            <select v-model="filters.testCode">
                <option value="">All</option>
                <option v-for="testCode in uniqueValues('test_code')" :key="testCode">
                    {{ testCode }}
                </option>
            </select>
        </div>
        <div>
            <label>Date Range (Expiring):</label>
            <input type="date" v-model="filters.expirationStart" placeholder="Start Date">
            <input type="date" v-model="filters.expirationEnd" placeholder="End Date">
        </div>
        <div>
            <label>Test:</label>
            <select v-model="filters.test">
                <option value="">All</option>
                <option v-for="testVal in uniqueValues('test')" :key="testVal">
                    {{ testVal }}
                </option>
            </select>
        </div>
        <div>
            <label>Language:</label>
            <select v-model="filters.language">
                <option value="">All</option>
                <option v-for="lang in uniqueValues('language')" :key="lang">
                    {{ lang }}
                </option>
            </select>
        </div>
        <div>
            <label>Search:</label>
            <input type="text" v-model="filters.search" placeholder="Search...">
        </div>
    </div>

    <table>
        <thead>
        <tr>
            <th v-for="col in columns" @click="sort(col)">
                {{ col.label }}
                <span v-if="sortKey === col.key"> {{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
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