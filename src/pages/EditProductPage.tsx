import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Produto } from "../App";
import {
  Box,
  Button,
  Container,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    justifyContent: "center",
    display: "flex",
  },
  title: {
    justifyContent: "center",
    color: "#013e87",
    display: "flex",
  },
  box1: {
    width: 800,
    display: "block",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    width: 800,
  },
  btn: {
    display: "flex",
    justifyContent: "center",
  },
}));

function EditProductPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const nome = searchParams.get("nome") || "";
  const quantidade = Number(searchParams.get("quantidade"));
  const [nomeInput, setNomeInput] = useState(nome);
  const [quantidadeInput, setQuantidadeInput] = useState(quantidade);

  const [produtos, setProduto] = useState<Produto[]>(() => {
    const data = localStorage.getItem("produtos");
    return data ? JSON.parse(data) : [];
  });

  const editProduct = () => {
    const atualizar = produtos.map((product) =>
      product.id === id
        ? { ...product, nome: nomeInput, quantidade: quantidadeInput }
        : product,
    );
    setProduto(atualizar);
    localStorage.setItem("produtos", JSON.stringify(atualizar));
    navigate(-1);
  };

  return (
    <Container className={classes.container}>
      <Box>
        <Box className={classes.title}>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <Box>
            <Typography variant="h1">Editar Produto</Typography>
          </Box>
        </Box>
        <Box className={classes.box1}>
          <Box>
            <TextField
              id="outlined-basic"
              label="Produto"
              variant="outlined"
              placeholder="Digite o nome do Produto..."
              value={nomeInput}
              onChange={(event) => setNomeInput(event.target.value)}
              className={classes.input}
            />
            <Box>
              <Slider
                sx={{ width: 800, my: 5 }}
                defaultValue={1}
                valueLabelDisplay="auto"
                value={quantidadeInput}
                onChange={(event, value) => setQuantidadeInput(value as number)}
              />
            </Box>
            <Box className={classes.btn}>
              <Button
                variant="contained"
                endIcon={<PlusIcon />}
                onClick={editProduct}
              >
                Salvar Alterações
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default EditProductPage;
