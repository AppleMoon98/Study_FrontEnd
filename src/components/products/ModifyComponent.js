import { useEffect, useRef, useState } from "react";
import { deleteOne, getOne, putOne, getOneImage } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove"
import ResultModal from "../common/ResultModal"
import FetchingModal from "../common/FetchingModal"

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    delflag: false,
    uploadFileNames: []
}

const ModifyComponent = ({ pno }) => {
    const [products, setProducts] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { moveToList, moveToRead } = useCustomMove()
    const [fetching, setFetching] = useState(false)
    const uploadRef = useRef()

    const handleChangeProducts = (e) => {
        products[e.target.name] = e.target.value
        setProducts({ ...products })
    }

    const handleChangeProductsComplete = (e) => {
        const value = e.target.value
        products.delflag = (value === 'Y')
        setProducts({ ...products })
    }

    const handleClickModify = () => {
        const files = uploadRef.current.files
        const formDate = new FormData()
        for (let i = 0; i < files.length; i++) {
            formDate.append("files", files[i]);
        }

        formDate.append("pname", products.pname)
        formDate.append("pdesc", products.pdesc)
        formDate.append("price", products.price)
        formDate.append("delFlag", products.delflag)

        for (let i = 0; i < products.uploadFileNames.length; i++) {
            formDate.append("uploadFileNames", products.uploadFileNames[i])
        }

        setFetching(true)

        putOne(formDate, products.pno).then(data => {
            setResult("수정성공")
        })
    }

    const handleClickDelete = () => {
        deleteOne(products).then(data => {
            setResult("삭제성공")
        })
    }

    const deleteOldImages = (imageName) => {
        const resultFileNames = products.uploadFileNames.filter(fileName => fileName !== imageName)
        products.uploadFileNames = resultFileNames
        setProducts({ ...products })
    }

    const closeModal = () => {
        if (result === '삭제성공')
            moveToList({ page: 1 })
        else
            moveToRead(pno)
        setResult(null)
    }

    useEffect(() => {
        setFetching(true)
        getOne(pno).then(data => {
            console.log(data)
            setProducts(data)
            setFetching(false)
        })
    }, [pno])

    return (
        <div className="border-2 border-green-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal /> : <></>}
            {result ? <ResultModal title={`${result}`} content={'정상적으로 처리되었습니다.'} callbackFn={closeModal} /> : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">number</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pno" type={'text'} value={products.pno} disabled />
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
                    <div className="w-1/5 p-6 text-right font-bold">price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="price" type={'number'} value={products.price} onChange={handleChangeProducts} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">delflag</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2" onChange={handleChangeProductsComplete}
                        value={products.delflag ? 'Y' : 'N'}>
                        <option value='Y'>delflag</option>
                        <option value='N'>not delflag</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">FILES</div>
                    <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" type={'file'} multiple={true} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">IMAGE</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {products.uploadFileNames.map((imgFile, i) =>
                            <div className="flex justify-center flex-col w-1/3" key={i}>
                                <button className="bg-red-500 text-3xl text-white" onClick={() => deleteOldImages(imgFile)}>DELETE</button>
                                <img alt="img" src={getOneImage(imgFile)} />
                            </div>
                        )}
                    </div>
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