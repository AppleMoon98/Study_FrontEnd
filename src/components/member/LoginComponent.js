import { useState } from "react"
import useCustomLogin from "../../hooks/useCustomLogin"

const initState = {
    email: '',
    pw: ''
}

const LoginComponent = () => {
    const [loginParam, setLoginParam] = useState({ ...initState })
    const { doLogin, moveToPath } = useCustomLogin()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({ ...loginParam })
    }

    const handleClickLogin = (e) => {
        doLogin(loginParam)
            .then(data => {
                console.log(data)
                if (data.error)
                    alert("이메일 혹은 패스워드가 일치하지 않습니다.")
                else {
                    alert("Login")
                    moveToPath('/')
                }
            })
    }

    return (
        <div className="border-2 border-green-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-green-500">LOGIN</div>
            </div>


            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">email</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="email"
                        type="text"
                        value={loginParam.email}
                        onChange={handleChange} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pw"
                        type="password"
                        value={loginParam.pw}
                        onChange={handleChange} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-3/5 bg-blue-500 text-xl text-white" onClick={handleClickLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;