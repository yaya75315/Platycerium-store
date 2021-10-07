import React, { Component } from "react";
import axios from "commons/axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Layout from "Layout";
import CartItem from "component/CartItem";

export default class cart extends Component {
  state = {
    carts: [],
  };
  componentDidMount() {
    const user = global.auth.getUser() || {};
    axios.get(`/carts?userId=${user.email}`).then((res) =>
      this.setState({
        carts: res.data,
      })
    );
  }

  totalPrice = () => {
    const totalPrice = this.state.carts
      .map((cart) => cart.mount * parseInt(cart.price))
      .reduce((a, value) => a + value, 0);
    return totalPrice;
  };

  updateCart = (cart) => {
    const newCarts = [...this.state.carts]; //複製新的購物車
    const _index = newCarts.findIndex((c) => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    this.setState({
      carts: newCarts,
    });
  };

  deleteCart = (cart) => {
    const _cart = this.state.carts.filter((c) => c.id !== cart.id);
    this.setState({
      carts: _cart,
    });
  };

  render() {
    return (
      <Layout>
        <div className="cart-page">
          <span className="cart-title">購物車</span>
          <div className="cart-list">
            <TransitionGroup component={null}>
              {this.state.carts.map((cart) => (
                <CSSTransition
                  classNames="cart-item"
                  timeout={300}
                  key={cart.id}
                >
                  <CartItem
                    key={cart.id}
                    cart={cart}
                    updateCart={this.updateCart}
                    deleteCart={this.deleteCart}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          {this.state.carts.length === 0 && (
            <p className="no-cart">還沒有商品，趕快加入購物車吧！</p>
          )}
          <div className="cart-total">
            總額: <span className="total-price">${this.totalPrice()}</span>
          </div>
        </div>
      </Layout>
    );
  }
}
