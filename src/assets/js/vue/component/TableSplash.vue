<template>
  <div class="table-splash-vue flex-column">

    <div class="dotted-border flex-column update-tax-exempt-button-container">
      <div>
        For United States and Canada
      </div>
      <div>
        <a href="javascript:void(0)" class="btn btn-primary">Update Tax Exempt Status</a>
      </div>
    </div>

    <div class="solid-border tests-summary">
      <div class="summary-heading">
        <div>
          Tests Summary
        </div>
        <div>
          <a @click="">View Test Details</a>
        </div>
      </div>
      <div class="summary-body">
        <div>
          <a @click="">
            <div class="link-title">RHETI</div>
            <div class="available-codes">Available Codes: 49</div>
            <div class="expiring-info">Expiring within 60 days: 0</div>
          </a>
        </div>
        <div>
          <a @click="">
            <div class="link-title">IVQ</div>
            <div class="available-codes">Available Codes: 25</div>
            <div class="expiring-info">Expiring within 60 days: 0</div>
          </a>
        </div>
      </div>
    </div>

    <div class="faqs-link">
      <a @click="">FAQs</a>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'TableSplash',
  props: {
    tableData: {
      type: Array,
      required: true
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

.table-splash-vue .dotted-border{
  border: 2px dashed #c3a253;

}

.table-splash-vue .solid-border{
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
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: salmon;
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
  font-size:1.4rem;
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

</style>