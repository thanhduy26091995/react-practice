import { useEffect, useRef, useState } from "react";
import { createConnection } from "./chat";
import { FadeInAnimation } from "./animation";
import { useChatRoom } from "./use-chat-room";
import Map from "./map";

export default function UseEffectExampleApp() {
    return (
        <NonReactWidgetApp />
    );
}

function NonReactWidgetApp() {
    const [zoomLevel, setZoomLevel] = useState(0);
    return (
        <>
            Zoom Level: {zoomLevel}X
            <button onClick={() => setZoomLevel(zoomLevel + 1)}>
                +
            </button>

            <button onClick={() => setZoomLevel(zoomLevel - 1)}>
                -
            </button>

            <Map zoomLevel={zoomLevel} />
        </>
    );
}

function TriggerAnimationApp() {
    const ref = useRef(null);

    useEffect(() => {
        const animation = new FadeInAnimation(ref.current);
        animation.start(1000);


        return () => {
            animation.stop();
        }
    }, []);

    return (
        <h1 ref={ref} style={{
            opacity: 0,
            color: 'white',
            padding: 50,
            textAlign: 'center',
            fontSize: 50,
            backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
        }}>
            Welcome
        </h1>
    );
}

function GlobalBrowserEventDefaultHook() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        function handleMove(e) {
            setPosition({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener('pointermove', handleMove);
        return () => {
            window.removeEventListener('pointermove', handleMove);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            backgroundColor: 'pink',
            borderRadius: '50%',
            opacity: 0.6,
            transform: `translate(${position.x}px, ${position.y}px)`,
            pointerEvents: 'none',
            left: -20,
            top: -20,
            width: 40,
            height: 40
        }}>

        </div>
    );
}

function ChatRoomDefaultHook() {
    const [roomId, setRoomId] = useState('general');
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <label>
                Choose the chat room: {' '}
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Travel">Travel</option>
                    <option value="Music">Music</option>
                </select>
            </label>

            <button onClick={() => setShowDialog(!showDialog)}>
                {showDialog ? 'Close chat' : 'Open chat'}
            </button>

            {showDialog && <hr />}
            {showDialog && <ChatRoom roomId={roomId}></ChatRoom>}
        </>
    );
}

function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    // useEffect(() => {
    //     const connection = createConnection(serverUrl, roomId);
    //     connection.connect();

    //     return () => {
    //         connection.disconnect();
    //     };
    // }, [serverUrl, roomId]);

    useChatRoom({ serverUrl, roomId });

    return (
        <>
            <label>
                Server URL: {' '}
                <input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)}></input>
            </label>

            <h1>
                Welcome to the {roomId} room
            </h1>
        </>
    );
}