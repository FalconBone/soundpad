export default function SoundItem(props) {

    const onClick = () => {
        props.setCurrentSound(props.sound.id)
    }

    let style
    if (props.currentSoundId === props.sound.id) {
        style = {backgroundColor: '#4B4B4B'}
    }

    return (
        <tr onClick={onClick} className="cursor-pointer" style={style}>
            <td>
                {props.index}
            </td>
            <td className="pl-2 py-1">
                {props.sound.name}
            </td>
            <td className="pl-2 py-1">
                -
            </td>
            <td className="pl-2 py-1">
                -
            </td>
        </tr>
    )
}