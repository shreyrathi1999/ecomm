<template>
<div>
  <h3>Add your review?</h3>
  <form @submit.prevent="submitForm">
    <label for="name">Your name: </label>
    <input type="text" id="name" v-model="enteredName" /><br /><br />
    <label for="review-text">What do you think?</label>
    <textarea rows="6" cols="50" ref="review"></textarea>
    <base-button buttonType="secondary">Submit</base-button>
  </form>
    <h1>Reviews</h1>
    <div class="container">
    <base-card v-for="rev in hasReviews" :key="rev.name">
        <h4>Review by {{rev.name}}</h4>
        <p>{{rev.reviewText}}</p>
    </base-card>
    </div>
</div>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
import BaseCard from '../ui/BaseCard.vue';
export default {
  components: { BaseButton, BaseCard },
  props: ["prodId"],
  data() {
    return {
      enteredName: null,
      reviewText: null,
      formIsValid: true,
    };
  },
  computed : {
    hasReviews() {
        return this.$store.getters.reviews(this.prodId);
    }
  },
  methods: {
    submitForm() {
      this.reviewText = this.$refs.review.value;

      if (this.enteredName === "" || this.reviewText === "") {
        this.formIsValid = false;
        return;
      }

      this.$store
        .dispatch("addingReview", {
          prodId: this.prodId,
          name: this.enteredName,
          reviewText: this.reviewText,
        })
        .then(() => {
          this.enteredName = "";
          this.$refs.review.value = "";
          this.formIsValid = true;
        })
        .catch((error) => {
          console.error(error); 
          this.formIsValid = false; 
        });
    },

    loadReviews(){
        try{
            this.$store.dispatch('fetchReviews',this.prodId);
        }catch(error){
            this.error = error.message || "Something falied";
        }
    },
  },
  
  created() {
    this.loadReviews();
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 20px auto; 
  padding: 20px; 
  border: 1px solid #ccc; 
  border-radius: 5px;
  background-color: #f9f9f9; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

label {
  display: block;
  margin: 10px 0 5px; 
  font-weight: bold; 
}

input[type="text"],
textarea {
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ccc;
  border-radius: 4px; 
  font-size: 16px; 
  box-sizing: border-box; 
}

input[type="text"]:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

textarea {
  resize: vertical; 
  margin-bottom: 1rem;
}

br {
  margin: 10px 0; 
}

.container {
  align-items: center;
}
</style>
