import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import "./Productlist.css";
import Pagination from "./pages/Pagination";

function Productlist() {
  const { state, dispatch, GetProducts, GetCategories } =
    useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productPerPage = 12;

  useEffect(() => {
    GetProducts();
    GetCategories();
  }, [GetProducts, GetCategories]);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); 
  };


  const filteredProducts = state.products.filter((prd) => {
    const matchesCategory = selectedCategory
      ? prd.category.toLowerCase() === selectedCategory
      : true;
    const matchesSearchQuery = searchQuery
      ? prd.title.toLowerCase().includes(searchQuery)
      : true;
    return matchesCategory && matchesSearchQuery;
  });


 



  return (
    <div className="main-prd-lst">
      <div className="header-search">
        <input
          type="text"
          placeholder="Search by category"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="all">
          {selectedCategory
            ? selectedCategory.toUpperCase()
            : "FEATURED PRODUCTS"}
        </div>

        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {state.categories.map((category, index) => (
            <option key={index} value={category.name.toLowerCase()}>
              {category.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {filteredProducts
          .slice((currentPage - 1) * productPerPage, currentPage * productPerPage)
          .map((prd, index) => (
            <div key={index} className="product-card">
              <img
                className="prd-images-main"
                src={prd.thumbnail}
                alt={prd.title}
              />
              <p className="title">{prd.title}</p>
              <p className="category">{prd.category}</p>
              <p className="price">${prd.price}</p>
              <button onClick={() => handleAddToCart(prd)}>Add to cart</button>
            </div>
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={productPerPage}
        totalItems={filteredProducts.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Productlist;
