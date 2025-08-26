import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove"
import ResultModal from "../common/ResultModal"

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: 'null',
    complate: false
}

const ModifyComponent = ({ tno }) => {
    const [todo, setTodo] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const {moveToList, moveToRead} = useCustomMove()

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value
        setTodo({ ...todo })
    }

    const handleChangeTodoComplete = (e) => {
        const value = e.target.value
        todo.complate = (value === 'Y')
        setTodo({...todo})
    }

    const handleClickModify = () => {
        putOne(todo).then(data => {
            setResult("수정성공")
        })
    }

    const handleClickDelete = () => {
        deleteOne(todo).then(data => {
            setResult("삭제성공")
        })
    }

    const closeModal = () => {
        if(result === '삭제성공')
            moveToList()
        else
            moveToRead(tno)
    }

    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    }, [tno])

    return (
        <div className="border-2 border-green-200 mt-10 m-2 p-4">
            { result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">number</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="tno" type={'text'} value={todo.tno} disabled/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">writer</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="writer" type={'text'} value={todo.writer} disabled/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">title</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={todo.title} onChange={handleChangeTodo} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">dueDate</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="dueDate" type={'date'} value={todo.dueDate} onChange={handleChangeTodo} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">complate</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2" onChange={handleChangeTodoComplete}
                        value={todo.complate ? 'Y' : 'N'}>
                        <option value='Y'>complate</option>
                        <option value='N'>not complate</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                    onClick={handleClickDelete}>삭제</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={handleClickModify}>수정</button>
            </div>
        </div>
    )
}

export default ModifyComponent;