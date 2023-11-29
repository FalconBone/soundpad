import { redirect, useNavigate } from "react-router-dom";
import Player from '../Player/Player';
import UserNavigation from './UserNavigation/UserNavigation';
import UserSounds from './UserSounds/UserSounds';
import React, { useEffect, useState } from 'react';
import { $authHost } from "../../http";

export default function UserProfile(props) {  

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [choosedCategory, setChoosedCategory] = useState()
  const [currentSound, setCurrentSound] = useState(null)
  const navigate = useNavigate()

  const clickOnUserSound = async (soundId) => {
    await $authHost.post('sound/get', {id: soundId}, {responseType: 'blob'})
      .then((res) => {
        let blob = new Blob([res.data], { type: "audio/mp3" })
        let downloadUrl = window.URL.createObjectURL(blob);
        const audio = new Audio(downloadUrl)
        audio.load()
        audio.play()
        setCurrentSound(audio)
        // console.log(blob);
      })
  }

  useEffect(() => {
    console.log('Сработал useEffect UserPRofile');
    if (!props.isAuth) {
      navigate("/authorization")
    } else {
      const fetchData = async () => {
        await $authHost.get('/category/getAllUserCategory')
          .then((res) => {
            setCategories(res.data)
            if (res.data.length === 0) {
              setChoosedCategory(null)
            } else {
              setChoosedCategory(res.data[0])
            }
            navigate(`/category?id=${res.data[0].id}`)
            setIsLoading(false)
          })  
      }
      fetchData()
    }

  }, [])

  const user = <React.Fragment>
    <div className='flex grow w-full'>
    <UserNavigation setChoosedCategory={setChoosedCategory} choosedCategory={choosedCategory} categories={categories} />
    <UserSounds setCurrentSound={clickOnUserSound}/>
  </div>
    <div>
      <Player />
    </div>
  </React.Fragment>

  if (!props.isAuth) {
    return (undefined)
  } else
    return (
    <div className='flex flex-col h-full bg-slate-300 text-white'>
      {isLoading ? undefined : user}
    </div>
  );
}
