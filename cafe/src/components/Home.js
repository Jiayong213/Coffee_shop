import Thumbnail from './Thumbnail';
import {itemImages} from '../items';
import './Home.css';

   
function Home({items}){
   return (
    
        <div className="home-component">
        {items.map((item) => (
          <Thumbnail
            key = {item.itemId}
            itemId={item.itemId}
            image={itemImages[item.itemId]}
            title={item.title}

            />

        ))}
        </div>

   );

}

export default Home;