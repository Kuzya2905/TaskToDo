import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";

import { login } from "../store/toDoSlice";

const textFieldStyles = {
  "& .MuiFormLabel-root": { color: "white" },
  "& .MuiFormLabel-root.Mui-focused": { color: "white" },
  "& .MuiInputBase-input": { color: "white" },
};

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      dispatch(login());
      navigate("/");
    } else {
      alert("Неверные данные для входа");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="300px"
      margin="auto"
      paddingTop={5}
    >
      <form onSubmit={handleLogin}>
        <TextField
          sx={textFieldStyles}
          label="Логин"
          autoComplete="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          sx={textFieldStyles}
          label="Пароль"
          autoComplete="current-password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
      </form>
    </Box>
  );
};

export default Login;
