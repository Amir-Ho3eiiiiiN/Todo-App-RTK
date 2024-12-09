import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo } from "../features/todo/todoSlice";

export default function TodoForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) dispatch(addAsyncTodo({ title: value }));
    setValue("");
  };

  return (
    <form>
      <div className="rounded-lg shadow-md border basis-1/3 p-4 bg-sky-100">
        <label htmlFor="todoName" className="px-2 mb-2 block">
          Name
        </label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          id="todoName"
          placeholder="Add todo..."
          className="w-full rounded-md py-2 px-4 mb-2 border outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-gray-100 rounded-md px-4 py-1 disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "submiting ..." : "submit"}
        </button>
      </div>
    </form>
  );
}
