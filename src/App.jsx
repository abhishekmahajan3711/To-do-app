import { useEffect, useState } from 'react'
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';
import './App.css'
import { collection, doc, addDoc, onSnapshot,deleteDoc,updateDoc } from "firebase/firestore";
import { db } from './firebase';


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);



  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  }


// reading the data
useEffect(()=>{
  const unsubscirbe=onSnapshot(collection(db,'lists'), (snapshot)=>{
    setTodos(snapshot.docs.map((doc)=> ({id:doc.id,todo:doc.data().todo})));
  });
  return ()=>unsubscirbe();
},[]);



  const updateTodo = async () => {
    try {

      if (input.trim() != '') {
        // const updateTodos = [...todos];
        // updateTodos[editIndex].todo = input;
        // setTodos(updateTodos);
        // setEditIndex(-1);
        // setInput('');
        await updateDoc(doc(db,'lists',todos[editIndex].id),{
          todo:input
        });
        setInput('');
        setEditIndex(-1);

      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo = async () => {
    try {
      if (input.trim() !== '') {
        // setTodos([...todos, { id: new Date(), todo: input }]);
        // setInput('');
        await addDoc(collection(db, "lists"), { todo: input });
        setInput('');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    // let filterdata = todos.filter((todo) => todo.id != id);
    // setTodos(filterdata);
    await deleteDoc(doc(db,'lists',id));
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-2/4'>
          <h1 className='text-3xl font-bold text-center mb-4'>Todo App</h1>
          <div className='flex'>
            <input
              type="text"
              placeholder="Add a todo"
              className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)} />
            <button className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded'
              onClick={editIndex === -1 ? addTodo : updateTodo}>
              {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
            </button>
          </div>
        </div>


        {todos.length > 0 && (<div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-2/4'>
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3'>
                <span className='text-lg'>{todo.todo}</span>
                <div>
                  <button className='mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700'
                    onClick={() => setEdit(index)}>
                    <FaPencilAlt />
                  </button>
                  <button className='p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700' onClick={() => deleteTodo(todo.id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>)}
      </div>
    </>
  )
}

export default App
