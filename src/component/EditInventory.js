import React, { Component } from "react";
import axios from "commons/axios";
import { toast } from "react-toastify";

class EditInventory extends Component {
  state = {
    id: "",
    name: "",
    price: 0,
    tags: "",
    image: "",
    status: "available",
  };

  componentDidMount() {
    const { id, name, image, tags, price, status } = this.props.product;
    this.setState({
      id,
      name,
      image,
      tags,
      price,
      status,
    });
  }

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
    axios.put(`products/${this.state.id}`, product).then((res) => {
      console.log(res.data);
      this.props.close(res.data);
      toast.success("編輯成功！！");
    });
  };

  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then((res) => {
      this.props.deleteProduct(this.state.id);
      this.props.close();
      toast.success("刪除成功！！");
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
              placeholder="Textarea"
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
            <label className="label">存貨狀態</label>
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
              Submit
            </button>
          </div>
          <div className="control">
            <button
              className="button is-danger"
              type="button"
              onClick={this.onDelete}
            >
              Delete
            </button>
          </div>
          <div className="control">
            <button
              className="button"
              type="button"
              onClick={() => this.props.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditInventory;
