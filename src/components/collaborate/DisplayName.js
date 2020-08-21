import React, {Fragment} from 'react';

const DisplayName = (props) => {
  return(
    <Fragment>
      <label htmlFor="nameBox" className="srOnly">
        Change your name here, max 12 characters
      </label>

      <input
        type="text"
        id="nameBox"
        className="displayNameInput"
        maxLength="12"
        value={props.displayName}
        onBlur={props.handleNameBlur}
        onChange={props.handleNameChange}
        onSubmit={props.handleNamePreventDefault} />
    </Fragment>
  )
}

export default DisplayName;