import { useLiveQuery } from 'dexie-react-hooks';
import indexdb from '../../store/indexdb/indexdb';
import { useEffect } from 'react';
import classes from './Account.module.css';
import CardJ from '../../components/js/UI/CardJ';
import { useSelector } from 'react-redux';

let acc = {};
let cart = {};
let cartitems = [];
const Account = (props) => {
  const user = useSelector(state => state.user)
  const account = useLiveQuery(() => indexdb.transport.where({ id: 1 }).first());
  const fetchAccount = async () => {
    //const content = account.content;
    console.log(user);
    //console.log(account);
    if (account) {
      acc = account.content;
      cart = account.content.cart;
      cartitems = account.content.cart.items;
      console.log(acc);
    }
  }

  //useEffect(() => {
  fetchAccount();
  //}, [account]);


  return (
    <>
      <CardJ>
        <div>
          Account {acc.name ? acc.name : "You're not authenticated."}
        </div>
      </CardJ>
      <CardJ>
        <section className={classes.profile}>
          <section>
            <div><p>UID:</p><p>{acc.uid}</p></div>
            <div><p>Cart UID:</p><p>{acc.cartuid}</p></div>
          </section>
          <section>
            <div><p>Name:</p><p>{acc.name}</p></div>
            <div><p>Username:</p><p>{acc.username}</p></div>
          </section>
          <section>
            <div><p>Total Items:</p><p>{cart.totalItems}</p></div>
            <div><p>Total Amount:</p><p>${cart.totalAmount}</p></div>
          </section>
        </section>
      </CardJ>
      <section className={classes.cart}>
        <ul>
          <div className={classes.cartitem}>
            {cartitems.map((item) => (
              <li className={classes.listitem} key={item.merchandise.id}>
                <div>
                  <CardJ>
                    <div style={{ width: "5%" }}> {item.merchandise.id}</div>
                    <div style={{ width: "20%" }}> {item.merchandise.name}</div>
                    <div style={{ width: "60%" }}> {item.merchandise.description}</div>
                    <div style={{ width: "10%" }}>$ {item.merchandise.price}x {item.quantity}</div>
                    <div style={{ width: "5%" }}>$ {item.total}</div>
                  </CardJ>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </section>
    </>
  );
}
//<p>{acc.cart.items[0].merchandise.name}</p>



export default Account;