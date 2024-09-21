import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Profile />

      <div>
        <EngineerList />
      </div>
    </>
  )
}

export default Stopwatch

const user = {
  name: 'Dennis Bui',
  avatar: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSise: 90
};

const engineers = [
  {
    title: 'Dennis Bui',
    role: 'Senior Mobile Developer',
    id: 1
  },
  {
    title: 'Harland Nguyen',
    role: 'Senior Mobile Developer',
    id: 2
  },
  {
    title: 'John Pham',
    role: 'Senior Mobile Developer',
    id: 3
  },
  {
    title: 'Leo',
    role: 'Senior Mobile Developer',
    id: 4
  }
];

export function EngineerList() {
  function onNameClick(title) {
    // alert('You have clicked on: ' + title);
    setCount(count + 1);
  }

  const [count, setCount] = useState(0);

  const listEngineer = engineers.map(engineer =>
    <li
      key={engineer.id}
    >
      <div style={{
        alignItems: 'start',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className='title' onClick={() => onNameClick(engineer.title)} style={{ cursor: 'pointer' }}>
          {engineer.title}
        </div>
        <div className='title'>
          {engineer.role}
        </div>
        <p>
          Count time: {count}
        </p>
      </div>
    </li>
  );

  return (
    <ul>{listEngineer}</ul>
  );
}

export function Profile() {
  return (
    <>
      <p>
        {user.name}
      </p>

      <img className='avatar' src={user.avatar} style={
        { width: user.imageSise, height: user.imageSise, borderRadius: user.imageSise / 2 }
      } />
    </>
  )
}

function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>

      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}