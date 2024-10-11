<template>
  <base-card>
    <h2>{{ name }}</h2>
    <div class="search-item-image">
      <img :src="imageUrls[0]" alt="Product Image" />
    </div>
    <p>{{ description }}</p>
    <p class="price">Price: {{ price }}/-</p>
    <router-link :to="productDetailLink">
          <base-button buttonType="secondary">Details</base-button>
        </router-link>
  
  </base-card>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
import BaseCard from "../ui/BaseCard.vue"; 

export default {
  props: ["id", "name", "description", "price", "images"],
  components: { BaseCard, BaseButton },
  computed:{
    imageUrls() {
      return Object.values(this.images);
    },
    productDetailLink() {
      return "/productdetail/" + this.id;
    },
  }
};
</script>

<style scoped>
.search-item-image {
  margin: 10px 0;
}

.search-item-image img {
  width: 100%; 
  height: auto; 
  border-radius: 8px; 
}

.price {
  font-weight: bold;
  color: #333;
}
</style>
