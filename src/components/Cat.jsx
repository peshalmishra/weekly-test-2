import { useState, useEffect } from "react";

export default function Cat() {
  const [fact, setFact] = useState("Click the button to get a cat fact");

  async function getFact() {
    const res = await fetch("https://catfact.ninja/fact");
    const data = await res.json();
    setFact(data.fact);
  }

  useEffect(() => {
    getFact();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Cat Fact</h2>
        <p>{fact}</p>
        <button onClick={getFact}>Get New Fact</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#020617",
    color: "#e5e7eb",
    padding: "25px",
    width: "320px",
    borderRadius: "10px",
    textAlign: "center",
  }
};
