import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const url = 'http://localhost:5000/todos';

const App = () => {
  // const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(null);

  //GET
  const getTodos = async () => {
    console.log('todos 가져오기');
    const result = await Axios.get(url);
    const { data } = result;
    setTodos(data);
  }

  //POST
  const postTodos = async () => {
    console.log('todo 작성 시작');
    const sample = {
      //현재 todos의 길이 보다 하나 크게
      //TODO: UNIQ. key
      id: todos.length + 1,
      content: "Node.js"
    }

    const result = await Axios.post(url, sample);
    const { data } = result //디스트럭팅 하면서 data가 뽑힘
    //여기서 Axios를 부르면 비효율적.. 왜? .. 그래서 setTodos를 사용.
    setTodos([...todos, data]) //주의점은 react가 지켜보고 있는 state가 바뀌어야 react가 그것을 감지하고 새로 render해줌.
  }

  useEffect(() => {
    getTodos()
  }, []) //빈 배열로 넣고 한번만 알려줘야 함
  //빈배열에 todos를 부르면 getTodos를 부르고 그 안에서 setTodos를 부르는데 그걸 또 todos라 감지하고 계속 랜더 .. 재귀적 호출이 일어남.


  return (
    <>
      <h1>TODO front</h1>
      <form>
        <input type="text" />
        <button onClick={postTodos}>등록</button>
      </form>
      {todos ? todos.map(el => (<div key={el.id}>{el.content}</div>)) : <div>Spinner</div>}
    </>
  );
};

export default App;
