import Tasks from "./ToDo List/Tasks";
import Container from "@mui/material/Container";
import { ToDoContext } from "./ToDo List Context/ToDoContext";

function App() {
  return (
    <ToDoContext.Provider value={ToDoContext}>
      <div className="App mt-12 text-center">
        <Container maxWidth="md">
          <div>
            <h1 className="text-4xl font-bold text-cyan-700 mb-2">TaskFlow</h1>
            <p className="mb-4">Organize your day, achieve your goals</p>
            <hr class="border-4 rounded-lg border-cyan-300 mb-9 w-1/3 mx-auto"></hr>
          </div>
          <Tasks />
          <footer>Hello Netliry and gitHub</footer>
        </Container>
      </div>
    </ToDoContext.Provider>
  );
}

export default App;
