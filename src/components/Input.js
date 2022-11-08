import React from 'react'
import Todo from './Todo'


const Input = () => {
    const [todoList, setTodoList] = React.useState([])
    const [title, setTitle] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [showTask, setShowTask] = React.useState(false)
    const [updatedTitle , setUpdatedTitle] = React.useState('')
    const [updatedDesc , setUpdatedDesc] = React.useState('')


    function getTodo(){
        fetch('https://todo-server-jafi.onrender.com/todos')
        .then(res=> res.json())
        .then(data => setTodoList(data))
    }

    React.useEffect(()=>{
        getTodo()
    }, [])

    React.useEffect(()=>{
        getTodo()
    }, [showTask])

    function addTodo(e){
        e.preventDefault()
        fetch('https://todo-server-jafi.onrender.com/todos', {
            method: "POST",
            body: JSON.stringify({
                'title': title,
                'description': desc
            }),
            headers: {
                "Content-type": 'application/json'
            }
        }).then(res => res.json())
        .then(data => data)
        Array.from(document.querySelectorAll('input')
        ).forEach(
            input=> (input.value = "")
        );
        setTitle('')
        setDesc('')
    }

    function updateTodo(id, e){
        e.preventDefault()
        if(updatedTitle !== '' && updatedDesc !== ''){
            fetch(`https://todo-server-jafi.onrender.com/todos/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    'title': updatedTitle,
                    'description': updatedDesc
                }),
                headers: {
                    "Content-type": 'application/json'
                }
            }).then(res => res.json())
            .then(data => setTodoList(oldTodos => oldTodos.map((oldTodo)=>{
                return oldTodo.id === id ?
                        {...oldTodo, title: data.title, description: data.description} :
                        oldTodo
            })))
            // console.log(updatedTitle)
            // console.log(updatedDesc)
            // console.log(todoList)
            setUpdatedTitle('')
            setUpdatedDesc('')
        }
            Array.from(document.querySelectorAll('input')
            ).forEach(
                input=> (input.value = "")
            );
            
    }


    const allTodoList = todoList.map((todo)=>
        <Todo 
        key={todo.id}
        id={todo.id}
        title={todo.title}
        desc={todo.description}
        todoList={todoList}
        setTodoList={setTodoList}
        setTitle={setUpdatedTitle}
        setDesc={setUpdatedDesc}
        updateTodo={updateTodo}
        getTodo={getTodo}
        />
        )

  return (
    <div className='flex justify-center'>
        <div className=''>
            <span className='flex flex-col w-96 mt-2'>
                <input className='mb-2 p-2 border-2 bg-red-50 border-blue-400 rounded-lg shadow-md' 
                onChange={(event)=>{setTitle(event.target.value)}} placeholder='title' required />
                <input className='mb-1 p-2 border-2 bg-red-50 border-blue-400 rounded-lg shadow-md'
                onChange={(event)=>{setDesc(event.target.value)}} placeholder='Description' required />
                <button type='submit' className='border-2 mt-1 p-2 bg-green-400 shadow-md hover:bg-green-600 rounded-lg font-bold text-gray-700'
                onClick={(title.length > 0) ? addTodo : undefined} >
                    Add Task
                </button>
            </span>
            <button type='submit' className='border-2 mt-2 p-2 font-md bg-blue-200 w-96 hover:bg-blue-400 shadow-md rounded-lg font-bold text-gray-700'
                onClick={()=> setShowTask(!showTask)} >
                    {showTask ? 'Hide Task' : 'Show All Tasks'}
            </button>
            {showTask && <div>
                <h5 className='flex justify-center border-2 rounded-t-md border-black-500 bg-black p-2 text-xs text-white mt-2'
                >{todoList.length > 0 ? 'Your Tasks' : 'No Task'}</h5>
                <ul>
                {allTodoList}
                </ul>
            </div>}
        </div>
    </div>
  )
}

export default Input