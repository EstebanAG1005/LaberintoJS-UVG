import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Laberinto from './components/Laberinto.jsx';
import Start from '../public/Imagenes/start-button.gif';
import Win from '../public/Imagenes/Win.gif';
import Fondo from '../public/Imagenes/Fondo.jpg';

function App() {
  const [play, setPlay] = useState(false);
  const [ganar, setGanar] = useState(false);

  return (
    <div css={{
      width: '100vw',
      height: '100vh',

    }}
    >
      {
                ganar
                  ? (
                    <div css={{
                      width: '100%', height: '100%', backgroundImage: `url(${Fondo})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}
                    >
                      <div css={{
                        backgroundImage: `url(${Win})`, height: '650px', width: '700px', backgroundSize: 'cover', marginTop: '10px',
                      }}
                      />
                    </div>
                  )
                  : play
                    ? (
                      <div css={{ height: '100vh', width: '100vw' }}>
                        <Laberinto setGanar={setGanar} ganar={ganar} />
                      </div>
                    )
                    : (
                      <div css={{
                        width: '100%', height: '100%', backgroundImage: `url(${Fondo})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      }}
                      >
                        <img src={Start} alt="Start" onClick={() => { setPlay(!play); }} />
                      </div>
                    )
}

    </div>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
