export default function SoundItem(props) {

    const onClick = () => {
        props.setCurrentSound(props.sound.id)
    }

    return (
        <tr onClick={onClick} className="cursor-pointer">
            <td>
                {props.index}
            </td>
            <td className="pl-2 py-1">
                {props.sound.name}
            </td>
            <td className="pl-2 py-1">
                0:04
            </td>
            <td className="pl-2 py-1">
                F
            </td>
        </tr>
    )
}