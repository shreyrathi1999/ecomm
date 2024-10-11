export default {
  addingFavourite(context, payload) {
    context.commit("addToFavourites", payload);
  },
  removingFavourite(context, payload) {
    context.commit("removeFromFavourite", payload);
  },

  async updateSearchQuery(context, query) {
    const response = await fetch(
      `https://ecomm-cfdea-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
    );
    const responseData = await response.json();

    if (!response) {
      const error = new Error("No products matching your search!");
      throw error;
    }

    const results = [];
    for (const key in responseData) {
      if (responseData[key].name.toLowerCase().includes(query.toLowerCase())) {
        const res = {
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          images: responseData[key].images,
        };
        results.push(res);
      }
    }
    console.log("search results" + results);
    context.commit("setSearchResults", results);
  },

  async loadProducts(context, { limit, offset }) {
    const response = await fetch(
      "https://ecomm-cfdea-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );
    const responseData = await response.json();

    if (!response) {
      const error = new Error(
        responseData.message || "Failed to fetch data. Sorry!"
      );
      throw error;
    }

    const products = [];
    const keys = Object.keys(responseData).slice(offset, offset + limit); // Slice to get only a batch of products
    for (const key of keys) {
      const prod = {
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
        images: responseData[key].images,
      };
      products.push(prod);
    }
    console.log("loaded = " + products);
    context.commit("setProducts", products);
  },

  async addingReview(context, payload) {
    const newReview = {
      name: payload.name,
      reviewText: payload.reviewText,
    };

    const response = await fetch(
      `https://ecomm-cfdea-default-rtdb.asia-southeast1.firebasedatabase.app/reviews/${payload.prodId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newReview),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to send request");
      throw error;
    }
    newReview.id = responseData.name;
    newReview.prodId = payload.prodId;

    context.commit("addReview", newReview);
  },

  async fetchReviews(context, payload) {
    const productId = payload;
    const response = await fetch(
      `https://ecomm-cfdea-default-rtdb.asia-southeast1.firebasedatabase.app/reviews/${productId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to send request");
      throw error;
    }

    const reviews = [];
    for (const key in responseData) {
      const review = {
        id: key,
        prodId: productId,
        name: responseData[key].name,
        reviewText: responseData[key].reviewText,
      };
      reviews.push(review);
    }

    context.commit("setReviews", reviews);
  },
};
