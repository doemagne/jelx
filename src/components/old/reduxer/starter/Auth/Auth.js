import { useDispatch } from 'react-redux';
import classes from './Auth.module.css';
import { signin } from '../../../../../store/redux/slice/AuthSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const authHandler = (e) => {
    e.preventDefault();
    dispatch(signin());
  }
  //extra commetn before commiting.
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={authHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
