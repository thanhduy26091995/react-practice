import { createContext, useContext, useState } from "react";
import "./App.css"
import { useOnlineStatus } from "./custom-hook";

export default function UseContextExampleApp() {
    return (
        <>
            <UpdateValueViaContextApp />

            <UpdateObjectViaContextApp />

            <StatusBar/>
        </>
    );
}

function StatusBar() {
    const isOnline = useOnlineStatus();

    return (
        <h1>
            {isOnline ? '✅ Online' : '❌ Offline'}
        </h1>
    );
}

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

function UpdateObjectViaContextApp() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <LoginButton />
        </CurrentUserContext.Provider>
    );
}

function LoginButton() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    if (currentUser !== null) {
        return <p>
            You logged in as {currentUser.name}.
        </p>
    }

    return (
        <button onClick={() => setCurrentUser({ name: 'Advika' })}>
            Log in as Advika
        </button>
    );
}

function UpdateValueViaContextApp() {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={theme}>
            <Form />

            <label>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}>
                </input>

                Use dark mode
            </label>
        </ThemeContext.Provider>
    );
}

function Form({ children }) {
    return (
        <Panel title="Welcome">
            <Button children="Sign Up" />
            <Button children="Log in" />
        </Panel>
    );
}

function Panel({ title, children }) {
    const theme = useContext(ThemeContext);
    const className = 'panel-' + theme;

    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}

function Button({ children }) {
    const theme = useContext(ThemeContext);
    const className = 'button-' + theme;

    return (
        <button className={className}>
            {children}
        </button>
    );
}