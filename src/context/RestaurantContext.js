import React from 'react'

const RestaurantContext = React.createContext({
  cartlist: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default RestaurantContext
