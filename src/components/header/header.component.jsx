import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { createStructuredSelector } from 'reselect';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <div>{currentUser?currentUser.displayName:''}</div>
        <Link className='logo-container' to="/">
            <Logo/>
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/contact">
                CONTACT
            </Link>
            {currentUser?
            <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
            :
            <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {hidden?
            null
            :
            <CartDropdown/>
        }
    </div>

);

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  hidden:selectCartHidden
});

export default connect(mapStateToProps)(Header);