import { useLiveQuery } from 'dexie-react-hooks';
import indexdb from '../store/indexdb/indexdb';
import { useCallback, useEffect } from 'react';
import classes from './Account.module.css';
import CardJ from '../components/js/UI/CardJ';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

let acc = {};
let cart = {};
let cartitems = [];
const Account = (props) => {
  const user = useSelector(state => state.user)
  const account = useLiveQuery(() => indexdb.transport.where({ id: 1 }).first());
  const fetchAccount = async () => {
    //const content = account.content;
    console.log(user);
    console.log(account);
    if (account) {
      acc = account.content;
      if (account.content.cart) {
        cart = account.content.cart;
        if (account.content.cartitems) {
          cartitems = account.content.cart.items;
        }
      }
      console.log(acc);
    }
  }
  const fetchTransport = useCallback(async () => {
    fetchAccount()
  }, [])

  useEffect(() => {
    fetchTransport()
  }, []);

  return (
    <>
      {!props.authenticated && <Navigate to="/" />}
      <CardJ>
        <div>
          Account {user.name ? user.name : "You're not authenticated."}
        </div>
      </CardJ>
      <CardJ>
        <section className={classes.profile}>
          <section>
            <div><p>UID:</p><p>{user.uid}</p></div>
            <div><p>Cart UID:</p><p>{acc.cartuid}</p></div>
          </section>
          <section>
            <div><p>Name:</p><p>{user.name}</p></div>
            <div><p>Username:</p><p>{user.username}</p></div>
          </section>
          {user.cart && (
            <section>
              <div><p>Total Items:</p><p>{user.cart.totalItems}</p></div>
              <div><p>Total Amount:</p><p>${user.cart.totalAmount}</p></div>
            </section>
          )}
        </section>
      </CardJ>
      {user.cart && (
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
      )}
    </>
  );
}
//<p>{acc.cart.items[0].merchandise.name}</p>

export default Account;
/*
    <>
      <CardJ>
        <div>
          Account {user.name ? user.name : "You're not authenticated."}
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
*/