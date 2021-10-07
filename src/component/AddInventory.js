import React, { Component } from "react";
import axios from "commons/axios";
import { toast } from "react-toastify";

class AddInventory extends Component {
  state = {
    name: "",
    price: 0,
    tags: "",
    image: "",
    status: "available",
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const product = { ...this.state };
    axios.post("products", product).then((res) => {
      console.log(res.data);
      this.props.close(res.data);
      toast.success("新增成功！！");
    });
  };

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">貨品資訊</p>

        <div className="field">
          <div className="control">
            <label className="label">商品名稱</label>
            <textarea
              className="textarea"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">商品價格</label>
            <input
              type="number"
              className="input"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">附註</label>
            <input
              type="text"
              className="input"
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">圖片路徑</label>
            <input
              type="text"
              className="input"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Status</label>
            <div className="select is-fullwidth">
              <select
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>有庫存</option>
                <option>無庫存</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-link" onClick={this.submit}>
              確認
            </button>
          </div>
          <button
            className="button"
            type="button"
            onClick={() => this.props.close()}
          >
            取消
          </button>
        </div>
      </div>
    );
  }
}

export default AddInventory;
