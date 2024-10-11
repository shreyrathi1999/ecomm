<template>
  <div class="product-item">
    <li>
      <base-card>
        <h2>{{ name }}</h2>

        <!-- Show spinner while loading -->
        

        <!-- Show the image only when it's loaded -->
        <div>
          <img :src="imageUrls[0]" @load="handleImageLoad" @error="handleImageError" />
        </div>

        <p>{{ description }}</p>
        <h4>{{ price }}/-</h4>
        <router-link :to="productDetailLink">
          <base-button buttonType="secondary">Details</base-button>
        </router-link>
        <base-button
          @click="toggleFavourite"
          :buttonType="isFavourite ? 'third' : 'primary'"
        >
          {{ isFavourite ? "Remove from Favourites" : "Add to Favourites" }}
        </base-button>
      </base-card>
    </li>
  </div>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
// import BaseSpinner from "../ui/BaseSpinner.vue";

export default {
  props: ["id", "name", "description", "price", "images"],
  components: { BaseCard, BaseButton },
  computed: {
    productDetailLink() {
      return "/productdetail/" + this.id;
    },
    imageUrls() {
      return Object.values(this.images);
    },
    isFavourite() {
      return this.$store.getters.inFavourite(this.id);
    },
  },

  methods: {
    toggleFavourite() {
      if (this.isFavourite) {
        this.$store.dispatch("removingFavourite", this.id);
        console.log("Removed from favourite");
      } else {
        this.$store.dispatch("addingFavourite", this.id);
        console.log("Added to favourite");
      }
    },
  },
};
</script>

<style scoped>
.product-item {
  margin: 0; /* Remove the margin from the <li> element */
}

.base-card {
  padding: 15px;
  border: 1px solid #ccc; /* Border around the card */
  border-radius: 8px; /* Rounded corners */
  background-color: #fff; /* Card background color */
  transition: box-shadow 0.3s ease; /* Transition effect */
  text-align: center; /* Center text */
}

img {
  width: 100%; /* Make the image responsive */
  height: auto; /* Maintain aspect ratio */
  max-height: 200px; /* Limit the height of the images */
  object-fit: cover; /* Ensure the image covers the area */
  border-radius: 8px; /* Optional: round the image corners */
}

h2 {
  font-size: 1.5em; /* Make the title larger */
  margin: 10px 0; /* Margin for spacing */
}

p {
  font-size: 0.9em; /* Description font size */
}

h4 {
  font-weight: bold; /* Make price bold */
}

.base-button {
  margin-top: 10px; /* Spacing above buttons */
}
</style>
