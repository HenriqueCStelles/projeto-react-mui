import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { makeStyles } from "@mui/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    justifyContent: "center",
    display: "flex",
  },
  title: {
    justifyContent: "center",
    color: "#013e87",
    display: "flex",
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "white",
    width: 800,
  },
  box1: {
    width: 800,
    display: "centerflex",
    justifyContent: "center",
  },
  box2: {
    display: "flex",
    paddingTop: 4,
    paddingBottom: 4,
  },
  box3: {
    display: "flex",
    justifyContent: "right",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 4,
    paddingBottom: 4,
  },
}));

function Register() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuário adicionado com sucesso!");
      setNome("");
      setSobrenome("");
      setEmail("");
      setPassword("");
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          nome: nome,
          sobrenome: sobrenome,
        });
      }
      navigate("/");
    } catch (error) {
      alert("Erro ao criar usuário");
    }
  };

  return (
    <Container className={classes.container}>
      <Box>
        <Box className={classes.title}>
          <Typography variant="h1">Resgistrar Usuário</Typography>
        </Box>
        <Box className={classes.box1}>
          <Box>
            <Box className={classes.box2}>
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                placeholder="Digite seu nome..."
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className={classes.input}
              />
            </Box>
            <Box className={classes.box2}>
              <TextField
                id="outlined-basic"
                label="Sobrenome"
                variant="outlined"
                placeholder="Digite seu sobrenome..."
                value={sobrenome}
                onChange={(event) => setSobrenome(event.target.value)}
                className={classes.input}
              />
            </Box>
            <Box className={classes.box2}>
              <TextField
                type="email"
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                placeholder="Digite seu email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={classes.input}
              />
            </Box>
            <Box className={classes.box2}>
              <TextField
                type="password"
                id="outlined-basic"
                label="Senha"
                variant="outlined"
                placeholder="Digite sua senha..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={classes.input}
              />
            </Box>
            <Box className={classes.btn}>
              <Button variant="contained" onClick={handleRegister}>
                Registrar
              </Button>
            </Box>
            <Box className={classes.box3}>
              <Typography>
                Já possui login?
                <Button onClick={() => navigate("/")}>Login</Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
