import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Post({ content, shares, bought, id }) {
	const [price, setPrice] = useState(0);
    fetch(`https://api.worldtradingdata.com/api/v1/stock?symbol=${content}&api_token=VKxjGGsvPJX3SubmL5FZStbEc59Z89QVhWV8lVSiduwUWfT7ThdGdJROJ3BL`)
    .then(response => response.json())
    .then(data => { 
    	setPrice(`${data.data[0].price}`*shares)
    });


  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/posts/"+id}>
          			Stock: { content } 
          			<br/>
          			Number of Shares: {shares}
          			<br/>
          			Price: { price }
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;