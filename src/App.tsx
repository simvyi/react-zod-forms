import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import TodoForm from "./components/TodoForm";

function App() {
  const [showUserForm, setShowUserForm] = useState(true);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            gap: "4px",
          }}
        >
          <li>
            <button onClick={() => setShowUserForm(true)}>
              Show User Form
            </button>
          </li>
          <li>
            <button onClick={() => setShowUserForm(false)}>
              Show Todo Form
            </button>
          </li>
        </ul>
        {showUserForm ? <UserForm /> : <TodoForm />}
      </div>
    </>
  );
}

export default App;
