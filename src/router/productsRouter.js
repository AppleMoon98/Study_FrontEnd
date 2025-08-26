import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"

const productsRouter = () => {
    const Loding = <div>Loding.......</div>
    const ProductsList = lazy( () => import("../pages/products/ListPage"))
    const ProductAdd = lazy( () => import("../pages/products/AddPage"))

    return[
        {
            path:"list",
            element:<Suspense fallback={Loding}><ProductsList/></Suspense>
        },
        {
            path:"",
            element:<Navigate replace to="/products/list"/>
        },
        {
            path:"add",
            element:<Suspense fallback={Loding}><ProductAdd></ProductAdd></Suspense>
        }
    ]
}

export default productsRouter