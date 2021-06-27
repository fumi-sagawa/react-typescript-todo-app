import React, { useState, VFC } from "react";
import { TodoForm } from "./components/TodoForm";

type Todo = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed";

export const App: VFC = () => {
  //追加フォーム
  const [text, setText] = useState("");
  //todoリスト
  const [todos, setTodos] = useState<Array<Todo>>([]);
  //追加
  const [filter, setFilter] = useState<Filter>("all");

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    //何も入力されていなかったらリターン
    if (!text) return;

    const newTodos: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    setTodos([newTodos, ...todos]);
    //フォームへの入力をクリア
    setText("");
  };

  const handleOnEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div className="App">
      <select
        defaultValue="all"
        onChange={(e) => {
          setFilter(e.target.value as Filter);
        }}
      >
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">未完了のタスク</option>
        <option value="removed">削除済みのタスク</option>
      </select>
      {filter === "removed" ? (
        <button
          onClick={() => {
            handleOnEmpty();
          }}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        <TodoForm
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={(e) => handleOnSubmit(e)}
        />
      )}

      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={filter === "checked" || filter === "removed"}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={filter === "checked" || filter === "removed"}
                value={todo.value}
                onChange={(e) => {
                  handleOnEdit(todo.id, e.target.value);
                }}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
