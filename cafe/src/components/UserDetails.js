import { Link } from 'react-router-dom';
import Profile from '../images/profile.svg';
import './UserDetails.css';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';


function UserDetails() {
    const currentUser = useContext(CurrentUserContext);
    return(
        <div className="user-details-component">
            {
                currentUser.username
                ?(
                    <div>
                        <img src={Profile} alt="Profile" />
                        <p>{currentUser.username}</p>
                        
                    </div>
                ) : <Link to = "/login" > Log In</Link>
            }

        </div>
    )
}


export default UserDetails;