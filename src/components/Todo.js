import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Todo = (props) => {
    const [edit, setEdit] = React.useState(false)
    const [editTitle, setEditTitle] = React.useState('')
    const [editDesc, setEditDesc] = React.useState('')

    React.useEffect(()=>{
        props.getTodo()
        if(editTitle.length > 0){
            props.setTitle(editTitle)
        }else{
            props.setTitle(props.title)
        }
        if(editDesc.length > 0){
            props.setDesc(editDesc)
        }else{
            props.setDesc(props.desc)
        }
        props.getTodo()
    }, [editTitle, editDesc])

    function deleteTodo(id){
        fetch(`https://todo-server-jafi.onrender.com/todos/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=> data)
        props.setTodoList(props.todoList.filter((todo)=> todo.id !== id))
    }

  return (
    <div className=''>
        <span className='flex justify-between border-4 border-transparent bg-red-50 shadow-md p-2 text-md w-96'>
            <div>
            <p className='border-0 font-bold text-md pr-1' onChange={(e)=>{props.setTitle(e.target.value)}}
            >{editTitle.length > 0 ? editTitle : props.title}:</p>
            <p className='border-0 text-xs pr-4' onChange={(e)=>{props.setDesc(e.target.value)}}
            >{editDesc.length > 0 ? editDesc : props.desc } </p>
            </div>
            <span className='flex'>
            {edit === false ? <button type='button' className='border-2 border-blue-100 hover:bg-green-400 rounded-lg bg-blue-400 h-6 text-white text-xs
            p-0 mr-2 w-10' onClick={()=> setEdit(!edit)}>Edit</button> :
            <button type='button' className='border-2 border-blue-100 hover:bg-green-400 rounded-lg bg-blue-400 w-12 h-6 text-white text-xs
            p-0 mr-1 w-10' onClick={(e)=> {
                if(editTitle !== '' && editDesc !== ''){
                    props.updateTodo(props.id, e)
                    setEdit(!edit)
                }else{
                    setEdit(!edit)
                }
                }}>Update</button>}
            <span onClick={()=>deleteTodo(props.id)} className='cursor-pointer hover:bg-red-300 h-5'>
            <FontAwesomeIcon icon={faTrashCan} size={'lg'}/>
            </span>
            </span>
        </span>
        {edit && <span>
            <input className='border-2 w-24 rounded-bl-md p-1 shadow-md' placeholder='title'
            onChange={(e)=>{setEditTitle(e.target.value)}}/>
            <input className='border-2 w-72 rounded-br-md p-1 shadow-md' placeholder='description'
            onChange={(e)=>{setEditDesc(e.target.value)}}/>

        </span>}
    </div>
  )
}

export default Todo