import axios from 'axios';
import './Cart.css';
import Alert from './Alert';

import ItemType from '../types/item';
import PropTypes from 'prop-types';
import CartRow from './CartRow';
import { useRef, useState } from 'react';


function Cart({ cart, dispatch, items }){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [isEmployeeOfTheMonth, setIsEmployeeOfTheMonth] = useState(false);
  const {showSuccessAlert, setshowSuccessAlert} = useState(false);
  const {apiError, setApiError} = useState('');
  const debounceRef = useRef(null);

  const subtotal = isEmployeeOfTheMonth ? 0 : cart.reduce((acc, item) => {
      const detailItem = items.find((i) => i.itemId === item.itemId);
      const itemPrice = detailItem.salePrice ?? detailItem.price;
      return item.quantity * itemPrice + acc;
  }, 0);
  
    // const subtotal = cart.reduce((acc, item) => {
    //     const detailItem = items.find((i) => i.itemId === item.itemId);
    //     const itemPrice = detailItem.salePrice ?? detailItem.price;
    //     return item.quantity * itemPrice + acc;
    // }, 0);

    const taxPercentage = parseInt(zipCode.substring(0,1) || '0', 10) +1;
    const taxRate = taxPercentage / 100;
    const tax = subtotal * taxRate;
    const total =subtotal + tax;
    const isFormValid = zipCode.length === 5 && name.trim();

     const submitOrder = async (event) => {
      event.preventDefault();
      try{
      await axios.post('/api/orders',{
        items: cart,
        name,
        phone,
        zipCode,

      });

      setshowSuccessAlert(true);
      //console.log('Order submitted');
      // console.log('name:' ,name);
      // console.log('phone:' ,phone);
      // console.log('zipcode:' ,zipCode);
    } catch (error) {
      console.error('Error submitting order: ', error);
      setApiError(error?.response?.data?.error || 'Unknown Error')
    }
     };

     const onNameChange = (newName) => {
      setName(newName);
      if( debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        axios
        .get(`/api/employees/isEmployeeOfTheMonth?name=${name}`)
        .then((response) => setIsEmployeeOfTheMonth(
          response?.data?.isEmployeeOfTheMonth,
        ))
        .catch((error) => console.error('Error fetching data: ', error));
      },300)
      
    }

    return (
        <div className="cart-component">
          <Alert visible={showSuccessAlert} type="success"> 
            Thank you For your order. 
            </Alert>
            <Alert visible={!!apiError} type="error">
              <p> There was an error submitting your order. </p>
              <p> {apiError} </p>
              <p> Please try again. </p>
            </Alert>
          <h2> Your Cart </h2>
          {cart.length === 0 ? (
            <div> Your cart is empty </div>
          ) : (
            <>
          <table>
            <thead>
                <tr>
                    <th>Quantity</th>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item) => (
                    <CartRow key={item.itemId} cartItem={item} items={items} dispatch={dispatch} />
                ))}
            </tbody>
          </table>
          <div>
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          { zipCode.length === 5 
          ? (
            <>
            <div>
              Tax: ${tax.toFixed(2)}
            </div>
            <div>
              Total: ${total.toFixed(2)}
            </div>
            </>
          ) : (
            <div className="Warning">Enter Zip Code to get total</div>
          )}
          
          <h2> Checkout </h2>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">Name </label>
            <input id="name" type="text" value={name} onChange={ (event) => onNameChange(event.target.value)} required/>
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={phone} onChange={ (event) => setPhone(event.target.value)}/>
            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" type="text" maxLength="5" inputMode="numeric" value={zipCode} onChange={ (event) => setZipcode(event.target.value)}/>
            <button type="submit" disabled={!isFormValid}> Order Now </button>
          </form>
          </>
          )}
        </div>
    );

}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(ItemType).isRequired,

};


export default Cart;