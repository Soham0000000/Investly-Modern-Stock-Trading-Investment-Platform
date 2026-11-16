import React from "react";
function Footer() {
  return (
    <div
      className="container opacity-75 my-12 border-top"
      style={{ color: "#424242" }}
    >
      <div className="row mt-12">
        <div className="col">
          <img
            className="opacity-1"
            src="media/images/investly.png"
            style={{ width: "50%" }}
            alt="logo"
          />
          <br />
          <br />
          <p className="fs-xs">
            {" "}
            © 2010 - 2026, Zerodha Broking Ltd.
            <br />
            All rights reserved.
          </p>
          <div className="icons border-bottom border-muted ">
            <ul className="d-flex gap-4 justify-content-start">
              <li style={{ listStyle: "none" }}>
                <i class="fa-brands fa-x-twitter"></i>
              </li>
              <li style={{ listStyle: "none" }}>
                <i class="fa-brands fa-square-facebook"></i>
              </li>
              <li style={{ listStyle: "none" }}>
                <i class="fa-brands fa-instagram"></i>
              </li>
              <li style={{ listStyle: "none" }}>
                <i class="fa-brands fa-linkedin-in"></i>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 mt-5">
            <a href="#" className="store-badge">
              <img
                src="media/images/googleplayBadge.svg"
                alt="Get it on Google Play"
              />
            </a>

            <a href="#" className="store-badge">
              <img
                src="media/images/appstoreBadge.svg"
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>
        <div className="col">
          <p className="fs-lg fw-semibold">Account</p>
          <li style={{ listStyle: "none" }}>
            {" "}
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Open demat account
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Minor demat account
            </a>
          </li>{" "}
          <br />
          <li style={{ listStyle: "none" }}>
            {" "}
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              NRI demat account
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}></li>{" "}
          <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
            HUF demat account
          </a>
          <br />
          <li style={{ listStyle: "none" }}>
            {" "}
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Commodity
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            {" "}
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Dematerialisation
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Fund transfer
            </a>
          </li>{" "}
          <br />
          <li style={{ listStyle: "none" }}>
            {" "}
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              MTF
            </a>
          </li>
        </div>
        <div className="col">
          <ul>
            <p className="fs-lg fw-semibold">Support</p>
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Contact us
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Support portal
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                How to file a complaint?
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Status of your complaints
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Bulletin
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Circular
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Z-Connect blog
              </a>
            </li>
            <br />
            <li style={{ listStyle: "none" }}>
              <a href="" style={{ textDecoration: "none", color: "#424242" }}>
                Downloads
              </a>
            </li>
            <br />
          </ul>
        </div>
        <div className="col">
          <p className="fs-lg fw-semibold">Company</p>
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              About
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Philosophy
            </a>{" "}
          </li>{" "}
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Press & media
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Careers
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Zerodha Cares (CSR)
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Zerodha.tech
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Open source
            </a>
          </li>{" "}
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Referral program
            </a>
          </li>
          <br />
        </div>
        <div className="col mb-12">
          <p className="fs-lg fw-semibold">Quick links</p>
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Upcoming IPOs
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Brokerage charges
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Market holidays
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Economic calendar
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              Calculators
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Markets
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Sectors
            </a>
          </li>
          <br />
          <li style={{ listStyle: "none" }}>
            <a href="#" style={{ textDecoration: "none", color: "#424242" }}>
              {" "}
              Gift Nifty
            </a>
          </li>
          <br />
        </div>
      </div>
      <div className="text-muted">
        <p className="fs-xs">
          Zerodha Broking Limited: Member of NSE, BSE, MCX & MSEI – SEBI
          Registration no.: INZ000031633 CDSL/NSDL: Depository services through
          Zerodha Broking Limited – SEBI Registration no.: IN-DP-431-2019, CIN:
          U65929KA2018PLC116815, Registered Address: #153/154, 4th Cross,
          Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase,
          Bengaluru - 560078, Karnataka, India. For any complaints pertaining to
          securities broking please write to{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            complaints@zerodha.com
          </a>
          , for DP related to{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            dp@zerodha.com
          </a>
          . Please ensure you carefully read the Risk Disclosure Document as
          prescribed by SEBI | ICF
        </p>

        <p className="fs-xs">
          Procedure to file a complaint on{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            SEBI SCORES/SMARTODR{" "}
          </a>
          : Register on SCORES portal & SMARTODR. Mandatory details for filing
          complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID.
          Benefits: Effective Communication, Speedy redressal of grievances
        </p>

        <p className="fs-xs">
          <a href="#" style={{ textDecoration: "none" }}>
            Smart Online Dispute Resolution{" "}
          </a>{" "}
          |{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Grievances Redressal Mechanism{" "}
          </a>
          |{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Project Jagrook by SEBI{" "}
          </a>
          <br />
          <br />
          Investments in securities market are subject to market risks; read all
          the related documents carefully before investing.
        </p>

        <p className="fs-xs">
          Attention investors: 1) Stock brokers can accept securities as margins
          from clients only by way of pledge in the depository system w.e.f
          September 01, 2020. 2) Update your e-mail and phone number with your
          stock broker / depository participant and receive OTP directly from
          depository on your e-mail and/or mobile number to create pledge. 3)
          Check your securities / MF / bonds in the consolidated account
          statement issued by NSDL/CDSL every month.
        </p>

        <p className="fs-xs">
          India's largest broker based on networth as per NSE.{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            NSE broker factsheet
          </a>{" "}
        </p>

        <p className="fs-xs">
          "Prevent unauthorised transactions in your account. Update your mobile
          numbers/email IDs with your stock brokers/depository participants.
          Receive information of your transactions directly from
          Exchange/Depositories on your mobile/email at the end of the day.
          Issued in the interest of investors. KYC is one time exercise while
          dealing in securities markets - once KYC is done through a SEBI
          registered intermediary (broker, DP, Mutual Fund etc.), you need not
          undergo the same process again when you approach another
          intermediary." Dear Investor, if you are subscribing to an IPO, there
          is no need to issue a cheque. Please write the Bank account number and
          sign the IPO application form to authorize your bank to make payment
          in case of allotment. In case of non allotment the funds will remain
          in your bank account. As a business we don't give stock tips, and have
          not authorized anyone to trade on behalf of others. If you find anyone
          claiming to be part of Zerodha and offering such services, please{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            create a ticket here
          </a>
          .
        </p>

        <p className="fs-xs">
          *Customers availing insurance advisory services offered by Ditto
          (Tacterial Consulting Private Limited | IRDAI Registered Corporate
          Agent (Composite) License No CA0738) will not have access to the
          exchange investor grievance redressal forum, SEBI SCORES/ODR, or
          arbitration mechanism for such products.
        </p>

        <p className="fs-xs">
          Fixed deposit products offered on this platform are third-party
          products (TPP) and are not Exchange traded products. These are offered
          through Blostem Fintech Private Limited. Zerodha Broking Limited (SEBI
          Registration No.: INZ000031633) is acting solely as a distributor for
          these products. Any disputes arising with respect to such distribution
          activity will not have access to SEBI SCORES/ODR, Exchange Investor
          Grievance Redressal Forum, or Arbitration mechanism. Fixed deposits
          are regulated by the Reserve Bank of India (RBI).
        </p>
      </div>
    </div>
  );
}

export default Footer;
