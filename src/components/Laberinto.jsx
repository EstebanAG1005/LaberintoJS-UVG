
import {useEffect, useState, useCallback} from 'react'
import Jugador from './Jugador.jsx'
import pared from '../../public/Imagenes/Wall.png'
import goal from '../../public/Imagenes/Knuckles.gif'
import audio from '../../public/audio/Musica.mp3'
import columna from '../../public/Imagenes/Piso.png'

const Laberinto = ({setGano}) => {

    const sound = new Audio(audio)
    const [laberinto, setLaberinto] = useState([])
    const [estado, setEstado] = useState('Normal')
    const [height, setHeight] = useState(4)
    const [width, setWidth] = useState(4)
    let win = false

    const getMaze = async () => {
        
        let fet = "https://maze.juanelcaballo.club/?type=json&w="+width+"&h="+height
        
        const response = await fetch(fet)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setLaberinto([...response])
    
    }



    const getlistener = useCallback ((event) => {

        if(!win){  
            const key = event.key;
            setLaberinto((oldState)=>{

                let x = oldState.findIndex((row) => row.indexOf('p') > -1)
                let y = oldState[x].indexOf('p')

                const newL = [...oldState]

                switch (key) {
                
                    case "ArrowLeft":
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
                            win = true
                            setTimeout(() => {sound.pause(); setGano(true)}, 3000)
                            
                        }
                        
                        break;
                    case "ArrowRight":
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
                            win = true
                            setTimeout(() => {sound.pause(); setGano(true)}, 3000)
                            
                        }
                        break;
                    case "ArrowUp":
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
                            win = true
                            setTimeout(() => {sound.pause(); setGano(true)}, 3000)
                            
                        }
                        break;
                    case "ArrowDown":
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
                            win = true
                            setTimeout(() => {sound.pause(); setGano(true);}, 3000)
                            
                        }
                        break;

                }
                return newL
            })
        }
        
    }, [])

    useEffect( () => {
        getMaze()
        document.addEventListener("keydown",  getlistener)
        
        sound.play()
        sound.loop = true
        sound.volume = 0.2
    }, [])

    return (
        <div css = {{
            width: '100%',
            height: '100%',
            backgroundColor: '#E6833A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}>

            <div css ={{
                color: 'white',
                textAlign: 'center',
                width: '100%',
                paddingTop: '20px'
                
            }}>
                <h1>Cowboy's Maze</h1>
            </div>

            <div css = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                border: '0px',
                paddingBottom: '10px'
            }}
            >
                <input css={{marginRight: '10px', backgroundColor: '#FF9E59', border: '0px', borderRadius: '5px'}} placeholder={'Altura'} onChange={(e) => setHeight(e.target.value)} value={height}></input>
                <input css={{marginRight: '10px', backgroundColor: '#FF9E59', border: '0px', borderRadius: '5px'}} placeholder={'Ancho'} value={width} onChange={(e) => setWidth(e.target.value)}></input>
                <button css={{color: 'white', marginRight: '10px', backgroundColor: '#994D17', border: '0px', borderRadius: '5px'}} onClick={()=>{ getMaze()}}>Actualizar</button>
            </div>
            
            <div css ={{
                display: 'inline-block',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:'center',
                width: '80vw',
                height: '500px',
                backgroundColor: '#F7943E',
                padding: '20px',
                overflow: 'scroll'
            }}>
                
            {
                laberinto.map((row, i) => {
                        
                    return (
                        <div key = {i} css= {{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                        {
                            row.map((element, i2) => {


                                if(element === '+' || element === '-' || element === '|' ){
                                    
                                    return (
                                        <div key = {i2} css = {{backgroundImage: `url(${pared})`, height: '50px', width: '50px', backgroundSize: 'contain'}}/>
                                    )
                                    
                                }if(element === 'p'){
                                    
                                    return (
                                        <Jugador key={'player'} estado={estado} />
                                    )
                                }if(element === 'g'){
                                    
                                    return (
                                        <div key = {i2} css = {{backgroundImage: `url(${goal})`, height: '50px', width: '50px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}/>
                                    )
                                }
                                else{
                                    return (
                                        <div key = {i2} css = {{ height: '50px', width: '50px', border: '10px'}}/>
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