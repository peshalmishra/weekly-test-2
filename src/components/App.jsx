import { useState } from "react";

export default function App() {
  const products = [
    { id: 1, name: "Mobile", price: 15000 },
    { id: 2, name: "Fridge", price: 10000 },
    { id: 3, name: "AC", price: 30000 },
  ];

  const [cart, setCart] = useState([]);

  function toggleCart(product) {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      <h2>🛒 Product Dashboard</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const inCart = cart.some((item) => item.id === p.id);

            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <button onClick={() => toggleCart(p)}>
                    {inCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Total: {total}</h3>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "40px",
    fontFamily: "Arial",
  },
  table: {
    width: "100%",
    maxWidth: "600px",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};
