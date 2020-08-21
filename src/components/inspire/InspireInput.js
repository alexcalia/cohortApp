import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const InspireInput = (props) => {
  return (
    <form action="submit" className={props.form}>
      <label htmlFor={props.className} className="srOnly">Add a new message</label>

      <textarea
        type="text"
        id={props.className}
        value={props.value}
        className={props.className}
        onChange={props.onChange}
        maxLength="500" />

      <button onClick={props.onClick}><FontAwesomeIcon icon={faPaperPlane} /><span className="srOnly">Click to submit message</span></button>
    </form>
  )
}

export default InspireInput;