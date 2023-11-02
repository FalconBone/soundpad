import { useEffect, useState } from "react";
import { $authHost } from "../../../http";

export default function UserSounds(props) {

  const [sounds, setSounds] = useState([])
  

  useEffect(() => {
    if (props.choosedCategory) {
      $authHost.post('category/getCategorySound/')
        .then((res) => {
          setSounds(res.data)
      })
    }
  })

  const [drag, setDrag] = useState(false)
  let style;
  if (drag) {
    style = "h-full w-full bg-zinc-600"
  } else {
    style = "h-full w-full bg-zinc-900"
  }

  let dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  let dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  let onDropHandler = e => {
    e.preventDefault()

    let files = [...e.dataTransfer.files]
    const formData = new FormData()
    let badFiles = []

    files.forEach((file,index) => {
      const type = file.name
                .split('.')
                .filter(Boolean)
                .slice(1)
                .join('.')
      if (type !== 'wav' && type !== 'mp3') {
        badFiles.push({name: file.name, message: 'Неподдерживаемый тип файла'})
      } else if (file.size > 400000) {
        badFiles.push({name: file.name, message: 'Слишком высокий размер файла'})
      } else {
        formData.append(`sound${index}`, file)
      }
    });

    console.log(formData);
    $authHost.post('/sound/add', formData)
    

    setDrag(false)
  }

  return (
    <div className="bg-zinc-900 grow overflow-y-scroll p-6">
      <table
        className={style}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)}
        onDrop={e => onDropHandler(e)}>
        <tr>
          <th>
            Номер
          </th>
          <th>
            Тег
          </th>
          <th>
            Длительность
          </th>
          <th>
            Клавиша
          </th>
        </tr>
      </table>
    </div>
  );
}
