import React from 'react'
import {useState, useEffect} from 'react'
import "./home.css"
import axios from "axios"
import Config from "../../Config/config.json"

const serverURL = Config.ServerURL

const Home = ({ token }) => {
  const [wallets, setWallets] = useState([]);

  const fetchWallets = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/wallets/getWallets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set wallets in state when the data is available
      setWallets(response.data.wallets);

      // You will see the updated state in this log statement
      console.log("wallets: ", response.data.wallets);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Call fetchWallets when the component mounts
    fetchWallets();
  }, [token]); // Include 'token' as a dependency

  const handleNewWallet = async () => {
    try {
      console.log(token)
      const response = await axios.post(
  `${serverURL}/api/wallets/createWallet`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    setWallets((prevWallets) => [...prevWallets, response.data.wallet]);
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div className='home-container'>
      <div className="home-inner-container">
        <div className='container-heading'>Wallets</div>
        <div className="container-list">
          {wallets.map((wallet) => (
            <div key={wallet.ethereumPublicKey} className='wallet'>
              {wallet.ethereumPublicKey} - {wallet.ethereumPrivateKey}
            </div>
          ))}
        </div>
        <div className="actionbtns">
          <button className='action-btn' onClick={handleNewWallet}>+</button>
        </div>
      </div>
      <div className="home-inner-container">
        <div className='container-heading'>Tokens</div>
      </div>
    </div>
  );
};

export default Home;