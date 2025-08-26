import { useParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

const ReadPage = () => {
    const { pno } = useParams()

    return (
        <div className="font-extrabold p-4 w-full bg-white">
            <div className="text-2xl">
                Products Read Page Component... {pno}
                <div>
                    <ReadComponent pno={pno} />
                </div>
            </div>
        </div>
    )
}

export default ReadPage;