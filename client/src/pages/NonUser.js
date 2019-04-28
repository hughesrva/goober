import React from "react";

function NonUser() {
  return (
    <div>
      <div className="section">
        <div className="hero is-large">
          <div className="hero-body">
            <div className="content has-text-centered">
              <h1 className="title">
                Oops! You need to log in to see this page.
              </h1>
              <h1 className="title">
                Please <a href="/">click here</a> to log in!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NonUser;
