import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const sumTotalPrice = cartList.reduce(
        (accumulator, currentPrice) =>
          accumulator + currentPrice.price * currentPrice.quantity,
        0,
      )
      console.log(sumTotalPrice)
      return (
        <div className="cart-summery-container">
          <div>
            <h1 className="total-content">
              Order Total : <span className="span">{sumTotalPrice}/-</span>
            </h1>
            <p className="itam-in-cart">{cartList.length} Items in cart</p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
