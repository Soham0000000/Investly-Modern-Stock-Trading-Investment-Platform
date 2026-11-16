import React from "react";

const cardStyle = {
  backgroundColor: "white",
  color: "black",
  border: "none",
};
const cardBtn = {
  backgroundColor: "transparent",
  color: "#387ed1",
  border: "none",
  boxShadow: "none",
  outline: "none",
  textDecoration: "none",
  transition: "none",
};

function Trust() {
  
  return (
    <div className="container mt-12">
      <div className="row">
        <h2>Trust with confidence</h2>
        <div className="col-6 col-lg-6 fs-lg">
          <div
            className="card"
            style={cardStyle}
          >
            <div className="card-body">
              <h4 className="card-title">Customer-first always</h4>
              <p className="card-text">
                Investly brings your market activity, portfolio insights, and
                investing tools together in one clear, easy-to-use place.
              </p>
            </div>
          </div>
          <div
            className="card"
            style={cardStyle}
          >
            <div className="card-body">
              <h4 className="card-title">No spam or gimmicks</h4>
              <p className="card-text">
               No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a href="#" style={{textDecoration: "none"}}>Our philosophies.</a>
              </p>
            </div>
          </div>
          <div
            className="card"
            style={cardStyle}
          >
            <div className="card-body">
              <h4 className="card-title">The Investly ecosystem</h4>
              <p className="card-text">
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
              </p>
            </div>
          </div>
          <div
            className="card"
            style={cardStyle}
          >
            <div className="card-body">
              <h4 className="card-title">Do better with money</h4>
              <p className="card-text">
              With initiatives like <a href="#" style={{textDecoration: "none"}}> Nudge</a> and <a href="#" style={{textDecoration: "none"}}>Kill Switch</a> , we don't just facilitate transactions, but actively help you do better with your money.
              </p>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-6 mt-5 ">
          <img
            src="media/images/Trust.png"
            alt="Investly investing tools"
            className="img-fluid"
            style={{ maxWidth: "auto", width: "100%" }}
          />&nbsp;&nbsp;&nbsp;
          <div className="text-center">
            <a href="#" style={{textDecoration: "none"}}>Explore our products<i className="fa-solid fa-arrow-right-long"></i></a> &nbsp; &nbsp;&nbsp;
            <a href="#" style={{textDecoration: "none"}}>Try Kite demo<i className="fa-solid fa-arrow-right-long"></i></a>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Trust;
