import React, { Component } from "react";
import axios from "commons/axios";
export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: this.props.cart.mount,
    };
  }
  handleChange = (e) => {
    const _mount = parseInt(e.target.value);
    this.setState({ mount: _mount });
    const newCart = { ...this.props.cart, mount: _mount };
    axios.put(`/carts/${this.props.cart.id}`, newCart).then((res) => {
      this.props.updateCart(newCart);
    });
  };

  deleteCart = () => {
    axios
      .delete(`/carts/${this.props.cart.id}`)
      .then((res) => this.props.deleteCart(this.props.cart));
  };

  render() {
    const { name, image, price } = this.props.cart || {};
    const sumPrice = this.state.mount * parseInt(price);
    return (
      <div className="columns is-vcentered">
        <div className="column is-narrow" onClick={this.deleteCart}>
          <span className="close">X</span>
        </div>
        <div className="column is-narrow">
          <div className="cart-image">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="column cart-name is-narrow">{name}</div>
        <div className="column">
          <span className="price">${price}</span>
        </div>
        <div className="column">
          <input
            type="number"
            min={1}
            className="input num-input"
            defaultValue={this.state.mount}
            onChange={this.handleChange}
          />
        </div>
        <div className="column">
          <span className="sum-price">${sumPrice}</span>
        </div>
      </div>
    );
  }
}
