import { useDispatch } from 'react-redux';
import { closeNotification } from '../../../../store/redux/slice/UISlice';
import classes from './Notification.module.css';

const Notification = (props) => {
  const dispatch = useDispatch()
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }
  const closeNotificationHandler = () => {
    dispatch(closeNotification())
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <span className='bi bi-x-circle' onClick={closeNotificationHandler}></span>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;