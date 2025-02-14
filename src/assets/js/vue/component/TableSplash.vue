<template>

  <div class="table-splash-vue flex-column">

    <div>
      <a href="/special-shop-page" class="order-tests btn btn-primary">Order Tests</a>
    </div>

    <div class="dotted-border flex-column update-tax-exempt-button-container">
      <div>For United States and Canada</div>
      <div>
        <a href="javascript:void(0)" class="btn btn-primary">Update Tax Exempt Status</a>
      </div>
    </div>

    <div class="solid-border tests-summary">
      <div class="summary-heading">
        <div>Tests Summary</div>
        <div>
          <a @click="setSplashState(false)">View Test Details &gt;</a>
        </div>
      </div>
      <div class="summary-body">
        <TestTypeSummary :testType="'RHETI'" :tableData="tableData" @testSelected="filterByTestType" @testSelectedWithExpiry="filterByTestTypeAndDays"/>
        <TestTypeSummary :testType="'IVQ'" :tableData="tableData" @testSelected="filterByTestType" @testSelectedWithExpiry="filterByTestTypeAndDays"/>
      </div>
    </div>

    <div class="faqs-link">
      <a @click="">FAQs</a>
    </div>
  </div>
</template>

<script>
import TestTypeSummary from './TestTypeSummary.vue';

export default {
  name: 'TableSplash',
  components: {
    TestTypeSummary
  },
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
  methods: {
    filterByTestType(testType) {
      const updatedFilters = { ...this.filters, test: testType };
      this.$emit('update:filters', updatedFilters);
    },
    filterByTestTypeAndDays(data) {
      const updatedFilters = { ...this.filters, test: data.testType, expirationWithinDays: data.days };
      this.$emit('update:filters', updatedFilters);
    },
    setSplashState(showSplash) {
      this.$emit('update:showSplash', showSplash);
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.$emit('update:filters', newFilters);

        // Don't show the splash if the filter is reset.
        if (this.showSplash) return;

        // Take away the splash once a filter has been set.
        if (newFilters.testCode || newFilters.expirationStart || newFilters.expirationWithinDays || newFilters.test || newFilters.language || newFilters.search) {
          this.$emit('update:showSplash', false);
        } else {
          this.$emit('update:showSplash', true);
        }
      },
      deep: true
    },
    showSplash: {
      handler(newShowSplash) {
        this.$emit('update:showSplash', newShowSplash);
      }
    }
  }
};
</script>

<style>
.table-splash-vue.flex-column,
.table-splash-vue .flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.table-splash-vue .dotted-border {
  border: 2px dashed #c3a253;
}

.table-splash-vue .solid-border {
  border: 2px solid #c3a253;
}

.table-splash-vue .update-tax-exempt-button-container {
  padding: 1rem;
  max-width: 400px;
}

.table-splash-vue .tests-summary {
  width: 100%;
  margin: 0;
  padding: 0;
}

.table-splash-vue .summary-heading {
  margin: 0;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: mistyrose;
  font-size: 1.3rem;
  border-bottom: 2px solid #c3a253;
  gap: 1rem;
}

@media screen and (min-width: 768px) {
  .table-splash-vue .summary-heading {
    flex-direction: row;
  }
}

.table-splash-vue .summary-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-around;
}

@media screen and (min-width: 768px) {
  .table-splash-vue .summary-body {
    flex-direction: row;
    gap: 0.5rem;
  }
}

.table-splash-vue .summary-body > div {
  padding: 1rem;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .table-splash-vue .summary-body > div {
    width: 50%;
    margin: 1rem 0;
  }

  .table-splash-vue .summary-body > div:first-child {
    border-right: 2px solid #c3a253;
  }
}

.table-splash-vue .link-title {
  font-size: 1.4rem;
  font-weight: 300;
  border-bottom: 1px solid lightgray;
}

.table-splash-vue .available-codes {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.table-splash-vue .expiring-info {
  margin-top: 1.5rem;
  font-size: 0.7rem;
}

.table-splash-vue .tests-summary a {
  color: blue;
  cursor: pointer;
}
</style>