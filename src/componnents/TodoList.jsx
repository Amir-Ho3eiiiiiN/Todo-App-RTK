import { useEffect } from "react";
import { getAsyncTodos } from "../features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import SortButtons from "./SortButtons";

export default function TodoList() {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <SortButtons />
      <div className="rounded-lg shadow-md bg-rose-100 flex-1 p-4">
        <h3 className="text-lg font-semibold  border-gray-400 pb-1 mb-3">
          Todo List
        </h3>
        <ul>
          {!loading ? (
            todos && todos.length > 0 ? (
              todos.map((item) => <TodoItem key={item.id} {...item} />)
            ) : (
              <span>there is no record..</span>
            )
          ) : (
            <span>Loading...</span>
          )}
        </ul>
      </div>
    </div>
  );
}
