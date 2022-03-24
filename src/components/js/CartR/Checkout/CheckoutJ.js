import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const CheckoutJ = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        housenum: true,
        suburb: true,
        name: true,
        country: true,
        street: true,
        city: true,
        postalCode: true,
      });
    
      const housenumInputRef = useRef();
      const suburbInputRef = useRef();
      const countryInputRef = useRef();
      const nameInputRef = useRef();
      const streetInputRef = useRef();
      const postalCodeInputRef = useRef();
      const cityInputRef = useRef();
    
      const confirmHandler = (event) => {
        event.preventDefault();
    
        const enteredName = nameInputRef.current.value;
        const enteredHouseNum = housenumInputRef.current.value;
        const enteredSuburb = suburbInputRef.current.value;
        const enteredCountry = countryInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
    
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredHouseNumIsValid = !isEmpty(enteredHouseNum);
        const enteredSuburbIsValid = !isEmpty(enteredSuburb);
        const enteredCountryIsValid = !isEmpty(enteredCountry);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    
        setFormInputsValidity({
          suburb: enteredSuburbIsValid,
          housenum: enteredHouseNumIsValid,
          country: enteredCountryIsValid,
          name: enteredNameIsValid,
          street: enteredStreetIsValid,
          city: enteredCityIsValid,
          postalCode: enteredPostalCodeIsValid,
        });
    
        const formIsValid =
          enteredHouseNumIsValid &&
          enteredSuburbIsValid &&
          enteredCountryIsValid &&
          enteredNameIsValid &&
          enteredStreetIsValid &&
          enteredCityIsValid &&
          enteredPostalCodeIsValid;
    
        if (!formIsValid) {
          return;
        }
    
        props.onConfirm({
          name: enteredName,
          housenum: enteredHouseNum,
          suburb: enteredSuburb,
          country: enteredCountry,
          street: enteredStreet,
          city: enteredCity,
          postalCode: enteredPostalCode,
        });
      };
    
    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
      }`;
      const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
      }`;
      const postalCodeControlClasses = `${classes.control} ${
        formInputsValidity.postalCode ? '' : classes.invalid
      }`;
      const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
      }`;
    const housenumControlClasses = `${classes.control} ${
        formInputsValidity.housenum ? '' : classes.invalid
      }`;
    const suburbControlClasses = `${classes.control} ${
        formInputsValidity.suburb ? '' : classes.invalid
      }`;
    const countryControlClasses = `${classes.control} ${
        formInputsValidity.country ? '' : classes.invalid
      }`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid valid.</p>}
        </div>
        <div className={housenumControlClasses}>
          <label htmlFor='housenum'>House Number</label>
          <input type='text' id='housenum' ref={housenumInputRef} />
          {!formInputsValidity.housenum && <p>Please enter a valid house number.</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef} />
          {!formInputsValidity.street && <p>Please enter a valid country.</p>}
        </div>
        <div className={suburbControlClasses}>
          <label htmlFor='suburb'>Suburb</label>
          <input type='text' id='suburb' ref={suburbInputRef} />
          {!formInputsValidity.suburb && <p>Please enter a valid suburb.</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef} />
          {!formInputsValidity.city && <p>Please enter a valid city.</p>}
        </div>
        <div className={countryControlClasses}>
          <label htmlFor='country'>Country</label>
          <input type='text' id='country' ref={countryInputRef} />
          {!formInputsValidity.country && <p>Please enter a valid country.</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalCodeInputRef} />
          {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
};

export default CheckoutJ
/*
          {!formInputsValidity.street && <p>Please enter a valid house number!</p>}
          {!formInputsValidity.street && <p>Please enter a valid street!</p>}
          {!formInputsValidity.postalCode && (<p>Please enter a valid postal code (5 characters long)!</p>)}
          {!formInputsValidity.city && <p>Please enter a valid city!</p>}
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
  <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
*/