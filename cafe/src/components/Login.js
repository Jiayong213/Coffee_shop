import { useState } from 'react';
import './Login.css';


function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div className= 'login-component'>
            <h2> Login </h2>
            <form>
                <div>
                   <label htmlFor="username">username
                   <input
                     type="text"
                     id="username"
                     value={username}
                     autoComplete="username"
                     onChange={(e) => setUsername(e.target.value)}
                     required
                />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">Password
                    <input
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;