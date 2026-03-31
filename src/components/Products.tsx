import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Pencil, TrashIcon } from "lucide-react";
import { Produto } from "../App";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

type ProductProps = {
  produtos: Produto[];
  deleteProduct: (id: number) => void;
};

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 5,
    display: "flex",
    justifyContent: "center",
  },
  box1: {
    backgroundColor: "#2e74c9",
    borderRadius: 5,
    width: 800,
    paddingRight: 8,
    paddingLeft: 8,
  },
  box2: {
    backgroundColor: "white",
    borderRadius: 2,
  },
  list: {
    width: "100%",
  },
  li: {
    backgroundColor: "white",
    display: "flex",
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    marginTop: 2,
  },
  iconB: {
    backgroundColor: "white",
    padding: 2,
    borderRadius: 2,
  },
}));

const Products: React.FC<ProductProps> = ({ produtos, deleteProduct }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  function editProduct(produtos: Produto) {
    const query = new URLSearchParams();
    query.set("nome", produtos.nome);
    query.set("quantidade", produtos.quantidade.toString());
    navigate(
      `/editProduct?id=${produtos.id}&nome=${produtos.nome}&quantidade=${produtos.quantidade}`,
    );
  }
  return (
    <Container className={classes.container}>
      <Box>
        <Typography variant="h3">Produtos Disponiveis</Typography>
        <Box className={classes.box1}>
          <Box>
            <List className={classes.list}>
              {produtos.map((product) => (
                <ListItem
                  key={product.id}
                  className={classes.li}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Box className={classes.box2}>
                    <Typography variant="h6">
                      Nome: {product.nome} | Quantidade: {product.quantidade}{" "}
                      unidades
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      className={classes.iconB}
                      sx={{ "&:hover": { backgroundColor: "#aba9a4" } }}
                      onClick={() => editProduct(product)}
                    >
                      <Pencil />
                    </IconButton>
                    <IconButton
                      className={classes.iconB}
                      sx={{ "&:hover": { backgroundColor: "#aba9a4" } }}
                      onClick={() => deleteProduct(product.id)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
