export default {
  addToFavourites(state, payload) {
    const prodId = payload;
    state.favourites.push(prodId);
  },
  removeFromFavourite(state, payload) {
    const prodId = payload;
    state.favourites = state.favourites.filter((id) => id !== prodId);
  },

  setProducts(state, payload) {
    // Ensure payload is always an array
    const newProducts = payload || []; // Fallback to an empty array if payload is null/undefined
    state.products = [...state.products, ...newProducts]; // Append new products to existing ones
  },
  clearProducts(state) {
    // Clear products from the store
    state.products = []; 
  },

  addReview(state, payload) {
    state.reviews.push(payload);
  },
  setReviews(state, payload) {
    state.reviews = payload;
  },

  setSearchQuery(state, query){
    state.searchQuery = query;
  },

  setSearchResults(state, payload){
    state.searchResults = payload;
  }
};
