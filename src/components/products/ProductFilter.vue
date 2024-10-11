<template>
  <base-card>
    <h2>Filters by price</h2>
    <span class="filter-option">
      <input type="checkbox" id="Filter1" checked @change="setFilter" />
      <label for="Filter1">100-500</label>
      <input type="checkbox" id="Filter2" checked @change="setFilter" />
      <label for="Filter2">500-1000</label>
      <input type="checkbox" id="Filter3" checked @change="setFilter" />
      <label for="Filter3">1000-1500</label>
    </span>
  </base-card>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
export default {
  components: { BaseCard },
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        Filter1: true,
        Filter2: true,
        Filter3: true,
      },
    };
  },
  methods : {
    setFilter(event){
        const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilters = {
                ...this.filters,
                [inputId]: isActive
            };
            this.filters = updatedFilters;
            this.$emit('change-filter',updatedFilters)
    },
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
