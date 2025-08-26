import { useRef, useState } from "react"
import { postAdd } from "../../api/productsApi"

const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
}

const AddComponent = () => {
    const [product, setProduct] = useState({ ...initState })
    const uploadRef = useRef()
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({ ...product })
    }

    const handleClickAdd = (e) => {
        console.log(product)

        const files = uploadRef.current.files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++)
            formData.append("files", files[i]);

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        console.log(formData)
        postAdd(formData)
    }

    return (
        <div className="border-2 border-green-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-x"
                        name="pdesc" type={'text'} value={product.pdesc} onChange={handleChangeProduct} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={product.price} onChange={handleChangeProduct} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">files</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        multiple={true} type={'file'} ref={uploadRef} onChange={handleChangeProduct} />
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={handleClickAdd}>ADD</button>
            </div>
        </div>
    )
}

export default AddComponent