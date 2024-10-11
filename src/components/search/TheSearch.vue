<template>
  <div>
    <div class="search-container">
      <input
        type="text"
        placeholder="Search Products..."
        v-model="searchQuery"
        @input="onSearch"
        class="search-input"
      />
    </div>

    <div class="carousel-container" v-if="results && results.length > 0">
      <div class="carousel-wrapper">
        <button @click="prev" class="icon-button prev-button">&larr;</button>

        <div class="carousel" ref="carousel">
          <ul v-if="results.length > 0" class="carousel-items">
            <search-item 
              v-for="product in results"
              :key="product.id"
              :id="product.id"
              :name="product.name"
              :description="product.description"
              :price="product.price"
              :images="product.images"
            ></search-item>
          </ul>
        </div>

        <button @click="next" class="icon-button next-button">&rarr;</button>
      </div>
    </div>
    <h4 v-else-if="hasSearched && results.length === 0">No results matching your search</h4>
  </div>
</template>

<script>
import SearchItem from "./SearchItem.vue";

export default {
  components: { SearchItem },
  data() {
    return {
      searchQuery: "",
      results: [],
      hasSearched: false,
    };
  },
  computed: {
    filteredProducts() {
      return this.$store.getters.filteredProducts;
    },
  },
  methods: {
    async onSearch() {
      if (this.searchQuery.trim().length >= 3) {
        this.hasSearched = true;
        await this.$store.dispatch("updateSearchQuery", this.searchQuery);
        this.results = this.$store.getters["getSearchProducts"];
        console.log("These are the results", this.results);
      } else {
        this.results = [];
        this.hasSearched = false;
      }
    },
    next() {
      const carouselWidth = this.$refs.carousel.clientWidth;
      this.currentPosition += carouselWidth;
      this.$refs.carousel.scrollTo({
        left: this.currentPosition,
        behavior: "smooth",
      });
    },
    prev() {
      const carouselWidth = this.$refs.carousel.clientWidth;
      this.currentPosition -= carouselWidth;
      this.$refs.carousel.scrollTo({
        left: this.currentPosition,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.search-input {
  padding: 8px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Carousel container */
.carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
}

.carousel {
  overflow-x: hidden;
  flex: 1;
}

.carousel-items {
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.icon-button {
  background-color: transparent;
  border: none;
  font-size: 2rem; 
  cursor: pointer;
  color: #007bff;
}

.icon-button:hover {
  color: #0056b3;
}

.prev-button {
  position: absolute;
  left: -50px;
}

.next-button {
  position: absolute;
  right: -50px;
}
</style>
