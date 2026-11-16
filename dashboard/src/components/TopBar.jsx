import React, { useEffect, useState } from "react";
import axios from "axios";

import Menu from "./Menu";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3802";

const TopBar = () => {
  const [indices, setIndices] = useState({});

  useEffect(() => {
    let active = true;
    axios.get(`${apiUrl}/market/indices`).then(({ data }) => {
      if (active) setIndices(Object.fromEntries(data.map((index) => [index._id, index])));
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{indices["NIFTY 50"]?.value ?? "--"}</p>
          <p className="percent">{indices["NIFTY 50"]?.change}</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{indices.SENSEX?.value ?? "--"}</p>
          <p className="percent">{indices.SENSEX?.change}</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
