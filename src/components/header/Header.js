import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  return(
    <header>

        <button className="mobileHamburger" onClick={props.handleMenuClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
    
        <h1>Cohort</h1>

    </header>
  )
}


export default Header;