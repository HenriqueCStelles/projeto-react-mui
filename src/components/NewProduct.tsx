import {
  Box,
  Button,
  Container,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

type AddProductProps = {
  addProduct: (nome: string, quantidade: number) => void;
};

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "white",
    width: 800,
  },
  box1: {
    width: 1000,
  },
  box2: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {},
}));

const NewProduct: React.FC<AddProductProps> = ({ addProduct }) => {
  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState<number>(1);
  return (
    <Container>
      <Box>
        <Typography variant="h2">Adicionar Produto</Typography>
        <Box>
          <Box className={classes.box1}>
            <Box className={classes.box2}>
              <TextField
                id="outlined-basic"
                label="Produto"
                variant="outlined"
                placeholder="Digite o nome do Produto..."
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className={classes.input}
              />
            </Box>
            <Box className={classes.box2}>
              <Slider
                sx={{ width: 800, my: 5 }}
                defaultValue={1}
                valueLabelDisplay="auto"
                value={quantidade}
                onChange={(event, value) => setQuantidade(value as number)}
              />
            </Box>
            <Box className={classes.box2}>
              <Button
                variant="contained"
                endIcon={<PlusIcon />}
                className={classes.btn}
                onClick={() => {
                  if (!nome.trim() || quantidade === 0) {
                    return alert("Preencha os campos do Produto!");
                  }
                  addProduct(nome, quantidade);
                  setNome("");
                  setQuantidade(1);
                }}
              >
                Adicionar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewProduct;
