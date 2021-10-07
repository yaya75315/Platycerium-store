import React from "react";
import ToolBox from "./ToolBox";
import Product from "./Product";
import axios from "commons/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Panel from "./Panel";
import AddInventory from "./AddInventory";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
  };

  componentDidMount() {
    axios.get("/products").then((response) =>
      this.setState({
        products: response.data,
        sourceProducts: response.data,
      })
    );
    this.updateCartNum();
  }

  search = (text) => {
    console.log(text);
    //複製新的陣列
    let _products = [...this.state.sourceProducts];
    //過濾這個陣列
    _products = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return matchArray !== null;
    });
    //更新陣列
    this.setState({
      products: _products,
    });
  };

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: (data) => {
        if (data) {
          this.add(data);
        }
        console.log(`Product ${data}`);
      },
    });
  };

  add = (product) => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProducts = [...this.state.sourceProducts];
    _sProducts.push(product);
    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  update = (product) => {
    const _products = [...this.state.products];
    const _index = _products.findIndex((p) => p.id === Product.id);
    _products.splice(_index, 1, product);
    const _sProducts = [...this.state.sourceProducts];
    _sProducts.splice(_index, 1, product);

    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  delete = (id) => {
    const _products = this.state.products.filter((p) => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter((p) => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
    console.log(this.state.products);
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({ cartNum: cartNum });
  };

  initCartNum = async () => {
    const user = global.auth.getUser() || {};
    const res = await axios.get("/carts", {
      params: {
        userId: user.email,
      },
    });
    const carts = res.data || [];
    const cartsNum = carts
      .map((cart) => cart.mount)
      .reduce((a, value) => a + value, 0);
    return cartsNum;
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />

        <div className="products">
          {(global.auth.getUser() || {}).type === 1 && (
            <button className="button is-primary add-btn" onClick={this.toAdd}>
              加入新產品
            </button>
          )}
          {/* is-desktop */}
          <div className="columns is-multiline ">
            <TransitionGroup component={null}>
              {this.state.products.map((product) => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={product.id}
                  >
                    <div
                      className="column is-3-desktop is-4-tablet"
                      key={product.id}
                    >
                      <Product
                        product={product}
                        update={this.update}
                        delete={this.delete}
                        key={product.id}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
