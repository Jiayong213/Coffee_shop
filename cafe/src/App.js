import axios from 'axios';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Details from './components/Details';
import DetailItem from './components/DetailItem';
import Cart from './components/Cart';
import Login from './components/Login';

import { cartReducer, CartTypes, initialCartState} from './reducers/cartReducer';
import CurrentUserContext from './contexts/CurrentUserContext';


const storageKey = "cart";

// import {items} from './items';

function App() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cart, dispatch] = useReducer(cartReducer, initialCartState,
    (initialState) => {
      try {
        const storedCart = JSON.parse(localStorage.getItem(storageKey));
        return storedCart || initialState;

      }catch(error){
        console.error('Error loading cart from localStorage', error);
        return initialState;
      }
    }
  );
  const addToCart = (itemId) => dispatch({type: CartTypes.ADD, itemId});

  useEffect( () => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    axios.get('/api/items')
    .then((response) => setItems(response.data))
    .catch((error) => console.error('Error fetching data:', error));
   
  }, []);

  useEffect(() => {
    axios.get('/api/auth/current-user')
    .then((response) => setCurrentUser(response.data))
    .catch((error) => console.error('Error fetching data:', error));

  }, [])

  //const CurrentUserContextValue = { currentUser, setCurrentUser};
  const CurrentUserContextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  return (
    <div>
    <Router>
      <CurrentUserContext.Provider 
         value={CurrentUserContextValue}
      >
      <Header cart={ cart } />
      {items.length === 0 ? <div> Loading...</div>
      :(
      <Routes>
        <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} items={items}/>} />
        <Route path="/details" element={<Details items={items} />} >
           <Route path=":id" element={<DetailItem items={items} dispatch={dispatch} addToCart={addToCart} /> } />
           <Route index element={<h1>No Item Selected</h1>} />
        </Route>
         <Route path="/" element={<Home items={items} /> } />
         <Route path="*" element={<NotFound/>} />
         <Route path="/login" element={<Login/>} />
      </Routes>
      )}
      </CurrentUserContext.Provider>
    </Router> 
    </div>
  );
}

export default App;
