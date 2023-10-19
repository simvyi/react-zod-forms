import { userFormSchema } from "../utils/types";
import { useFormState } from "../utils/hooks/useFormState";

function sendPost(data: any) {
  console.log("Sending data...");
  console.log(data);
  console.log("Completed sending data...");
}

function UserForm() {
  const { formState, getFieldError, createHandleChange, createHandleSubmit } =
    useFormState(userFormSchema);

  return (
    <>
      <form onSubmit={createHandleSubmit(sendPost)}>
        <div>
          <label htmlFor="user.name">Name: </label>
          <input
            type="text"
            name="user.name"
            value={formState.name ?? ""}
            onChange={(e) => createHandleChange("name")(e.target.value)}
          />
          <p>{getFieldError("name")}</p>
        </div>
        <div>
          <label htmlFor="user.email">Email: </label>
          <input
            type="text"
            name="user.email"
            value={formState.email ?? ""}
            onChange={(e) => createHandleChange("email")(e.target.value)}
          />
          <p>{getFieldError("email")}</p>
        </div>
        <div>
          <label htmlFor="user.email">Age: </label>
          <input
            type="number"
            name="user.age"
            value={formState.age ?? 0}
            onChange={(e) => createHandleChange("age")(+e.target.value)}
          />
          <p>{getFieldError("age")}</p>
        </div>

        <input type="submit" value="Save" />
      </form>
    </>
  );
}

export default UserForm;
