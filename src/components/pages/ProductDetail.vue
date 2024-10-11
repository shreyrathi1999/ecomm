<template>
  <div>
    <section v-if="!selectedProduct">
      <p>Loading product...</p>
    </section>
    <section v-else>
      <base-card>
        <h1>{{ selectedProduct.name }}</h1>

        <div class="carousel">
          <div class="carousel-inner">
            <div
              class="carousel-item"
              v-for="(image, index) in imageUrls"
              :key="index"
              :class="{ active: index === currentSlide }"
            >
              <img :src="image" class="carousel-image" alt="Product Image" />
            </div>
          </div>
          <button class="carousel-control prev" @click="prevSlide">
            &#10094;
            <!-- Left arrow symbol -->
          </button>
          <button class="carousel-control next" @click="nextSlide">
            &#10095;
            <!-- Right arrow symbol -->
          </button>
        </div>

        <p>{{ selectedProduct.description }}</p>
        <h4>{{ selectedProduct.price }}/-</h4>
        <base-button
          @click="toggleFavourite"
          :buttonType="isFavourite ? 'third' : 'primary'"
        >
          {{ isFavourite ? "Remove from Favourites" : "Add to Favourites" }}
        </base-button>
      </base-card>
    </section>
    <all-reviews :prodId="selectedProduct.id"></all-reviews>
  </div>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
import AllReviews from "../products/AllReviews.vue";
import BaseButton from "../ui/BaseButton.vue";
export default {
  components: { BaseCard, AllReviews, BaseButton },
  props: ["id"],
  computed: {
    imageUrls() {
      return Object.values(this.selectedProduct.images);
    },
    isFavourite() {
      return this.$store.getters.inFavourite(this.selectedProduct.id);
    },
  },
  data() {
    return {
      selectedProduct: null,
      currentSlide: 0,
      loading: true,
      error: null,
    };
  },
  created() {
    this.selectedProduct = this.$store.getters["getProducts"].find(
      (product) => product.id === this.id
    );
  },
  methods: {
    toggleFavourite() {
      if (this.isFavourite) {
        this.$store.dispatch("removingFavourite", this.selectedProduct.id);
        console.log("Removed from favourtie");
      } else {
        this.$store.dispatch("addingFavourite", this.selectedProduct.id);
        console.log("Added to favourtie");
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.imageUrls.length;
      this.updateCarouselTransform();
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.imageUrls.length) % this.imageUrls.length;
      this.updateCarouselTransform();
    },
    updateCarouselTransform() {
      const carouselInner = this.$el.querySelector(".carousel-inner");
      const translateX = -this.currentSlide * 100;
      carouselInner.style.transform = `translateX(${translateX}%)`;
    },


  },
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.base-card {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
}

.base-card h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.carousel {
  position: relative;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.carousel-item {
  min-width: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.carousel-control.prev {
  left: 0;
}

.carousel-control.next {
  right: 0;
}

.base-card p {
  font-size: 1.1em;
  color: #666;
  margin: 20px 0;
}

.base-card h4 {
  font-size: 1.5em;
  color: #4caf50;
  margin: 0 0 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-inner img {
    height: 250px;
  }

  .base-card h1 {
    font-size: 1.5em;
  }

  .base-card h4 {
    font-size: 1.2em;
  }
}
</style>
