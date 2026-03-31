import { Box, Container, Typography } from "@mui/material";
import NewProduct from "./components/NewProduct";
import { useEffect, useState } from "react";
import Products from "./components/Products";

export type Produto = { id: number; nome: string; quantidade: number };

function App() {
  const [produtos, setProduto] = useState<Produto[]>(
    JSON.parse(localStorage.getItem("produtos") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  function addProduct(nome: string, quantidade: number) {
    const newProduct = {
      id: produtos.length + 1,
      nome,
      quantidade,
    };
    setProduto([...produtos, newProduct]);
  }

  function deleteProduct(productId: number) {
    const newProducts = produtos.filter((product) => product.id != productId);
    setProduto(newProducts);
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Typography
          variant="h1"
          sx={{ my: 4, textAlign: "center", color: "primary.main" }}
        >
          Gerenciador de Estoque
        </Typography>
        <NewProduct addProduct={addProduct} />
        <Products produtos={produtos} deleteProduct={deleteProduct} />
      </Box>
    </Container>
  );
}

export default App;
