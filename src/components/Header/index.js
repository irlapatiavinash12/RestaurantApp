import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {IoCartOutline} from 'react-icons/io5'

import {useContext} from 'react'

import Cookie from 'js-cookie'

import RestaurantContext from '../../context/RestaurantContext'

const Header = props => {
  const {cartList} = useContext(RestaurantContext)
  console.log(cartList)
  const renderCartIcon = () => (
    <button className="cart-icon-container" data-testid="cart">
      <IoCartOutline className="cart-sizing" />
      <p className="cart-count">{cartList.length}</p>
    </button>
  )

  const onLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="nav-header">
      <Link to="/" className="link-styling">
        <h1 className="logo-heading">UNI Resto Cafe</h1>
      </Link>
      <Link to="/cart" className="link-styling">
        <div className="cart-compartment">
          <p className="my-orders-text">My Orders</p>

          {renderCartIcon()}
        </div>
      </Link>
      <button type="button" className="logout-button" onClick={onLogout}>
        LogOut
      </button>
    </header>
  )
}

export default withRouter(Header)
