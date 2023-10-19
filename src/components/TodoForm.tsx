import { useFormState } from "../utils/hooks/useFormState";
import { todoFormSchema } from "../utils/types";

function TodoForm() {
  const { formState, getFieldError, createHandleChange, createHandleSubmit } =
    useFormState(todoFormSchema);
  return (
    <>
      <form onSubmit={createHandleSubmit((data) => console.log(data))}>
        <div>
          <label htmlFor="todo.title">Name: </label>
          <input
            type="text"
            name="todo.title"
            value={formState.title}
            onChange={(e) => createHandleChange("title")(e.target.value)}
          />
          <p>{getFieldError("title")}</p>
        </div>
        <div>
          <label htmlFor="todo.completed">Completed: </label>
          <input
            type="checkbox"
            name="todo.completed"
            checked={formState.completed}
            onChange={(e) => createHandleChange("completed")(e.target.checked)}
          />
          <p>{getFieldError("completed")}</p>
        </div>
        <input type="submit" value="Save" />
      </form>
    </>
  );
}

export default TodoForm;
