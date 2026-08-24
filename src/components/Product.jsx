import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../sanityClient';

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ Query to fetch all products from Sanity
    const query = '*[_type == "product"]';
    
    client.fetch(query)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading products...</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          {product.image && (
            <img 
              src={urlFor(product.image).url()} 
              alt={product.title} 
            />
          )}
          <h3>{product.title}</h3>
          <p className="price">RS. {product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
