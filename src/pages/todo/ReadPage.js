import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {
    const { tno } = useParams()

    return (
        <div className="font-extrabold p-4 w-full bg-white">
            <div className="text-2xl">
                Todo Read Page Component... {tno}
                <div>
                    <ReadComponent tno={tno} />
                </div>
            </div>
        </div>
    )
}

export default ReadPage;