import React, { useEffect, useState } from 'react';

interface Product {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

interface ProductPayload {
  productName: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  orderId: string;
  productId: string;
  quantity: number;
}

interface OrderResponse {
  orderId: string;
  productId: string;
  requestedQuantity: number;
  availableQuantity: number;
  available: boolean;
}

interface OrderStatus {
  orderId: string;
  status: 'PENDING' | 'CONFIRMED' | 'STOCK_CHECKED' | 'OUT_OF_STOCK';
}

export default function ProductManagementAndOrder() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<ProductPayload>({
    productName: '',
    price: 0,
    quantity: 0,
  });

  const [orderPayload, setOrderPayload] = useState<OrderPayload>({
    orderId: '',
    productId: '',
    quantity: 0,
  });
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

    // Fetch products from an API or database
    const fetchProducts = async () => {
        const response = await fetch('http://localhost:8082/products/management');
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add the new product to the products list
        // setProducts((prevProducts) => [...prevProducts, { ...newProduct, productId: prevProducts.length + 1 }]);

        const response = await fetch('http://localhost:8082/products/management', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            console.error('Failed to add product');
        }
        if (response.ok) {
            const addedProduct = await response.json();
            setProducts((prevProducts) => [...prevProducts, addedProduct]);
            fetchProducts();
        }

        // Clear the form
        setNewProduct({
            productName: '',
            price: 0,
            quantity: 0,
        });
    };

  return (
    <div>
      <h3>Product Management and Order</h3>
      {/* Add your product management and order components here */}
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.productName} - ${product.price} (Qty: {product.quantity})
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
      <p>This is a simple product management and order page.</p>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <button type="submit">Add Product</button>
      </form>
      <p>delete product by ID:</p>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const productIdToDelete = (e.target as any).productId.value;
        const response = await fetch(`http://localhost:8082/products/${productIdToDelete}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProducts();
        }
      }}>
        <input
          type="number"
          name="productId"
          placeholder="Product ID"
        />
        <button type="submit">Delete Product</button>
      </form> 
      <p>Place Order:</p>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8081/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderPayload)
        });
        if (response.ok) {
          const orderData = await response.json();
          setOrderResponse(orderData);
        }
      }}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={orderPayload.orderId}
          onChange={(e) => setOrderPayload({ ...orderPayload, orderId: e.target.value })}
        />
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={orderPayload.productId}
          onChange={(e) => setOrderPayload({ ...orderPayload, productId: e.target.value })}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={orderPayload.quantity}
          onChange={(e) => setOrderPayload({ ...orderPayload, quantity: parseInt(e.target.value) || 0 })}
        />
        <button type="submit">Place Order</button>
        {orderResponse && (
          <div>
            <h4>Order Response:</h4>
            <p>Order ID: {orderResponse.orderId}</p>
            <p>Product ID: {orderResponse.productId}</p>
            <p>Requested Quantity: {orderResponse.requestedQuantity}</p>
            <p>Available Quantity: {orderResponse.availableQuantity}</p>
            <p>Available: {orderResponse.available ? 'Yes' : 'No'}</p>
          </div>
        )}
      </form>
      <p>Check Order Status:</p>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8081/orders/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderPayload)
        });
        if (response.ok) {
          const statusData = await response.json();
          setOrderStatus(statusData);
        }
      }}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={orderPayload.orderId}
          onChange={(e) => setOrderPayload({ ...orderPayload, orderId: e.target.value })}
        />
        <button type="submit">Check Order Status</button>
      </form>
      {orderStatus && (
        <div>
          <h4>Order Status:</h4>
          <p>Order ID: {orderStatus.orderId}</p>
          <p>Status: {orderStatus.status}</p>
        </div>
      )}
      <p>Check Final Order Status:</p>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8081/orders/final-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderPayload)
        });
        if (response.ok) {
          const statusData = await response.json();
          setOrderStatus(statusData);
        }
      }}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={orderPayload.orderId}
          onChange={(e) => setOrderPayload({ ...orderPayload, orderId: e.target.value })}
        />
        <button type="submit">Check Final Order Status</button>
      </form>
      {orderStatus && (
        <div>
          <h4>Order Status:</h4>
          <p>Order ID: {orderStatus.orderId}</p>
          <p>Status: {orderStatus.status}</p>
        </div>
      )}
    </div>
  );
}
