import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove"
import ResultModal from "../common/ResultModal"

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    delflag: false
}

const ModifyComponent = ({ tno }) => {
    const [products, setProducts] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const {moveToList, moveToRead} = useCustomMove()

    const handleChangeProducts = (e) => {
        products[e.target.name] = e.target.value
        setProducts({ ...products })
    }

    const handleChangeProductsComplete = (e) => {
        const value = e.target.value
        products.delflag = (value === 'Y')
        setProducts({...products})
    }

    const handleClickModify = () => {
        putOne(products).then(data => {
            setResult("수정성공")
        })
    }

    const handleClickDelete = () => {
        deleteOne(products).then(data => {
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
        getOne(pno).then(data => {
            console.log(data)
            setProducts(data)
        })
    }, [pno])

    return (
        <div className="border-2 border-green-200 mt-10 m-2 p-4">
            { result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">number</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pno" type={'text'} value={products.pno} disabled/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">pname</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pname" type={'text'} value={products.pname} onChange={handleChangeProducts} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">pdesc</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pdesc" type={'text'} value={products.pdesc} onChange={handleChangeProducts} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">delflag</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2" onChange={handleChangeProductsComplete}
                        value={products.delflag ? 'Y' : 'N'}>
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