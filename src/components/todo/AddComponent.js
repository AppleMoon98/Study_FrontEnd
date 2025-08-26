import { useState } from "react"
import { postAdd } from "../../api/todoApi"
import ResultModal from "../common/ResultModal"
import useCustomMove from "../../hooks/useCustomMove"

const initState = {
    title: '',
    writer: '',
    dueDate: ''
}

const AddComponent = () => {
    const [todo, setTodo] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({ ...todo })
    }

    const handleClickAdd = () => {
        postAdd(todo).then(result => {
            setResult(result.TNO)
            setTodo({ ...initState })
        }).catch(e => {
            console.error(e)
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToList()
    }

    return (
        <div className="border-2 border-green-100 mt-10 m-2 p-4">

            {result ? <ResultModal title={'등록 성공'} content={`${result}번 글을 성공적으로 등록했습니다.`} callbackFn={closeModal} /> : null}

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">title</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={todo.title} onChange={handleChangeTodo} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">writer</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="writer" type={'text'} value={todo.writer} onChange={handleChangeTodo} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">dueDate</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="dueDate" type={'date'} value={todo.dueDate} onChange={handleChangeTodo} />
                </div>
            </div>
            <div className="flex justify-end">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={handleClickAdd}>등록하기</button>
            </div>
        </div>
    )
}

export default AddComponent