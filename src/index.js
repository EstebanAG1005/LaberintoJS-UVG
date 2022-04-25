import React from 'react'
import Laberinto from './components/Laberinto.jsx'
import Title from '../public/Imagenes/start-button.gif'
import Win from '../public/Imagenes/Win.gif'

import { useState } from 'react'
import {createRoot} from 'react-dom/client'


const App = () => {

    const [play, setPlay] = useState(false)
    const [gano, setGano] = useState(false)

    return (
        <div css = {{
            width: '100vw',
            height: '100vh',

        }}>
            {
                gano ? 
                    <div css = {{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#E6833A',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                    
                        <div css = {{backgroundImage: `url(${Win})`, height: '400px', width: '700px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', marginTop:'10px'}}/>
                        <button css={{color: 'white', marginTop: '40px', backgroundColor: '#994D17', border: '0px', borderRadius: '5px', alignSelf: 'center', width: '200px', height: '60px'}} onClick={()=>{ setGano(!gano); setPlay(!play)}}>Reiniciar</button>
                    </div>
                :
                    play ?
                    <div css={{
                        height: '100vh',
                        width: '100vw'
                    }}>
                        <Laberinto setGano={setGano} gano={gano}/>
                    </div>
                    :
                    <div css = {{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#E6833A',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                       
                        <div css = {{backgroundImage: `url(${Title})`, height: '400px', width: '700px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', marginTop:'10px'}}/>
                        <button css={{color: 'white', marginTop: '40px', backgroundColor: '#994D17', border: '0px', borderRadius: '5px', alignSelf: 'center', width: '200px', height: '60px'}} onClick={()=>{ setPlay(!play)}}>Empezar</button>
                    </div>
                
            }
            
            
        </div>
    )
}


const container = document.getElementById('app');
const root = createRoot(container)
root.render(<App tab="home" />)