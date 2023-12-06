import axios from "axios";
import { useEffect, useState } from "react";
import { $authHost } from "../../http";

export default function Player(props) {

  const [soundData, setSoundData] = useState()

  console.log(props);
  useEffect(() => {
    console.log(props.sound?.id);
    if (props.sound?.id) {
      $authHost.post('sound/getInfo', {id: props.sound.id})
      .then((res) => {
        console.log(res);
        setSoundData(res.data)
      })
    }
    
  }, [])

  return (
    <div className="bg-zinc-800 col-span-2 h-36">
      <div>
        Полоска перетаскивания
      </div>
      <div style={{textAlign: 'center', marginBottom: '14px'}}>
        
      </div>
      <div style={{ display: 'flex', border: '1px solid red'}}>
        <div style={{width: '33%'}}>
          Удалить
        </div>
        <div style={{width: '33%', margin: '0 auto', display: 'flex', textAlign: 'center'}}>
          <div style={{width: '33%'}}>
            Назад
          </div>
          <div style={{width: '33%'}}>
            <div style={{width: '50px', height: '50px', backgroundColor: 'red', borderRadius: '50px', margin: '0 auto'}}>

            </div>
          </div>
          <div style={{width: '33%'}}>
            Вперёд
          </div>
        </div>
        <div style={{width: '33%'}}>
          Настройка громкости
        </div>
      </div>
    </div >
  );
}
