import { redirect, useNavigate } from "react-router-dom";
import Player from '../Player/Player';
import UserNavigation from './UserNavigation/UserNavigation';
import UserSounds from './UserSounds/UserSounds';
import { useEffect, useState } from 'react';
import { $authHost } from "../../http";

export default function UserProfile(props) {  

  const [categories, setCategories] = useState([])
  const [choosedCategory, setChoosedCategory] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.isAuth) {
      navigate("/authorization")
    } else {
    $authHost.get('/category/getAllUserCategory')
      .then((res)=> {
        setCategories(res.data)
        if (res.data.length === 0) {
          setChoosedCategory(null)
        } else {
          setChoosedCategory(res.data[0])
        }
      })
    }
  }, [])
  

  if (!props.isAuth) {
    return (undefined)
  } else
    return (
    <div className='flex flex-col h-full bg-slate-300 text-white'>
      <div className='flex grow w-full'>
        <UserNavigation setChoosedCategory={setChoosedCategory} choosedCategory={choosedCategory} categories={categories}/>
        <UserSounds choosedCategory={choosedCategory}/>
      </div>
      <div>
        <Player />
      </div>
    </div>
  );
}
