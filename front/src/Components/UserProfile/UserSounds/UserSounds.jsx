import { useEffect, useState } from "react";
import { $authHost } from "../../../http";
import SoundItem from "./SoundItem";
import { useLocation, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import classes from './UserSounds.module.css'

export default function UserSounds(props) {

  const [sounds, setSounds] = useState([])
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  
  const getSoundsFormCategory = async () => {
    const fetchedSounds = await $authHost.get(`sound/getCategorySound${search}`)
    console.log(fetchedSounds);
    setSounds(fetchedSounds.data)
  }

  useEffect(() => {
    getSoundsFormCategory()
  }, [])

  const [drag, setDrag] = useState(false)
  let style;
  if (drag) {
    style = "w-full bg-zinc-600 border-collapse"
  } else {
    style = "w-full bg-zinc-900 border-collapse"
  }

  let dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  let dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  let onDropHandler = async e => {
    e.preventDefault()

    let files = [...e.dataTransfer.files]
    console.log(files[0]);
    const formData = new FormData()
    let badFiles = []

    files.forEach((file, index) => {
      const type = file.name
        .split('.')
        .filter(Boolean)
        .slice(1)
        .join('.')
      if (type !== 'wav' && type !== 'mp3') {
        badFiles.push({ name: file.name, message: 'Неподдерживаемый тип файла' })
      } else if (file.size > 400000) {
        badFiles.push({ name: file.name, message: 'Слишком высокий размер файла' })
      } else {
        formData.append(`sound${index}`, file)
      }
    });
    console.log(formData);
    formData.append(`categoryId`, searchParams.get('id'))
    console.log('Данные загружаются');
    await $authHost.post('/sound/add', formData)
      .then((res) => {
        console.log(res);
      })
    console.log('Данные вроде загружены');

    setDrag(false)
    getSoundsFormCategory()

  }

  return (
    <div className="bg-zinc-900 w-full overflow-y-scroll p-6">
      <table
        className={style}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)}
        onDrop={e => onDropHandler(e)}>
        <thead>
          <tr className="text-left">
            <th className="border-r border-white border-solid">
              Номер
            </th>
            <th className="border-r border-white border-solid pl-2">
              Имя
            </th>
            <th className="border-r border-white border-solid pl-2">
              Длительность
            </th>
            <th className=" pl-2">
              Клавиша
            </th>
          </tr>
        </thead>
        <tbody>
          {sounds.map((sound, index) => <SoundItem sound={sound} key={sound.id} index={index + 1} setCurrentSound={props.setCurrentSound} currentSoundId={props.currentSoundId}/>)}
        </tbody>
      </table>
    </div>
  );
}
