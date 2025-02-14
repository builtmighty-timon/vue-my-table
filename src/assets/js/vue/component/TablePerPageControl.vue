<template>
    <div class="form-group table-per-page-control">
        <label for="table-per-page" class="form-label">Rows per page:</label>
        <select id="table-per-page" class="form-select" v-model="localItemsPerPage">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'TablePerPageControl',
    props: {
        itemsPerPage: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            localItemsPerPage: this.itemsPerPage
        }
    },
    watch: {
        itemsPerPage: {
            handler(newItemsPerPage) {
                this.localItemsPerPage = newItemsPerPage;
            }
        },
        localItemsPerPage: {
            handler(newItemsPerPage) {
                this.$emit('update:itemsPerPage', newItemsPerPage);
            }
        }
    }
};
</script>

<style>
</style>