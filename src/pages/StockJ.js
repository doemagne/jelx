import { useState } from "react";
import CartJ from "../components/js/Cart/CartJ";
import HeaderJ from "../components/js/Layout/Header/HeaderJ";
import MerchandiseJ from "../components/js/Merchandise/MerchandiseJ";
import CartProvider from "../store/context/CartProvider";

const StockJ = props => {
    const [cartShown,setCartShown] = useState(false);
    const showCartHandler = () => {
        setCartShown(true);
    };
    const hideCartHandler = () => {
        setCartShown(false);
    };
    return (
        <CartProvider>
            {cartShown && <CartJ onClose={hideCartHandler}/>}
            <HeaderJ onShowCart={showCartHandler}/>
            <main>
                <MerchandiseJ/>
            </main>
        </CartProvider>
    );
};

export default StockJ;