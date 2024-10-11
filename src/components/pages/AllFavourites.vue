<template>
<div>
  <h1>Favourites</h1>
  <div v-if="!favouritesExist">
    <p>No favourites yet, look at the products to find your favourites?</p>
    <router-link to="/products">
      <base-button>Products</base-button>
    </router-link>
  </div>
  <div class="container">
    <ul class="product-list">
      <favourite-item
        v-for="ids in allFavourites"
        :key="ids"
        :product="getProducts(ids)"
      ></favourite-item>
    </ul>
  </div>
</div>
</template>

<script>
import FavouriteItem from "../favourites/FavouriteItem.vue";
import BaseButton from "../ui/BaseButton.vue";
export default {
  components: { FavouriteItem, BaseButton },
  computed: {
    allFavourites() {
      return this.$store.getters["getFavourites"];
    },
    favouritesExist() {
      return this.$store.getters["hasFavourites"];
    },
  },
  methods: {
    getProducts(prodId) {
      const selectedProd = this.$store.getters["getProducts"].find(
        (product) => product.id === prodId
      );
      return selectedProd;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
}


.product-list {
  list-style-type: none; 
  padding: 0;
  margin: 0;
  display: flex; 
  flex-wrap: wrap;
  justify-content: center;
}


.favourite-item {
  flex: 0 1 calc(33.333% - 20px);
  margin: 10px;
  box-sizing: border-box;
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
