import { Box, Button, Container, Typography } from "@mui/material";
import NewProduct from "./components/NewProduct";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import { auth } from "./components/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Box
          sx={{ justifyContent: "center", color: "#013e87", display: "flex" }}
        >
          <Box>
            <Typography variant="h1">Gerenciador de Estoque</Typography>
          </Box>
          <Button onClick={handleLogout}>Sair</Button>
        </Box>
        <NewProduct addProduct={addProduct} />
        <Products produtos={produtos} deleteProduct={deleteProduct} />
      </Box>
    </Container>
  );
}

export default App;
