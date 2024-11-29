import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound(){
    return (
        <div className="not-fiund-component">
            <h1>404 Not Found</h1>
            <Link to="/">Return to Home</Link>
        </div>
    );
}

export default NotFound;