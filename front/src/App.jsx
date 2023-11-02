import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import AuthorizationPage from "./Components/Authorization/AuthorizationPage";
import { useEffect, useState } from "react";
import { checkAuth } from "./http/userAPI";
import RegistrationPage from "./Components/Authorization/RegistrationPage";

export default function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    checkAuth()
      .then(data => {
        if (data) {
          setUser(data) 
          setIsAuth(true)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  console.log(isLoading);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserProfile user={user} isAuth={isAuth}/>
    },
    {
      path: '/authorization',
      element: <AuthorizationPage setUser={setUser} setIsAuth={setIsAuth}/>
    },
    {
      path: '/registration',
      element: <RegistrationPage setUser={setUser} setIsAuth={setIsAuth}/>
    }
  ])

  return (
    <div className="h-screen">
      {isLoading ? undefined : <RouterProvider router={router}/>}
    </div>
  );
}
