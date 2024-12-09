import "./App.css";
import SortButtons from "./componnents/SortButtons";
import TodoForm from "./componnents/TodoForm";
import TodoList from "./componnents/TodoList";

function App() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className=" bg-yellow-600 text-gray-50 text-xl font-semibold p-2 rounded-md shadow-md text-center">
        Todo App with RTK
      </h2>
      <div className="flex justify-between gap-2 items-start">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
