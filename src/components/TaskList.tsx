import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import { RootState } from "../store";
import { deleteTask, toggleCompleteTask } from "../store/toDoSlice";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.toDos.tasks);
  const statusesTabs = {
    "Текущие дела": 0,
    "Все дела": 1,
    "Выполненные дела": 2,
    Корзина: 3,
  };
  const [valueTab, setFilter] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (valueTab === statusesTabs["Текущие дела"])
      return !task.completed && !task.deleted;
    if (valueTab === statusesTabs["Выполненные дела"])
      return task.completed && !task.deleted;
    if (valueTab === statusesTabs["Корзина"]) return task.deleted;
    return !task.deleted;
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setFilter(newValue);

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={"30px 150px"}
      sx={{ backgroundColor: "#8b858f", borderRadius: "20px" }}
      gap={"40px"}
      boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.4)"}
    >
      <Tabs
        value={valueTab}
        onChange={handleChange}
        sx={{
          "& .MuiButtonBase-root": { color: "white" },
          "& .MuiButtonBase-root.Mui-selected": { color: "white" },
        }}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Текущие дела" />
        <Tab label="Все дела" />
        <Tab label="Выполненные дела" />
        <Tab label="Корзина" />
      </Tabs>
      <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filteredTasks.map((task) => (
          <ListItem
            sx={{
              color: "white",
              border: "1px solid white",
              borderEndStartRadius: "10px",
              borderStartEndRadius: "10px",
            }}
            key={task.id}
          >
            <ListItemText
              primary={task.text}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
            <Box display="flex" gap="5px">
              {!task.completed && statusesTabs["Корзина"] && (
                <IconButton
                  onClick={() => dispatch(toggleCompleteTask(task.id))}
                  sx={{
                    padding: "5px",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <DoneIcon />
                </IconButton>
              )}
              {valueTab !== statusesTabs["Текущие дела"] &&
                valueTab !== statusesTabs["Корзина"] && (
                  <IconButton
                    sx={{
                      padding: "5px",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
