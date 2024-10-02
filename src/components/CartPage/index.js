import {Link} from 'react-router-dom'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import {AiFillCloseCircle} from 'react-icons/ai'

import Header from '../Header'

import RestaurantContext from '../../context/RestaurantContext'

import './index.css'

const CartPage = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        removeCartItem,
      } = value
      console.log(cartList)

      const onRemoveAll = () => {
        removeAllCartItems()
      }

      const onDecrement = eachItem => {
        decrementCartItemQuantity(eachItem)
      }

      const onIncrement = eachItem => {
        incrementCartItemQuantity(eachItem)
      }

      const onRemove = eachItem => {
        removeCartItem(eachItem)
      }

      return (
        <>
          <Header />
          <div className="cart-contaner-styling">
            {cartList.length === 0 ? (
              <div>
                <h1>No Items In the Cart</h1>
                <img src="url" />
                <Link to="/" className="link-styling-cart">
                  <button className="retry-button">Shop Now</button>
                </Link>
              </div>
            ) : (
              <div>
                <button
                  className="remove-all-button"
                  type="button"
                  onClick={onRemoveAll}
                >
                  Remove All
                </button>
                <ul className="unordered-cart-list-styling">
                  {cartList.map(eachItem => (
                    <li className="list-item-styling">
                      <div>
                        <img
                          className="cart-image-icon"
                          src={eachItem.dishImage}
                        />
                        <img src="dishImage" />
                        <p>dishName</p>
                      </div>
                      <div className="buttons-container">
                        <button
                          type="button"
                          className="buttons"
                          onClick={() => onDecrement(eachItem)}
                        >
                          -
                        </button>
                        <p>{eachItem.quantity}</p>
                        <button
                          type="button"
                          className="buttons"
                          onClick={() => onIncrement(eachItem)}
                        >
                          +
                        </button>
                      </div>
                      <p>{eachItem.dishPrice * eachItem.quantity}</p>
                      <button type="button" onClick={() => onRemove(eachItem)}>
                        <AiFillCloseCircle />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </RestaurantContext.Consumer>
)

export default CartPage
