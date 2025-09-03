import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";

const Loading = <div>Loading.......</div>
const Main = lazy( ()=> import("../pages/MainPage"))
const About = lazy( ()=> import("../pages/AboutPage"))
const TodoIndex = lazy( ()=> import("../pages/todo/IndexPage"))
const ProductsIndex = lazy( ()=> import("../pages/products/IndexPage"))
const MemberIndex = lazy( () => import("../pages/member/LoginPage"))
const GoogleLoginAPI = lazy( () => import("../components/GoogleLoginAPI"))


const root = createBrowserRouter([
    {
        path:"",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path:"about",
        element: <Suspense fallback={Loading}><About/></Suspense>
    },
    {
        path:"todo",
        element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children: todoRouter()
    },
    {
        path:"products",
        element: <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
        children: productsRouter()
    },
    {
        path:"member",
        element: <Suspense fallback={Loading}><MemberIndex/></Suspense>,
        children: memberRouter()
    },
    {
        path:"test",
        element: <Suspense fallback={Loading}><GoogleLoginAPI/></Suspense>,
    }
])

export default root;