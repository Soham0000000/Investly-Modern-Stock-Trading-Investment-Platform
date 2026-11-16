import React from "react";

function Universe() {
  return (
    <div className="container mt-12" style={{ color: "#424242" }}>
      <div className="row text-center p-12 d-flex  align-items-center justify-content-between">
        <h1 style={{ fontSize: "24px" }}>The Investly Ecosystem</h1>
        <p style={{ fontSize: "16px" }}>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-12">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="zerodhaFundhouse"
            style={{ width: "200px" }}
          />
          <p className="fs-xs mt-5">
            Our asset management venture <br /> that is creating simple and transparent
            index <br /> funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-12">
          <img
            src="media/images/sensibullLogo.svg"
            alt=""
            style={{ width: "200px" }}
          />
          <p className="fs-xs mt-5">
            Options trading platform that lets you <br /> create strategies, analyze
            positions, and examine <br /> data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3 mt-12">
          <img
            src="media/images/tijori.svg"
            alt=""
            style={{ width: "200px" }}
          />
          <p className="fs-xs mt-5">
            Investment research platform <br /> that offers detailed insights on
            stocks, <br /> sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-12">
          <img
            src="media/images/streakLogo.png"
            alt="zerodhaFundhouse"
            style={{ width: "200px" }}
          />
          <p className="fs-xs mt-5">
            Systematic trading platform <br /> that allows you to create and backtest <br />
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-12">
          <img
            src="media/images/smallcaseLogo.png"
            alt=""
            style={{ width: "200px" }}
          />
          <p className="fs-xs mt-5">
            Thematic investing platform <br /> that helps you invest in diversified <br />
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3 mt-12">
          <img
            src="media/images/dittoLogo.png"
            alt=""
            style={{ width: "200px" }}
          />
          <p className="fs-xs mt-5">
            Personalized advice on life <br /> and  health insurance. No spam <br /> and no
            mis-selling.
          </p>
        </div>
        <div>
            <button className='btn btn-solid theme-primary mt-5 fs-lg px-8 fw-medium lh-sm '>Sign up for free</button>

        </div>
            
      </div>

    </div>
  );
}

export default Universe;
