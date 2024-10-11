<template>
  <div class="product-item">
    <li>
      <base-card>
      <h3>{{product.name}}</h3>
      <p>{{ product.description }}</p>
        <h4>{{ product.price }}</h4>
        <router-link :to="productDetailLink">
        <base-button buttonType="secondary">Details</base-button>
        </router-link>
        <base-button buttonType="third" @click="removeFromFavourite">Remove from Favourites</base-button>
      </base-card>
    </li>
  </div>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
import BaseCard from '../ui/BaseCard.vue'
export default {
  components: { BaseCard, BaseButton },
props : {
    product : {
        type: Object,
        required : true
    }
},
computed : {
    productDetailLink(){
        return '/productdetail/'+this.product.id;
    }
  },
  methods : {
    removeFromFavourite() {
      this.$store.dispatch("removingFavourite", this.product.id);
  }
}
};
</script>

<style scoped>
.product-item {
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
}

.base-card {
  padding: 16px; /* Inner spacing */
  text-align: center; /* Center text within the card */
}

.product-item h2 {
  font-size: 1.5em; /* Increase font size for the product name */
  margin: 0 0 8px; /* Add margin below the title */
}

.product-item p {
  font-size: 1em; /* Standard font size for the description */
  margin: 0 0 16px; /* Add margin below the description */
}

.product-item h4 {
  font-size: 1.25em; /* Font size for the price */
  color: #4CAF50; /* Green color for price */
  margin: 0 0 16px; /* Add margin below the price */
}
</style>