import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToDoContext } from "../ToDo List Context/ToDoContext";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

// delete pop up
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function NewTask() {
  const [taskInfos, setTaskInfos] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const [TaskInfo, setTaskInfo] = useState({
    uniqueid: uuidv4(),
    Title: "",
    Priority: "Low",
    Category: "Personal",
    DueDate: today,
    isCompleted: false,
  });

  useEffect(() => {
    let taskInfosFromStorage = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTaskInfos(taskInfosFromStorage);
  }, []);

  const [editIndex, setEditIndex] = useState(null);

  function handleclickedbtn(e) {
    e.preventDefault();
    if (TaskInfo.Title.trim() !== "") {
      if (editIndex !== null) {
        // Edit mode: update the task
        setTaskInfos((prev) =>
          prev.map((tsk, i) => (i === editIndex ? { ...TaskInfo } : tsk))
        );

        setEditIndex(null);
      } else {
        // Add mode: add new task
        let updatedTaskInfos = [...taskInfos, TaskInfo];
        setTaskInfos(updatedTaskInfos);
        localStorage.setItem("tasks", JSON.stringify(updatedTaskInfos));

        setTaskInfo({
          uniqueid: uuidv4(),
          Title: "",
          Priority: "Low",
          Category: "Personal",
          DueDate: today,
          isCompleted: false,
        });
      }
    } else {
      alert("Please enter a task title !!!");
    }
  }

  // filtering tasks
  const [statusFilter, setStatusFilter] = useState("All Tasks");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredTasks = taskInfos.filter((task) => {
    // Status filter
    if (statusFilter === "Active (not Completed)" && task.isCompleted)
      return false;
    if (statusFilter === "Completed" && !task.isCompleted) return false;
    // Category filter
    if (categoryFilter !== "All Categories" && task.Category !== categoryFilter)
      return false;
    return true;
  });

  const TaskList =
    filteredTasks.length > 0 ? (
      filteredTasks.map((tsk, i) => (
        <Task
          key={tsk.uniqueid}
          task={tsk}
          onDelete={() => handleDeleteTask(taskInfos.indexOf(tsk))}
          onEdit={() => {
            setTaskInfo(tsk);
            setEditIndex(taskInfos.indexOf(tsk));
          }}
          onCompleted={() => handleToggleCompleted(taskInfos.indexOf(tsk))}
          Checked={tsk.isCompleted}
        />
      ))
    ) : (
      <>
        <TaskAltIcon className="text-cyan-400" style={{ fontSize: "3rem" }} />
        <p className="text-cyan-400 w-full -mt-16">
          No tasks yet. Add your first task to get started!
        </p>
      </>
    );

  function handleToggleCompleted(index) {
    setTaskInfos((prev) => {
      const updated = prev.map((tsk, i) =>
        i === index ? { ...tsk, isCompleted: !tsk.isCompleted } : tsk
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  }

  function DeleteCompletedTasks() {
    const remainingTasks = taskInfos.filter((task) => !task.isCompleted);
    setTaskInfos(remainingTasks);
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
  }

  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  function handleDeleteTask(index) {
    setDeleteIndex(index);
    setOpen(true);
  }

  function handleAgree() {
    setOpen(false);
    if (deleteIndex !== null) {
      setTaskInfos((prev) => {
        const updated = prev.filter((_, i) => i !== deleteIndex);
        localStorage.setItem("tasks", JSON.stringify(updated));
        return updated;
      });
      setDeleteIndex(null);
    }
  }

  function handleDisagree() {
    setOpen(false);
    setDeleteIndex(null);
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this task ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete this task, you will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <form className="bg-cyan-50 shadow-[0px_0px_18px_-1px_rgba(0,0,0,0.29)] rounded-xl text-left px-5 py-6 mb-8">
        <h2 className="font-bold text-cyan-600 text-xl mb-4">Add New Task</h2>
        <input
          placeholder="What needs to be done?"
          className="w-full mb-5 px-3 py-2 rounded-lg border-cyan-800 border-[2px] focus:outline-none bg-cyan-100"
          required
          value={TaskInfo.Title}
          onChange={(event) => {
            setTaskInfo({ ...TaskInfo, Title: event.target.value });
          }}
        />
        {/*  */}
        <Grid container rowSpacing={0.8} columnSpacing={2} className="mb-4">
          <Grid size={4}>
            <label className="font-semibold text-cyan-500">Priority</label>
          </Grid>
          <Grid size={4}>
            <label className="font-semibold text-cyan-500">Category</label>
          </Grid>
          <Grid size={4}>
            <label className="font-semibold text-cyan-500">Due Date</label>
          </Grid>
          <Grid size={4}>
            <select
              className="w-full px-3 py-2 rounded-lg border-cyan-800 border-[2px] focus:outline-none bg-cyan-100"
              value={TaskInfo.Priority}
              onChange={(event) => {
                setTaskInfo({ ...TaskInfo, Priority: event.target.value });
              }}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </Grid>
          <Grid size={4}>
            <select
              className="w-full px-3 py-2 rounded-lg border-cyan-800 border-[2px] focus:outline-none bg-cyan-100"
              value={TaskInfo.Category}
              onChange={(event) => {
                setTaskInfo({ ...TaskInfo, Category: event.target.value });
              }}
            >
              <option>Personal</option>
              <option>Work</option>
              <option>Shopping</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </Grid>
          <Grid size={4}>
            <input
              className="w-full px-3 py-2 rounded-lg border-cyan-800 border-[2px] focus:outline-none bg-cyan-100"
              type="date"
              required
              value={TaskInfo.DueDate}
              min={today}
              onChange={(event) => {
                setTaskInfo({ ...TaskInfo, DueDate: event.target.value });
              }}
            />
          </Grid>
        </Grid>

        <Container maxWidth="sm">
          <Button
            type="submit"
            variant="contained"
            className="w-full"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleclickedbtn}
          >
            {editIndex !== null ? "Update Task" : "Add Task"}
          </Button>
        </Container>
      </form>
      {/* ==== Creat New Task ==== */}

      {/* Filter */}
      <div className="bg-cyan-50 shadow-[0px_0px_18px_-1px_rgba(0,0,0,0.29)] rounded-xl text-left px-5 py-6 mb-8 flex flex-row justify-between items-center flex-wrap">
        <div className="flex flex-row justify-center items-center gap-4 lg:mb-0 mb-5">
          <h1 className="font-semibold text-cyan-500">Filter:</h1>

          <select
            className="px-3 py-1 rounded-lg border-cyan-800 border-[2px] focus:outline-none bg-cyan-100"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Tasks</option>
            <option>Active (not Completed)</option>
            <option>Completed</option>
          </select>

          <select
            className="px-3 py-1 rounded-lg border-cyan-800 border-[2px] focus:outline-none bg-cyan-100"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All Categories</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Other</option>
          </select>
        </div>
        <Button variant="text" color="error" onClick={DeleteCompletedTasks}>
          <DeleteOutlineOutlinedIcon /> Clear Completed
        </Button>
      </div>
      {/* ==== Filter ==== */}

      {/* Display */}
      <ToDoContext.Provider value={TaskInfo}>
        <div className="bg-cyan-50 shadow-[0px_0px_18px_-1px_rgba(0,0,0,0.29)] rounded-xl px-5 py-6 mb-8">
          <h1 className="text-left font-bold text-cyan-600 text-xl mb-4">
            Your Tasks
          </h1>
          <div className="w-full h-52 flex justify-center items-center flex-row flex-wrap pr-2 py-6 mb-3 overflow-y-auto">
            {TaskList}
          </div>
          <hr class="border-2 rounded-lg border-cyan-100 mb-3 mt-2"></hr>
          <div className="flex justify-between items-center text-cyan-600">
            <p>{taskInfos.length} tasks</p>
            <p>
              <p>{taskInfos.filter((t) => t.isCompleted).length} completed</p>
            </p>
          </div>
        </div>
      </ToDoContext.Provider>
      {/* ==== Display ==== */}
    </>
  );
}
