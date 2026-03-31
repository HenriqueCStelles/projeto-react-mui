import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase";

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

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Autorizado!");
      setEmail("");
      setPassword("");
      navigate("/app");
    } catch (error) {
      alert("Email ou Senha incorretos! \n Tente Novamente");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Container className={classes.container}>
      <Box>
        <Box className={classes.title}>
          <Typography variant="h1">Login</Typography>
        </Box>
        <Box className={classes.box1}>
          <Box>
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
              <Button variant="contained" onClick={handleSubmit}>
                Login
              </Button>
            </Box>
            <Box className={classes.box3}>
              <Typography>
                Não possui login?
                <Button onClick={() => navigate("/register")}>Registrar</Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
