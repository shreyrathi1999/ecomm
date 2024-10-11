export default {
  getProducts(state) {
    return state.products;
  },
  hasFavourites(state) {
    return state.favourites.length > 0;
  },
  getFavourites(state) {
    return state.favourites;
  },
  inFavourite: (state) => (prodId) => {
    return state.favourites.includes(prodId);
  },
  reviews(state) {
    return (productId) =>
      state.reviews.filter((rev) => rev.prodId === productId);
  },
  filteredProducts(state) {
    if (!state.searchQuery.trim()) {
      return []; // Return an empty array if no search term
    }
    return state.products.filter((prod) =>
      prod.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  },
  getSearchProducts(state){
    return state.searchResults;
  },
};
