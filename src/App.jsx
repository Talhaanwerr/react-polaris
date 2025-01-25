import { useState } from "react";
// import "./App.css";
import Products from "./Pages/Products";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Products />
    </>
  );
}

export default App;
