import { useState } from "react";

function Add({ setTasks }) {
  const [input, setInput] = useState({});
  const inputHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = input.title
    const response = await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title})})
    const data = await response.json()
      setTasks((prev) => [data, ...prev])
  }


  return (
      <form onSubmit={submitHandler} className="input-group mb-3">
        <input onChange={inputHandler} type="text" name="title" className="form-control" placeholder="Что-то новое" aria-label="Recipient's username"
               aria-describedby="button-addon2"/>
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Добавить</button>
      </form>)
};

export default Add;
