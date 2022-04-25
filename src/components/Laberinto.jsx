
import Jugador from './Jugador.jsx'
import pared from '../../public/Imagenes/Wall.png'
import goal from '../../public/Imagenes/Knuckles.gif'
import audio from '../../public/audio/Musica.mp3'
import Piso from '../../public/Imagenes/Piso.png'

import {useEffect, useState, useCallback} from 'react'

const Laberinto = ({setGanar}) => {

    const w=5
    const h=5
    const [laberinto, setLaberinto] = useState([])
    const [estado, setEstado] = useState('Normal')
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

                const newL = [...oldState]

                switch (llave) {
                
                    case "a":
                        setEstado('Izquierda')
                        if(newL[x][y-1] === ' '){
                            newL[x][y] = " "
                            newL[x][y-1] = 'p'
                            y = y-1
                            return newL
                            
                        }else if(newL[x][y-1] === 'g'){
                            newL[x][y] = " "
                            newL[x][y-1] = 'p'
                            y = y-1
                            setEstado('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true)}, 2000)
                            
                        }
                        
                        break;

                    case "d":
                        setEstado('Derecha')
                        if(newL[x][y+1] === ' '){
                            newL[x][y] = " "
                            newL[x][y+1] = 'p'
                            y = y+1
                            return newL
                        }else if(newL[x][y+1] === 'g'){
                            newL[x][y] = " "
                            newL[x][y+1] = 'p'
                            y = y+1
                            setEstado('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true)}, 2000)
                            
                        }
                        break;

                    case "w":
                        setEstado('Arriba')
                        if(newL[x-1][y] === ' '){
                            newL[x][y] = " "
                            newL[x-1][y] = 'p'
                            x = x-1
                            return newL
                        }else if(newL[x-1][y] === 'g'){
                            newL[x][y] = " "
                            newL[x-1][y] = 'p'
                            x = x-1
                            setEstado('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true)}, 2000)
                            
                        }
                        break;
                    
                    case "s":
                        setEstado('Abajo')
                        if(newL[x+1][y] === ' '){
                            newL[x][y] = " "
                            newL[x+1][y] = 'p'
                            x = x+1
                            return newL
                        }else if(newL[x+1][y] === 'g'){
                            newL[x][y] = " "
                            newL[x+1][y] = 'p'
                            x = x+1
                            setEstado('Ganar')
                            victorycon = true
                            setTimeout(() => {setGanar(true);}, 2000)
                            
                        }
                        break;

                }
                return newL
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
        <div css = {{
            width: '100%',
            height: '100%',
            backgroundColor: 'blue',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}>

            <div css ={{
                color: 'white',
                textAlign: 'center',
                width: '100%',
                paddingTop: '10px'
                
            }}>
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
            
            <div css ={{
                display: 'inline-block',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:'center',
                width: '80vw',
                height: '500px',
                backgroundColor: 'blue',
                padding: '20px'
            }}>
                
            {
                laberinto.map((row, i) => {
                        
                    return (
                        <div llave = {i} css= {{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                        {
                            row.map((element, i2) => {


                                if(element === '+' || element === '-' || element === '|' ){
                                    
                                    return (
                                        <div llave = {i2} css = {{backgroundImage: `url(${pared})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                    
                                }if(element===' '){
                                    return (
                                        <div llave = {i2} css = {{backgroundImage: `url(${Piso})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                }if(element === 'p'){
                                    
                                    return (
                                        <Jugador llave={'player'} estado={estado} />
                                    )
                                }if(element === 'g'){
                                    
                                    return (
                                        <div llave = {i2} css = {{backgroundImage: `url(${goal})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                }
                                else{
                                    return (
                                        <div llave = {i2} css = {{ height: '50px', width: '50px', border: '10px'}}/>
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