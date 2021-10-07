import React from "react";
import Panel from "component/Panel";
import EditInventory from "./EditInventory";
import axios from "commons/axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router";

class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete,
      },
      callback: (data) => {
        console.log(data);
        if (data) {
          this.props.update(data);
        }
      },
    });
  };

  addCart = async () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.info("請先登入");
      return;
    }

    try {
      const { id, name, image, price } = this.props.product;
      const res = await axios.get(`/carts?productId=${id}`);
      const carts = res.data;
      const user = global.auth.getUser() || {};

      const result = carts
        .map((item, i) => {
          return item.userId;
        })
        .indexOf(user.email);

      if (carts && result > -1 && carts.length > 0) {
        const cart = carts[result];
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          userId: user.email,
          mount: 1,
        };
        await axios.post("/carts", cart);
      }
    } catch {
      toast.error("加入購物車失敗！");
    }
    this.props.updateCartNum();
    toast.success("加入購物車成功！");
  };

  renderMangerBtn = () => {
    const user = global.auth.getUser() || {};

    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };

  render() {
    const { name, tags, image, price, status } = this.props.product;
    const _pClass = {
      available: "product",
      unavailable: "product out-stock",
    };
    return (
      <div className={`${_pClass[status]} "`}>
        <div className="p-content">
          {this.renderMangerBtn()}
          <div className="img-wrapper">
            <div className="out-stock-text">已 完 售</div>
            <figure className="image is-4by3">
              <img src={image} alt={name} />
            </figure>
            <p className="p-tags">{tags}</p>
            <p className="p-name">{name}</p>
          </div>
        </div>
        <div className="p-footer">
          <p className="price">${price}</p>
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
