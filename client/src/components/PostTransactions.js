import React from 'react';
import { Link } from 'react-router-dom';


function PostTransactions({ content, shares, bought, id }) {

  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/posts/"+id}>
          			Stock: { content } 
          			<br/>
          			Number of Shares: {shares}
          			<br/>
          			Price/Share: { bought }
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostTransactions;