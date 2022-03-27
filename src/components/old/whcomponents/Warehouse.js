import WCart from './Cart/WCart';
import Layout from './Layout/Layout';
import Products from './Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';//import { WHCartURL } from '../constraint/ServerURL';
import { ServerURL, WHCartURL } from '../../../constraint/ServerURL';
import { setguid } from '../../../store/redux/slice/WHCartSlice';

let cartuid = '';
function Warehouse() {
  const [uid, setUID] = useState(cartuid);
  const cartToggle = useSelector((state) => state.whui.cartToggle);
  const cart = useSelector((state) => state.whcart);
  const dispatch = useDispatch();

  const fetchCartID = useCallback(//const fetchCartID =
    async () => {
      if (uid.length == 0) {//if (cart.uid.length == 0) {
        const stimulus = await fetch(ServerURL + '/api/cart/register',
          {
            method: 'PUT',//body: JSON.stringify(cart),
            body: JSON.stringify({
              totalItems: cart.totalItems.toString(),
              totalAmount: cart.totalAmount.toString(),
              uid: uid
            }),
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
          });
        const response = await stimulus.json();
        setUID(response.uid);
      } else {//console.log(uid);
        fetch(WHCartURL + '/whcart.json',
          {
            method: 'PUT',//body: JSON.stringify(cart),
            body: JSON.stringify(cart),
          });
        //() => {//const fetchCartID = () => {
        return;
      }
    }, [uid]);//cartuid = uid;

  useEffect(() => {
    if (uid.length == 0 || cart.uid.length == 0) {//if (cart.uid.length == 0) {
      fetchCartID();
      dispatch(setguid(uid));//console.log(cart.uid)
    } else {
      console.log(cart.uid)
      return;
    }
  }, [cart, dispatch]);
  return (
    <Layout>
      {cartToggle && <WCart cuid={cart.uid} />}
      <Products />
      <h2>{cart.uid}</h2>
    </Layout>
  );
}

export default Warehouse;
