import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const productsRouter = () => {
    const Loading = <div>Loding.......</div>
    const ProductsList = lazy(() => import("../pages/products/ListPage"))
    const ProductAdd = lazy(() => import("../pages/products/AddPage"))
    const ReadPage = lazy(() => import("../pages/products/ReadPage"))
    const ModifyPage = lazy(() => import("../pages/products/ModifyPage"))

    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductsList /></Suspense>
        },
        {
            path: "",
            element: <Navigate replace to="/products/list" />
        },
        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><ReadPage/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><ProductAdd/></Suspense>
        },
        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><ModifyPage/></Suspense>
        }
    ]
}

export default productsRouter