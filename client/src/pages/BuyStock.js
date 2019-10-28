import React from 'react';
import { Redirect } from 'react-router-dom';

class BuyStock extends React.Component {
  state = {
    error: false,
    success: false,
    ticker: '',
    shares: 0,
    stock: null,
  }

  contentChanged = (event) => {
    this.setState({
      ticker: event.target.value
    });
  }
  sharesChanged = (event) => {
    this.setState({
      shares: event.target.value
    });
  }

  getStock = (event) => {
      fetch(`https://api.worldtradingdata.com/api/v1/stock?symbol=${this.state.ticker}&api_token=VKxjGGsvPJX3SubmL5FZStbEc59Z89QVhWV8lVSiduwUWfT7ThdGdJROJ3BL`)
    .then(response => response.json())
    .then(data => { // Prints result from `response.json()` in getRequest
        this.setState({stock: {content: `${data.data[0].symbol}`,shares: `${this.state.shares}`, bought:`${data.data[0].price}`}});
        console.log(this.state.stock);
    }).then(this.buyStock);
  }  

  buyStock = (event) => {    
        fetch("/api/posts/", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.stock),
        })
      .then(res => {
        if(res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        })
      });
  }  
    

  render() {
    if(this.state.success) return <Redirect to="/" />;

    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error buying the stock."
        </div>
      );
    }

    return (
      <div className="col-10 col-md-8 col-lg-7">
        { errorMessage }
        <div className="input-group">
        <label>Buy Stock: </label>
          <input 
            type="text" 
            placeholder="Enter a Stock Ticker" 
            value={this.state.ticker}
            className="form-control mr-3 rounded"
            onChange={this.contentChanged}
            required
          />
          <br/>
        <label>Shares: </label>
          <input 
            type="number" 
            placeholder="1" 
            value={this.state.shares}
            className="form-control mr-3 rounded"
            onChange={this.sharesChanged}
            required
          />
          <button className="btn btn-primary" onClick={this.getStock}>Buy Stock</button>
        </div>
      </div>
    );
  }
}

export default BuyStock;