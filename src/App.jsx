import { useState, useEffect } from 'react';
import './App.css'
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

export default function App() {
  // set and get todos
  // get todos from localStorage
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    return storedTodos || [];
  });

  // new todo object
  const [newTodo, setNewTodo] = useState({ task: '', priority: '' });

  // search item
  const [searchTerm, setSearchTerm] = useState('');



  // getting input value to add new todo
  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  // add new todo
  const addTodo = () => {
    if (newTodo.task && newTodo.priority) {
      setTodos([...todos, newTodo]);
      setNewTodo({ task: '', priority: '' });
    }
  };

  // delete todo
  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // edit todo
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState({ task: '', priority: '' });

  const editTodo = (index) => {
    setEditIndex(index);
    setEditedTodo(todos[index]);
  };
  const saveEditedTodo = () => {
    if (editedTodo.task && editedTodo.priority) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editedTodo;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditedTodo({ task: '', priority: '' });
    }
  };

  // set the serach item input
  const searchTodo = (e) => {
    setSearchTerm(e.target.value);
  };
  // filtered all todos after searching 
  const filteredTodos = todos.filter((todo) => {
    return todo.task.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // get localStorage data
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // set the todos on localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);




  // set color by checking it's priority
  const getPriorityColor = (priority) =>
    priority === 'high' ? 'bg-danger' : priority === 'middle' ? 'bg-warning' : priority === 'low' ? 'bg-success' : '';



  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-10">
            <h2 className='text-center mb-5 text-light'><b>Manage Your Tasks with Ease</b><hr /></h2>
            {/* Adding and searching form */}
            <div className="row">
              {/* Adding Task */}
              <div className="col-md-7">
                <form>
                  <div className="mb-3 d-flex gap-2">
                    <input name='task' type="text" className="form-control" style={{ height: "50px" }} value={newTodo.task} onChange={handleInputChange} placeholder='Write your next task......' />
                    <select name='priority' className='form-control' value={newTodo.priority} onChange={handleInputChange}>
                      <option selected>Select priority</option>
                      <option value="high">High priority</option>
                      <option value="middle">Middle priority</option>
                      <option value="low">Low priority</option>
                    </select>
                    <button type='button' className='btn btn-sm btn-primary px-3' onClick={addTodo}>Add</button>
                  </div>
                </form>
              </div>
              {/* Searching Task */}
              <div className="col-md-5">
                <form>
                  <div className="mb-3 d-flex">
                    <input type="text" placeholder='Search your task' className='form-control' style={{ height: "50px" }} value={searchTerm} onChange={searchTodo} />
                  </div>
                </form>
              </div>
            </div>
            {/* Table */}
            <div className="card">
              <div className="card-header p-3">
                <h5 className="mb-0"><i className="fas fa-tasks me-2"></i>Your All Tasks List</h5>
              </div>
              <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "400px" }}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTodos.map((todo, index) => {
                      return (
                        <tr className="fw-normal" key={index}>
                          <td className="align-middle">
                            {editIndex === index ? (
                              <input type="text" name="task" value={editedTodo.task} onChange={(e) => setEditedTodo({ ...editedTodo, task: e.target.value })} className='form-control' />
                            ) : (
                              <span>{todo.task}</span>
                            )}
                          </td>
                          <td className="align-middle">
                            {editIndex === index ? (
                              <select name="priority" value={editedTodo.priority} onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value })} className='form-control'>
                                <option value="high">High priority</option>
                                <option value="middle">Middle priority</option>
                                <option value="low">Low priority</option>
                              </select>
                            ) : (
                              <h6 className="mb-0"><span className={`badge ${getPriorityColor(todo.priority)}`}>{todo.priority}</span></h6>
                            )}
                          </td>
                          <td className="align-middle">
                            {editIndex === index ? (
                              <>
                                <button className="btn btn-sm btn-primary mx-2 my-1" onClick={saveEditedTodo}>Save</button>
                                <button className="btn btn-sm btn-danger mx-2 my-1" onClick={() => setEditIndex(null)}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-sm btn-warning mx-2" onClick={() => editTodo(index)}><AiOutlineEdit /></button>
                                <button className="btn btn-sm btn-danger mx-2" onClick={() => deleteTodo(index)}><AiFillDelete /></button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
