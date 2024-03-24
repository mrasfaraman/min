import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URI = 'https://wavebackendnew-production.up.railway.app';
// const BASE_URI = 'https://be9c-111-88-229-24.ngrok-free.app';

const KEY = '5416846351sd4sf51sd3f51sd8f4sd6f51sd35f16sd8f';
import {useEffect, useState} from 'react';

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

const CreateWallet = async () => {
  try {
    const responseData = await postData(BASE_URI + '/create-wallet');
    const decodedPayload = decrypt(responseData.data);
    return decodedPayload;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const CreateEVMWallet = async () => {
  try {
    const responseData = await postData(BASE_URI + '/eth-create-account');
    return decrypt(responseData);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getSolBalance = async walletAddress => {
  try {
    const responseData = await postData(BASE_URI + '/wallet-ballance', {
      walletAddress,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getEVMBalance = async (walletAddress, chain) => {
  try {
    const responseData = await postData(BASE_URI + '/eth-getbalance', {
      walletAddress,
      chain,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const sendEvmNative = async (privateKey, recipientAddress, amount, chain) => {
  privateKey = await encrypt(privateKey, KEY);
  try {
    const responseData = await postData(BASE_URI + '/eth-send', {
      privateKey,
      recipientAddress,
      amount,
      chain,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const sendSolNative = async (pkey, recipientAddress, amount) => {
  let privateKey = await encrypt(pkey, KEY);
  try {
    const responseData = await postData(BASE_URI + '/send-native', {
      privateKey,
      recipientAddress,
      amount,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getEvmTrx = async (walletAddress, chain) => {
  console.log(walletAddress, chain);
  try {
    const responseData = await postData(BASE_URI + '/getEVMTrx', {
      walletAddress,
      chain,
    });
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getsolTrxsignatures = async walletAddressStr => {
  try {
    const responseData = await postData(BASE_URI + '/getSolTrx', {
      walletAddressStr,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getsolTrx = async signature => {
  try {
    const responseData = await postData(BASE_URI + '/get-solTrx-details', {
      signature,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getEVM_AccountImport = async privateKey => {
  try {
    let result = await encrypt(privateKey, KEY);
    privateKey = result;
    const responseData = await postData(BASE_URI + '/eth-importaccount', {
      privateKey,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const getSol_AccountImport = async privateKey => {
  try {
    let result = await encrypt(privateKey, KEY);
    privateKey = result;
    const responseData = await postData(BASE_URI + '/import-with-Key', {
      privateKey,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const importEVMToken = async (address, chain, network_name, erc20_address) => {
  try {
    const responseData = await postData(BASE_URI + '/imp_eth_tokenerc_20', {
      address,
      chain,
      network_name,
      erc20_address,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const importSolToken = async (address, erc20_address) => {
  try {
    const responseData = await postData(BASE_URI + '/imp_tokenerc_20', {
      address,
      erc20_address,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const sendSolToken = async (
  privateKey,
  recipientAddress,
  tokenMintAddress,
  amount,
) => {
  try {
    privateKey = await encrypt(privateKey, KEY);
    const responseData = await postData(BASE_URI + '/send-non-native', {
      privateKey,
      recipientAddress,
      tokenMintAddress,
      amount,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const sendEvmToken = async (
  privateKey,
  recipientAddress,
  amount,
  tokenAddress,
  chain,
) => {
  try {
    privateKey = await encrypt(privateKey, KEY);
    const responseData = await postData(BASE_URI + '/eth-send-720', {
      privateKey,
      recipientAddress,
      amount,
      tokenAddress,
      chain,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const Evm_estimatedGas = async (to, from, amount, chain) => {
  try {
    const responseData = await postData(BASE_URI + '/getEstimatedGas_evm', {
      to,
      from,
      amount,
      chain,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const Evm_estimatedGas_Evm = async (to, from, amount, chain, tokenAdd) => {
  try {
    const responseData = await postData(
      BASE_URI + '/getEstimatedGasERC20_evm',
      {to, from, amount, chain, tokenAdd},
    );
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const Sol_estimatedGas = async (key, from, amount) => {
  try {
    key = await encrypt(key, KEY);
    const responseData = await postData(BASE_URI + '/getEstimatedGas_sol', {
      key,
      from,
      amount,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
const SolToken_estimatedGas = async (key, from, tokenAddress, amount) => {
  try {
    key = await encrypt(key, KEY);
    const responseData = await postData(
      BASE_URI + '/getEstimatedGas_soltoken',
      {key, from, tokenAddress, amount},
    );
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const Solana_swap = async (inputMint, outputMint, amount, token) => {
  try {
    console.log('>>>>', inputMint, outputMint, amount, token);
    // token = await encrypt(token, KEY)
    const responseData = await postData(BASE_URI + '/solana-swap', {
      inputMint,
      outputMint,
      amount,
      token,
    });
    return responseData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// const fetchCoins = async () => {
//     try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
//             params: {
//                 vs_currency: 'usd',
//                 order: 'market_cap_desc',
//                 per_page: 10,
//                 page: 1,
//                 sparkline: true, // Set this to true to get the sparkline data
//                 price_change_percentage: '24h',
//             },
//         });
//         AsyncStorage.setItem('GekoTokens', JSON.stringify(response.data));
//         return response.data;
//     } catch (error) {
//         const GekoTokens = await AsyncStorage.getItem('GekoTokens');
//         console.log("Error fetching geko coins: ", error);
//         return JSON.parse(GekoTokens);
//         //   return []; // Return an empty array in case of an error
//     }
// };

// async function fetchCoins() {
//     try {
//       const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
//         params: {
//           vs_currency: 'usd',
//           order: 'market_cap_desc',
//           per_page: 10,
//           page: 1,
//           sparkline: true, // Set this to true to get the sparkline data
//           price_change_percentage: '24h',
//         },
//       });
//       AsyncStorage.setItem('GekoTokens', JSON.stringify(response.data))
//       return response.data;
//     } catch (error) {
//       const GekoTokens = await AsyncStorage.getItem('GekoTokens');
//       console.log("Error fetching geko coins: ", error);
//       return JSON.parse(GekoTokens);
//     //   return []; // Return an empty array in case of an error
//     }
// };

async function getUSDamount(symbol) {
  if (typeof symbol !== 'string' || symbol.trim() === '') {
    console.error('Invalid or undefined symbol provided.');
    return {data: {amount: '0', base: 'Invalid Symbol', currency: 'USD'}};
  }

  try {
    // Adding a 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await axios.get(
      `https://api.coinbase.com/v2/prices/${symbol.toUpperCase()}-USD/spot`,
    );
    return response.data;
  } catch (coinbaseError) {
    console.error('Error fetching price from Coinbase:', coinbaseError.message);
    try {
      const coingeckoResponse = await fetchTokenPriceInUSD(symbol);
      return coingeckoResponse
        ? coingeckoResponse
        : {data: {amount: '0', base: '---', currency: 'USD'}};
    } catch (coingeckoError) {
      console.error(
        'Error fetching price from CoinGecko:',
        coingeckoError.message,
      );
      return {data: {amount: '0', base: '---', currency: 'USD'}};
    }
  }
}

async function getCoinGeckoIdForSymbol(symbol) {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/list',
    );
    const data = response.data;
    const coin = data.find(
      coin => coin.symbol.toLowerCase() === symbol.toLowerCase(),
    );

    // Adding a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    return coin ? coin.id : null;
  } catch (error) {
    console.error('Error fetching CoinGecko coin list:', error);
    return null;
  }
}

async function fetchTokenPriceInUSD(symbol) {
  try {
    const coinId = await getCoinGeckoIdForSymbol(symbol);
    if (!coinId) {
      console.log(`Could not find CoinGecko ID for symbol: ${symbol}`);
      return;
    }

    // Adding a 3-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const priceResponse = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
    );
    const priceInUSD = priceResponse.data[coinId].usd;
    return {
      data: {amount: priceInUSD.toString(), base: 'CoinGecko', currency: 'USD'},
    };
  } catch (error) {
    console.error('Error fetching token price from CoinGecko:', error);
  }
}

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
async function decrypt(token) {
    try {
      // Adding a 3-second delay
      await new Promise(resolve => setTimeout(resolve, 3000));
  
      const decryptData = await postData(BASE_URI + '/decrypt', { token, KEY });
      return decryptData;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  
  async function encrypt(token) {
    try {
      // Adding a 3-second delay
      await new Promise(resolve => setTimeout(resolve, 3000));
  
      const encryptData = await postData(BASE_URI + '/encrypt', { token, KEY });
      return encryptData;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  

async function postData(apiUrl, data) {
  try {
    // Adding a 2-second delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

export {
  CreateWallet,
  CreateEVMWallet,
  getSolBalance,
  getEVMBalance,
  getEVM_AccountImport,
  getSol_AccountImport,
  sendEvmNative,
  sendSolNative,
  getEvmTrx,
  importEVMToken,
  importSolToken,
  getsolTrxsignatures,
  getsolTrx,
  sendSolToken,
  sendEvmToken,
  Evm_estimatedGas,
  Evm_estimatedGas_Evm,
  Sol_estimatedGas,
  SolToken_estimatedGas,
  getUSDamount,
  Solana_swap,
};
