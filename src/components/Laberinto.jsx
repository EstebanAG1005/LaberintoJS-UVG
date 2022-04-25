
import {useEffect, useState, useCallback} from 'react'
import Jugador from './Jugador.jsx'
import Pared from '../../public/Imagenes/Wall.png'
import Knuckles from '../../public/Imagenes/Knuckles.gif'
import audio from '../../public/audio/Musica.mp3'
import Piso from '../../public/Imagenes/Piso.png'

const w=5
const h=5
const b=50
const Laberinto = ({setGanar}) =>{

    const loadMaze = async () => {
        
        let fet = "https://maze.juanelcaballo.club/?type=json&w="+width+"&h="+height
        
        const response = await fetch(fet)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setLaberinto([...response])
    
    }

    const [laberinto, setLaberinto] = useState([])
    const [x, setX] = useState(1)
    const [y, setY] = useState(1)
    const [width, setWidth] = useState(w)
    const [height, setHeight] = useState(h)
    const [Imagen, setImagen] = useState('Normal')
    const sound = new Audio(audio)

    const dimensionWidth = () =>{
        const widthValue = document.getElementById('ancho').value
        const newWidth = parseInt(widthValue)
        setWidth(newWidth)
        setX(1)
        setY(1)
    }
    const dimensionHeight = () =>{
        const heightValue = document.getElementById('alto').value
        const newHeight = parseInt(heightValue)
        setHeight(newHeight)
        setX(1)
        setY(1)
    }
    

    useEffect(loadMaze,[])

    useEffect( () => {
        sound.play()
        sound.loop = true
        sound.volume = 0.2
    }, [])
    
    const handleKeyDown = (e)=> {
        if (e.key === "ArrowRight") {
            setImagen('Derecha')
            if(laberinto[y][x+1]===' '||laberinto[y][x+1]==='p'||laberinto[y][x+1]==='g'){
                setX(x+1)
            }
        }
        if (e.key === "ArrowLeft") {
            setImagen('Izquierda')
            if(laberinto[y][x-1]===' '||laberinto[y][x-1]==='p'||laberinto[y][x-1]==='g'){
                setX(x-1)
            }
        }
        if (e.key === "ArrowUp") {
            setImagen('Arriba')
            if(laberinto[y-1][x]===' '||laberinto[y-1][x]==='p'||laberinto[y-1][x]==='g'){
                setY(y-1)
            }
        }
        if (e.key === "ArrowDown") {
            setImagen('Abajo')
            if(laberinto[y+1][x]===' '||laberinto[y+1][x]==='p'||laberinto[y+1][x]==='g'){
                setY(y+1)
            }
        }
    }
    const style = {
        width: `${((width+1)+(width*2))*b}px`,
        height: `${b*((height+1)+(height))}px`,
        background: 'green',
        display: 'grid',
        gridTemplate: `repeat(${(width+1)+(width*2)},${b}px)/repeat(${(height+1)+(height)},${b}px)`
    }
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        marginBottom:'20px',
    }
    const titleStyle = {
        fontSize: '30px',
        fontFamily:'arial',
        color: 'red'
    }
    const settingsStyle = {
        marginLeft: '200px',
        fontFamily: 'arial',
        background:'white',
        padding:'0  px'
    }
    const pared = {
        width: `${b}px`,
        height: `${b}px`,
        background: 'black',
        gridColumnStart: x+1,
        gridRowStart: y+1
    }
   
    
    return (
    <div  onKeyDown={handleKeyDown} tabIndex = "0">
        <div style={containerStyle}>
            <h1 style={titleStyle}>Sonic</h1>
            <div style={settingsStyle} >
                <h4>Ancho:</h4>
                <input type="number" id="ancho" name="quantity" min="3" max="10" placeholder={width}></input>
                <input value='Guardar' type="submit" onClick={dimensionWidth} ></input>
                <h4>Alto:</h4>
                <input type="number" id="alto" name="quantity" min="3" max="10" placeholder={height}></input>
                <input value='Guardar' type="submit" onClick={dimensionHeight}></input>  
                <br/>
                <br/>
                <button onClick={loadMaze}>Recargar laberinto</button>
            </div>

            

        </div>
        <div style={style}>
          {laberinto.map((row,rowIndex)=>{
            return row.map((column,columnIndex)=>{
                if(column==='-' || column==='+'||column==='|'){
                    return <div key={`${columnIndex}-${rowIndex}`} x={columnIndex} y={rowIndex} css = {{backgroundImage: `url(${Pared})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                }
                if(column==='p'){
                    return <Jugador key={'player'} Imagen={Imagen}             
                    />
                    
                }
                if(column===' '){
                    return <div key={`${columnIndex}-${rowIndex}`} x={columnIndex} y={rowIndex} css = {{backgroundImage: `url(${Piso})`, height: '50px', width: '50px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                }
                if(column==='g'){
                    return <div key={`${columnIndex}-${rowIndex}`} x={columnIndex} y={rowIndex} css = {{backgroundImage: `url(${Knuckles})`, height: '50px', width: '50px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}/>
                }
                else{
                    return null
                }
                
            })
        })}  
        </div>
    </div>
    )
    
}

export default Laberinto