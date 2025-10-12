import { createContext } from "react";

const today = new Date().toISOString().split("T")[0];
export let ToDoContext = createContext({
  Title: "",
  Priority: "Low",
  Category: "Personal",
  DueDate: today,
});
