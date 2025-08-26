import { useEffect, useState } from "react"
import { getOne, getOneImage } from "../../api/productsApi"
import useCustomMove from "../../hooks/useCustomMove"

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    delflag: false
}

const makeDiv = (title, value) =>
    <div className="flex justify-center">
        <div className="relative mb-4 w-full flex flex-wrap items-stretch text-lg">
            <div className="w-1/5 p-6 text-right font-bold">{title}</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{value}</div>
        </div>
    </div>

const ReadComponent = ({ pno }) => {
    const [products, setProducts] = useState(initState)
    const { moveToList, moveToModify } = useCustomMove()

    useEffect(() => {
        getOne(pno).then(data => {
            console.log(data)
            setProducts(data)
        })
    }, [pno])

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('번호', products.pno)}
            {makeDiv('작성자', products.pdesc)}
            {makeDiv('제목', products.pname)}
            {makeDiv('가격', products.price)}
            <div className="flex justify-center">
                <div className="relative mb-4 w-full flex flex-wrap items-stretch text-lg">
                    {products.uploadFileNames && products.uploadFileNames.length > 0 ? (
                        products.uploadFileNames.map((fileName, ord) => (
                            <img className="w-1/2" key={ord} src={getOneImage(fileName)} alt={`${products.pname}-${ord}`}/>
                        ))) 
                    : (<div className="text-gray-400 p-4">이미지가 없습니다</div>)}
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList()}>List</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => moveToModify(pno)}>Modify</button>
            </div>
        </div>
    )
}

export default ReadComponent;