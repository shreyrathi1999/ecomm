<template>
  <div>
    <base-dialog v-if="!!error" title="Error Occured" @close="confirmError">
      {{ error }}
    </base-dialog>
    <section>
      <the-search></the-search>
      <div class="filter-container">
        <product-filter @change-filter="setFilters"></product-filter>
      </div>
      <h1>All Products</h1>
      <div class="container">
        <ul class="product-list">
          <product-item
            v-for="prod in filteredProducts"
            :key="prod.id"
            :id="prod.id"
            :name="prod.name"
            :description="prod.description"
            :price="prod.price"
            :images="prod.images"
          ></product-item>
        </ul>
      </div>
      <base-button buttonType="more" @click="loadMore">Load More</base-button>
      <p v-if="error">{{ error }}</p>
    </section>
  </div>
</template>

<script>
import ProductFilter from "../products/ProductFilter.vue";
import ProductItem from "../products/ProductItem.vue";
import TheSearch from "../search/TheSearch.vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseDialog from "../ui/BaseDialog.vue";

export default {
  components: { ProductItem, BaseButton, TheSearch, BaseDialog, ProductFilter },
  data() {
    return {
      error: null,
      offset: 0,
      limit: 6, // Number of products loaded at a time
      totalProducts: 0,
      isInitialLoad: true,
      activeFilters: {
        Filter1: true,
        Filter2: true,
        Filter3: true,
      },
    };
  },
  computed: {
    allProducts() {
      return this.$store.getters["getProducts"];
    },
    filteredProducts() {
      const products = this.$store.getters["getProducts"];

      if (
        !this.activeFilters.Filter1 &&
        !this.activeFilters.Filter2 &&
        !this.activeFilters.Filter3
      ) {
        return products; // return all products if no filters are active
      }

      return products.filter((product) => {
        if (
          this.activeFilters.Filter1 &&
          product.price >= 100 &&
          product.price < 500
        ) {
          return true;
        }
        if (
          this.activeFilters.Filter2 &&
          product.price >= 500 &&
          product.price < 1000
        ) {
          return true;
        }
        if (
          this.activeFilters.Filter3 &&
          product.price >= 1000 &&
          product.price < 1500
        ) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadProducts() {
      if (this.isInitialLoad && this.allProducts.length > 0) {
        this.offset = this.allProducts.length;
        this.isInitialLoad = false;
        return;
      }

      try {
        await this.$store.dispatch("loadProducts", {
          limit: this.limit,
          offset: this.offset,
        });
        this.offset += this.limit;
        this.isInitialLoad = false;
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
    loadMore() {
      this.loadProducts();
    },
    confirmError() {
      this.error = null;
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 10px;
}

.product-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.product-item {
  flex: 0 1 calc(33.333% - 20px);
  margin: 10px;
  box-sizing: border-box;
}

.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .product-item {
    flex: 0 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .product-item {
    flex: 0 1 100%;
    max-width: 300px;
    margin: 10px auto;
  }
}
</style>
