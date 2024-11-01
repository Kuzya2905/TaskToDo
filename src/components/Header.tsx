import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import { addTask, clearTasks } from "../store/toDoSlice";

const AddTask: React.FC = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={"20px"}
      sx={{ backgroundColor: "#8b858f", borderRadius: "20px" }}
      gap={"10px"}
      boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.4)"}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddTask}
        sx={{ padding: "5px", width: "150px" }}
      >
        Добавить
      </Button>
      <TextField
        variant="standard"
        label="Пополните список ..."
        size="small"
        sx={{
          width: "160px",
          "& .MuiFormLabel-root": { color: "white" },
          "& .MuiFormLabel-root.Mui-focused": { color: "white" },
          "& .MuiInputBase-input": { color: "white" },
        }}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        endIcon={<ClearAllIcon />}
        sx={{ padding: "5px", width: "150px", backgroundColor: "#b34f52" }}
        onClick={() => dispatch(clearTasks())}
      >
        Очистить
      </Button>
    </Box>
  );
};

export default AddTask;
