import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList, getOneImage } from "../../api/productsApi";
import PageComponent from "../common/PageComponent";
import FetchingModal from "../common/FetchingModal"

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {
    const { page, size, moveToList, moveToRead, refresh } = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [fetching, setFetching] = useState(false)
    useEffect(() => {
        setFetching(true)
        getList({ page, size }).then(data => {
            console.log(data)
            setServerData(data)
            setFetching(false)
        })
    }, [page, size, refresh])
    return (
        <div className="border-2 border-green-100 mt-10 mr-2 ml-2">
            {fetching? <FetchingModal/> : <></>}
            <div className="container flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(products =>
                    <div key={products.pno} className="w-1/3 p-2 m-2 rounded shadow-md"
                        onClick={() => moveToRead(products.pno)}>
                        <div className="font-extrabold text-lg w-1/12">{products.pno} </div>
                        <div className="font-extrabold text-lg w-11/12">{products.pname}</div>
                        <div className="font-extrabold text-base m-1 p-2 w-8/12">
                            <img src={getOneImage(products.uploadFileNames[0])} alt={products.pname} ></img>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
    )
}

export default ListComponent;