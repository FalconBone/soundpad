import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { checkAuth, login } from "../../http/userapi"

export default function Authorization(props){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onClickSignIn = async () => {
        const data = await login(email, password)
        props.setUser(data)
        props.setIsAuth(true)
        navigate('/')
    }

    return (
        <form className="bg-gray-400 w-1/3 mx-auto my-24 flex flex-col p-4">
            <h1 className="text-center mb-8 mt-4">Авторизация</h1>
            <input
                placeholder="Почта"
                className="mb-4"
                type="email"
                onChange={(e) => onChangeEmail(e)}
                value={email}/>
            <input
                placeholder="Пароль"
                className="mb-4"
                type="password"
                onChange={(e) => onChangePassword(e)}
                value={password} />
            <button onClick={onClickSignIn} type="button">Войти</button>
            <div>
                <span>Ещё нет аккаунта? </span>
                <Link to='/registration'>
                    <button>Присоединитесь сейчас</button>
                </Link>
            </div>

        </form>
    )
}