import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Login from "./components/Login";

import { RootState } from "./store";

import "./App.css";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.toDos.isLoggedIn);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "25px",
                    width: 900,
                    gap: "20px",
                  }}
                >
                  <Header />
                  <TaskList />
                </Container>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
