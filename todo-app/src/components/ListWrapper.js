import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import ListHeader from './ListHeader';
import TodoCardList from './TodoCardList';
import TextAreaCard from './TextAreaCard';

import './ListWrapper.css';

const url = 'http://localhost:5000/todos';

const ListWrapper = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(null);
  const [createMode, setCreateMode] = useState(false);

  const UniqKey = () => {
    if (todos && todos.length) {
      return todos[todos.length - 1].id + 1;
    } else {
      return 0;
    };
  };

  const getTodos = async () => {
    const result = await Axios.get(url);
    // result > status > 200 일때!
    const { data } = result;
    setTodos(data);
  };

  const postTodos = async (e) => {
    e.preventDefault();
    const sample = {
      //현재 todos의 길이 보다 하나 크게
      id: UniqKey(),
      content: todo,
      completed: false
    };
    //const id = sample.id; // sample의 id 속성값
    //const {id} = sample; // sample의 속성 중 id 값 (디스트럭처링(구조를 분해)) 위 와 결과 같음 
    const result = await Axios.post(url, sample);
    const { data } = result; ////result의 속성 중 data를 디스트럭처링
    
    setTodos([...todos, data]); ////주의점은 react가 지켜보고 있는 state가 바뀌어야 react가 그것을 감지하고 새로 render해줌.
    setTodo('');
    setCreateMode(!createMode);
  };
  
  const deleteTodos = async (id) => {
    await Axios.delete(url + `/${id}`);
    //find helper method를 이용하여 배열에 접근
    const targetTodo = todos.find(el => el.id === id);
    const idx = todos.indexOf(targetTodo);
    todos.splice(idx, 1); //실제 todos 바뀌었지만 react는 아직 감지 못함
    //우리가 잘라놓은 애를 감지할 수 있게 해줘야하므로 setTodos() 사용.
    setTodos([...todos]);
    //todos.splice()함수가 pop 동작하는 애라 splice의 return값이 한 요소만 알려주므로 전체가 지워짐
        //그래서 바뀐 todos를 array로 뿌려줘야 해서 ... 구조할당
  };

  // 체크박스 onchange사용하기 위해 
  const patchCompleted = async (id) => {
    const targetTodo = todos.find(el => el.id === id);
    //id에 해당하는 값으로 pacth접근
    await Axios.patch(url + `/${id}`, { completed: !targetTodo.completed }); //데이터(completed) 넣을 자리
    //화면에서도 수정되게
    targetTodo.completed = !targetTodo.completed;
    setTodos([...todos]);
  };

  const changeCreateMode = () => {
    setCreateMode(!createMode);
  };

  useEffect(() => {
    getTodos();
  }, []); //빈 배열로 넣고 한번만 알려줘야 함
   //빈배열에 todos를 부르면 getTodos를 부르고 그 안에서 setTodos를 부르는데 그걸 또 todos라 감지하고 계속 랜더 .. 재귀적 호출이 일어남.

  return (
    <div className="list-wrapper">
      <ListHeader title="Lorem Ipsum" />
      {todos ? <TodoCardList todos={todos} patchCompleted={patchCompleted} deleteTodos= {deleteTodos}/> : <div>Spinner</div>}
      {createMode ? <TextAreaCard 
                      postTodos={postTodos}
                      setTodo={setTodo}
                      todo={todo} 
                      changeCreateMode={changeCreateMode} /> : <div className="add-button" onClick={changeCreateMode}>
                        <p>+ Add another card</p>
                      </div>}
    </div>
  );
};

export default ListWrapper;