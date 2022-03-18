//import '../../Memos/MemoInput/MemoInput.css';
import React, { useState } from 'react';
import classes from './TextField.module.css';

const TextFieldJ = (props) => {
      let [val, setVal] = useState("");
      const keytrack = (e) => {
        if (e.target.value.trim().length > 0) {
          props.setValid(true);
        } 
        val=e.target.value;
        setVal(val);
        props.setTxt(val);
        console.log(`props.valid ${props.valid}`);

      }
      const fid = `floating${props.txt}`;
        //<div className={`form-floating  form-fl ${props.valid ? '' : 'invalid'}`}>
    return (
        <div className={`${classes['form-floating']+' '+classes['form-fl']}  ${props.valid ? '' : classes['invalid']}`}>
          <input 
          type="text" 
          className={`form-control`} 
          id={fid} 
          placeholder={props.txt} 
          onChange={keytrack}
          value={props.val}
          style={{
            //borderColor: !(props.valid) ? 'red' : '#ced4da',
            //background: !(props.valid) ? '#ff001840' : '#ffffff'
          }}
          />
          <label
          style={{
            //color: !(props.valid) ? 'red' : 'inherit'
          }}
          htmlFor={fid}>
            {props.txt}
          </label>
        </div>
    );
}
export default TextFieldJ;

        /*
          style={{
            borderColor: !(props.valid) ? 'red' : 'inherit',
            background: !(props.valid) ? '#ff001840' : 'inherit'
          }}
          />
          <label
          style={{
            color: !(props.valid) ? 'red' : 'inherit'
          }}
          htmlFor={fid}>
            {props.txt}
          </label>
        </div>
    );
        if (e.target.value.trim().length > 0) {
          setValidEntry(true);
          props.setValid(true);
          validClass = `form-floating form-fl`;
        } else {
          setValidEntry(false);
          props.setValid(false);
          validClass = `form-floating form-fl invalid`;
        }*/
/*

      //let [validClass, setValidClass] = useState("form-floating");
      //let [validEntry, setValidEntry] = useState(true);
        //setValidEntry(props.valid);
        //setValidClass(validClass);
        //console.log(validEntry);
        //validClass = `form-floating form-fl ${!props.valid ? 'invalid': ''}`;
        //validClass = props.nclass;
        //setValidEntry(validClass);
        //props.nclass = `form-floating form-fl invalid`;

          className={`form-control form-floating ${validEntry ? '':'invalid'}`} 
*             
 *          style={{
            color: !(props.valid) ? 'red' : 'inherit'
          }}
 *          style={{
            borderColor: !(validEntry) ? 'red' : 'inherit',
            background: !(validEntry) ? '#ff001840' : 'inherit'
          }}    
 * 
          value={props.val}
 *      style={{
            color: 'red'
          }}
          <input type="text" className="form-control" id={fid} placeholder={props.txt} onChange={e => props.setTxt(e.target.value)}/>
    const [email, setEmail] = useState("");
 * 
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
 */
