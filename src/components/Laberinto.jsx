
import Jugador from './Jugador.jsx'
import pared from '../../public/Imagenes/Wall.png'
import goal from '../../public/Imagenes/Knuckles.gif'
import audio from '../../public/audio/Musica.mp3'
import Piso from '../../public/Imagenes/Piso.png'
import Fondo from '../../public/Imagenes/Fondo.jpg'

import {useEffect, useState, useCallback} from 'react'

const Laberinto = ({setGanar}) => {

    const w=5
    const h=5
    const [laberinto, setLaberinto] = useState([])
    const [statej, setState] = useState('Normal')
    const [height, setHeight] = useState(h)
    const [width, setWidth] = useState(w)
    const sound = new Audio(audio)
    let victorycon = false

    const loadMaze = async () => {
        
        let fet = "https://maze.juanelcaballo.club/?type=json&w="+width+"&h="+height
        
        const response = await fetch(fet)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setLaberinto([...response])
    
    }

    const dimensionWidth = () =>{
        const widthValue = document.getElementById('ancho').value
        const newWidth = parseInt(widthValue)
        setWidth(newWidth)
    }
    const dimensionHeight = () =>{
        const heightValue = document.getElementById('alto').value
        const newHeight = parseInt(heightValue)
        setHeight(newHeight)
    }

    const getlistener = useCallback ((event) => {

        if(!victorycon){  

            const llave = event.key;
            
            setLaberinto((oldState)=>{

                let x = oldState.findIndex((row) => row.indexOf('p') > -1)
                let y = oldState[x].indexOf('p')

                const laberinto = [...oldState]

                switch (llave) {
                
                    case "a":
                        setState('Izquierda')
                        if(laberinto[x][y-1] === ' '){
                            laberinto[x][y] = " "
                            laberinto[x][y-1] = 'p'
                            y = y-1
                            return laberinto
                            
                        }else if(laberinto[x][y-1] === 'g'){
                            laberinto[x][y] = " "
                            laberinto[x][y-1] = 'p'
                            y = y-1
                            setState('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true)}, 2000)
                            
                        }
                        
                        break;

                    case "d":
                        setState('Derecha')
                        if(laberinto[x][y+1] === ' '){
                            laberinto[x][y] = " "
                            laberinto[x][y+1] = 'p'
                            y = y+1
                            return laberinto
                        }else if(laberinto[x][y+1] === 'g'){
                            laberinto[x][y] = " "
                            laberinto[x][y+1] = 'p'
                            y = y+1
                            setState('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true)}, 2000)
                            
                        }
                        break;

                    case "w":
                        setState('Arriba')
                        if(laberinto[x-1][y] === ' '){
                            laberinto[x][y] = " "
                            laberinto[x-1][y] = 'p'
                            x = x-1
                            return laberinto
                        }else if(laberinto[x-1][y] === 'g'){
                            laberinto[x][y] = " "
                            laberinto[x-1][y] = 'p'
                            x = x-1
                            setState('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true)}, 2000)
                            
                        }
                        break;
                    
                    case "s":
                        setState('Abajo')
                        if(laberinto[x+1][y] === ' '){
                            laberinto[x][y] = " "
                            laberinto[x+1][y] = 'p'
                            x = x+1
                            return laberinto
                        }else if(laberinto[x+1][y] === 'g'){
                            laberinto[x][y] = " "
                            laberinto[x+1][y] = 'p'
                            x = x+1
                            setState('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true);}, 2000)
                            
                        }
                        break;

                }
                return laberinto
            })
        }
        
    }, [])

    useEffect( () => {
        loadMaze()
        document.addEventListener("keydown",  getlistener)
        
        sound.play()
        sound.loop = true
        sound.volume = 0.4
    }, [])

    return (
        <div css = {{width: '100%', height: '100%', backgroundImage: `url(${Fondo})`,display: 'flex',flexDirection: 'column', alignItems: 'center',justifyContent: 'center', overflowY: 'scroll',overflowX: 'hidden' }}>
            <div css ={{ color: 'white', textAlign: 'center', width: '100%', paddingTop: '10px'}}>
                <h1>Sonic</h1>
            </div>

            <div css = {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '0px', paddingBottom: '10px'}}>
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
            
            <div css ={{ display: 'inline-block', flexDirection: 'column', alignItems: 'center', justifyContent:'center', width: '80vw', height: '500px', padding: '20px'}}>   
            {
                laberinto.map((row,rowIndex) => {
                        
                    return (
                        <div llave = {rowIndex} css= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        {
                            row.map((column,columnIndex) => {


                                if(column === '+' || column === '-' || column === '|' ){
                                    
                                    return (
                                        <div llave = {columnIndex} css = {{backgroundImage: `url(${pared})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                    
                                }if(column===' '){
                                    return (
                                        <div llave = {columnIndex} css = {{backgroundImage: `url(${Piso})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                }if(column === 'p'){
                                    
                                    return (
                                        <Jugador llave={'player'} state={statej} />
                                    )
                                }if(column === 'g'){
                                    
                                    return (
                                        <div llave = {columnIndex} css = {{backgroundImage: `url(${goal})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                }
                                else{
                                    return (
                                        <div llave = {columnIndex} css = {{ height: '50px', width: '50px', border: '10px'}}/>
                                    )
                                }
                                
                            })
                        }
                        </div>
                        
                    )
                    
                })

            }

            </div>
            
        </div>
    )
}

export default Laberinto