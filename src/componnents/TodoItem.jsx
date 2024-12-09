import { useDispatch } from "react-redux";
import { deleteAsyncTodo, toggleAsyncTodo } from "../features/todo/todoSlice";

export default function TodoItem({ id, title, completed, date }) {
  const dispatch = useDispatch();
  return (
    <li className="border-b border-gray-400 px-4 pb-2  flex justify-between items-center mb-4">
      <div>
        <p className={`${completed ? "line-through" : ""} font-bold`}>{title}</p>
        <span className="text-sm text-gray-500">
          {new Date(date).toLocaleString("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() =>
            dispatch(toggleAsyncTodo({ id, completed: !completed }))
          }
          className={`px-3 py-1  text-sm text-gray-50 rounded-full ${
            completed ? "bg-yellow-700" : "bg-yellow-400"
          }`}
        >
          {completed ? <>UnCompleted</> : <>Completed</>}
        </button>
        <button
          onClick={() => dispatch(deleteAsyncTodo({ id }))}
          className="px-3 py-1 bg-red-400 text-sm text-gray-50 rounded-full"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
