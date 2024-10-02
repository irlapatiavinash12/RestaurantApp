import {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import RestaurantContext from './context/RestaurantContext'

import Home from './components/Home'

import CartPage from './components/CartPage'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// write your code here

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = item => {
    console.log(item)
    const {cartList} = this.state
    const cartItem = cartList.find(eachItem => eachItem.dishId === item.dishId)
    console.log(cartItem)
    if (cartItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
    } else {
      this.setState(prevState =>
        prevState.cartList.map(eachItem =>
          eachItem.id === item.id
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      )
    }
  }

  removeCartItem = item => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(eachItem => eachItem.id !== item.id)
    this.setState({cartList: filteredCart})
  }

  incrementCartItemQuantity = item => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem =>
      eachItem.id === item.id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = item => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem =>
      eachItem.id === item.id
        ? {...eachItem, quantity: eachItem.quantity - 1}
        : eachItem,
    )
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state
    console.log([...cartList])
    return (
      <RestaurantContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={CartPage} />
          </Switch>
        </BrowserRouter>
      </RestaurantContext.Provider>
    )
  }
}

export default App
