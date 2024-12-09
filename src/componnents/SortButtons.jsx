import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { filterTodos, sortTodos } from "../features/todo/todoSlice";

function SortButtons() {
  const dispatch = useDispatch();
  const { sort, todos } = useSelector((state) => state.todos);
  const completed = todos.filter((item) => item.completed === true);
  const unCompleted = todos.filter((item) => item.completed === false);

  return (
    <div className="flex justify-around bg-purple-200 rounded-md py-2 px-4 mb-2 ">
      <button className="flex items-center gap-2 cursor-default">
        <span>All</span>
        <span className="w-5 h-5 rounded-full bg-yellow-600 text-white flex justify-center items-center">
          {todos.length}
        </span>
      </button>
      <button
        onClick={() => dispatch(filterTodos(true))}
        className="flex items-center gap-2"
      >
        <span>Completed</span>
        <span className="w-5 h-5 rounded-full bg-lime-600 text-white flex justify-center items-center">
          {completed.length}
        </span>
      </button>
      <button
        onClick={() => dispatch(filterTodos(false))}
        className="flex items-center gap-2"
      >
        <span>UnCompleted</span>
        <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex justify-center items-center">
          {unCompleted.length}
        </span>
      </button>
      <button
        onClick={() => dispatch(sortTodos(!sort))}
        className="flex gap-1 justify-center items-center"
      >
        <span>sort</span>
        <ArrowDownCircleIcon
          className={`size-5 text-green-600 transition-all ${
            sort ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}

export default SortButtons;
