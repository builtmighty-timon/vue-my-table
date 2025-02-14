<template>
    <div>
        <a @click="emitTestTypeSelection(testType)">
            <div class="link-title">{{ testType }}</div>
            <div class="available-codes">Available Codes: {{ countForTestType }}</div>
        </a>
        <a @click="emitTestTypeSelectionWithExpiry(testType, 60)">
            <div class="expiring-info">Expiring within 60 days: {{ getExpiryWithinDays(testType, 60) }}</div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'TestTypeSummary',
    props: {
        testType: {
            type: String,
            required: true
        },
        tableData: {
            type: Array,
            required: true
        }
    },
    methods: {
        emitTestTypeSelection(testType) {
            this.$emit('testSelected', testType);
        },
        emitTestTypeSelectionWithExpiry( testType, expiry ) {
            this.$emit('testSelectedWithExpiry', { testType: testType, days: expiry });
        },
        getExpiryWithinDays(days = null) {
            let count = 0;

            this.tableData.forEach(row => {

                let expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + days);

                if ( days === null || new Date(row.expires_at) <= expiryDate) {
                    if ( row.test === this.testType) {
                        count++;
                    }
                }
            });

            return count.toString();
        }
    },
    computed: {
        countForTestType(){

            let count = 0;

            this.tableData.forEach(row => {
                if (row.test === this.testType) {
                    count++;
                }
            });

            return count.toString();
        },

    }
};
</script>

<style>
</style>