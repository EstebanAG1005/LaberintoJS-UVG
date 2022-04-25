import Normal from '../../public/Imagenes/Normal.png'
import Abajo from '../../public/Imagenes/Abajo.png'
import Arriba from '../../public/Imagenes/Arriba.png'
import Derecha from '../../public/Imagenes/Derecha.png'
import Izquierda from '../../public/Imagenes/Izquierda.png'
import Ganar from '../../public/Imagenes/Ganar.gif'



import {useState, useEffect} from 'react'

const Jugador = ({estado}) => {

    const [Imagen, setImagen] = useState(null)

    //logica para determinar la animacion del personaje
    useEffect(()=> {
        switch(estado){
            case 'Normal':
                setImagen(Normal)
                break;
            case 'Abajo':
                setImagen(Abajo)
                break;
            case 'Arriba':
                setImagen(Arriba)
                break;
            case 'Derecha':
                setImagen(Derecha)
                break;
            case 'Izquierda':
                setImagen(Izquierda)
                break;
            case 'Ganar':
                setImagen(Ganar)
                break;
            
        }
    },[estado])


    return (
        <div css = {{
            backgroundImage: `url(${Imagen})`, 
            height: '50px', 
            width: '50px', 
            backgroundSize: 'cover', 
            }}/>
    )

}



export default Jugador