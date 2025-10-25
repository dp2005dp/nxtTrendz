import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const checkQuentity = cartList.find(eachItem => eachItem.id === id)

    if (checkQuentity.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updateQuentity = eachItem.quantity - 1
            return {...eachItem, quantity: updateQuentity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updateQuentity = eachItem.quantity + 1
          return {...eachItem, quantity: updateQuentity}
        }
        return eachItem
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const deleteFilter = cartList.filter(erachData => erachData.id !== id)

    this.setState({cartList: deleteFilter})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const checkProductItem = cartList.find(
      eachItem => eachItem.id === product.id,
    )
    if (checkProductItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (checkProductItem.id === product.id) {
            const updateQuentity = product.quantity + eachItem.quantity
            return {...eachItem, quantity: updateQuentity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route  path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

