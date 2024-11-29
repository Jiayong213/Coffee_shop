import Thumbnail from './Thumbnail';
import {itemImages} from '../items';
import { Outlet } from 'react-router-dom';
import './Details.css';

   
function Details({items}){
   return (
    
    <div className="details-component">
        <Outlet />
            <div>
                 {/* display item */}
            </div>
        <div className="details-component-sidebar">
          {items.map((item) => (
            <Thumbnail
               key = {item.itemId}
               image={itemImages[item.itemId]}
               title={item.title}
               itemId={item.itemId}
            />

           ))}
        </div>
    </div>

   );

}

export default Details;