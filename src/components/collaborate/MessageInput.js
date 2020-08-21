import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessageInput = (props)=> {
        return(
                <form action="submit" className={props.form}>
                    <label htmlFor={props.className} className="srOnly">Add a new message</label>
                
                    <input
                        type="text" 
                        id={props.className} 
                        value={props.value}
                        className={props.className}
                        onChange={props.onChange}
                        maxLength="300" />
        
                    <button onClick={props.onClick}><FontAwesomeIcon icon={faPaperPlane} /><span className="srOnly">Click to submit message</span></button>
                </form>
        )
    }

export default MessageInput;