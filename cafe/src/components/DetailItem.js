import './DetailItem.css';
import { useParams } from 'react-router-dom';
import { itemImages } from '../items';
//import { CartTypes } from '../reducers/cartReducer';



function DetailItem({ addToCart, items}){
    const { id } = useParams();
    const detailItem = items.find((item) => item.itemId === id);

    const addItemToCart = () => {
        //dispatch({ type: CartTypes.ADD, itemId: detailItem.itemId});
        addToCart(detailItem.itemId);
    } 
    return(
        <div className="detail-item-component">
           { detailItem ? (
            <>
              <img
                className="details.image"
                src={itemImages[detailItem.itemId]}
                alt={detailItem.title}
                />
                <h2>{detailItem.title}</h2>
                {detailItem.description && <h6>{detailItem.description}</h6>}
                <div>
                    $
                    {(detailItem.salePrice || detailItem.price).toFixed(2)}
                </div>
                <button type="button" onClick={addItemToCart}>
                    Add to Cart
                </button>
            </>
           ) : <h2> Unknown Item</h2>}
        </div>
    );
}

export default DetailItem;