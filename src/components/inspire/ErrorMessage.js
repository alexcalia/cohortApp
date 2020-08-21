import React from 'react';

const ErrorMessage = (props) => {
    return(
        <p className={props.errorClasses}>Please enter a message before sending.</p>
    )
}

export default ErrorMessage;