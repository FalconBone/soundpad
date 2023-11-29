import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registration } from "../../http/userapi"


export default function RegistrationPage(props){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onClickSignUp = async () => {
        console.log("Хочу зарегистрироваться");
        const data = await registration(email, password)
        props.setUser(data)
        props.setIsAuth(true)
        navigate('/')
    }
    

    return (
        <form className="bg-gray-400 w-1/3 mx-auto my-24 flex flex-col p-4">
            <h1 className="text-center mb-8 mt-4">Регистрация</h1>
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
                value={password}/>
            <button onClick={onClickSignUp} type="button"> Зарегистрироваться</button>
            <div>
                <span>Уже есть аккаунт? </span>
                <Link to='/authorization'>
                    <button type="button">Авторизоваться</button>
                </Link>
            </div>

        </form>
    )
}