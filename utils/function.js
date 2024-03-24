
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URI = 'https://dd34-202-47-51-221.ngrok-free.app';
const KEY = '5416846351sd4sf51sd3f51sd8f4sd6f51sd35f16sd8f'
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const ValidateEvmNetworks = async (rpcUrl) => {
    console.log(rpcUrl);
    try {
        const responseData = await postData(BASE_URI + '/validateNetworkAndGetChain', { rpcUrl });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const CreateWallet = async () => {
    try {
        const responseData = await postData(BASE_URI + '/create-wallet');
        const decodedPayload = decrypt(responseData.data);
        return decodedPayload
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const CreateEVMWallet = async () => {
    try {
        const responseData = await postData(BASE_URI + '/eth-create-account');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const CreateEVMmainWallet = async () => {
    try {
        const responseData = await postData(BASE_URI + '/eth-create-wallet');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getSolBalance = async (walletAddress) => {
    try {
        const responseData = await postData(BASE_URI + '/wallet-ballance', { walletAddress });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getEVMBalance = async (walletAddress, chain) => {
    try {
        const responseData = await postData(BASE_URI + '/eth-getbalance', { walletAddress, chain });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const sendEvmNative = async (privateKey, recipientAddress, amount , chain ) => {
    privateKey = await encrypt(privateKey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/eth-send', { privateKey, recipientAddress, amount, chain });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const sendSolNative = async (pkey, recipientAddress, amount) => {
    console.log(pkey, recipientAddress, amount)
    let privateKey = await encrypt(pkey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/send-native', { privateKey, recipientAddress, amount });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getEvmTrx = async (walletAddress, chain) => {
    console.log(walletAddress, chain)
    try {
        const responseData = await postData(BASE_URI + '/getEVMTrx', { walletAddress, chain });
        console.log(responseData)
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getsolTrxsignatures = async (walletAddressStr) => {
    try {
        const responseData = await postData(BASE_URI + '/getSolTrx', { walletAddressStr });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getsolTrx = async (signature) => {
    try {

        const responseData = await postData(BASE_URI + '/get-solTrx-details', { signature });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getEVM_AccountImport = async (privateKey) => {
    try {
        let result = await encrypt(privateKey, KEY)
        privateKey = result
        const responseData = await postData(BASE_URI + '/eth-importaccount', { privateKey });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getEVM_AccountImportMnemonic = async (mnemonic) => {
    try {
        // let mnemonic = await encrypt(mnemonic, KEY)
        // console.log(mnemonic?.replace(/\n/g, ""))
        mnemonic = mnemonic?.replace(/\n/g, "")
        const responseData = await postData(BASE_URI + '/eth-import-mnemonic', { mnemonic });
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getSol_AccountImportMnemonic = async (mnemonic) => {
    // console.log(mnemonic?.replace(/\n/g, ""))
    try {
        // let mnemonic = await encrypt(mnemonic, KEY)
        mnemonic = mnemonic?.replace(/\n/g, "")
        const responseData = await postData(BASE_URI + '/import-with-mnemonic', { mnemonic });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getSol_AccountImport = async (privateKey) => {
    try {
        let result = await encrypt(privateKey, KEY)
        privateKey = result
        const responseData = await postData(BASE_URI + '/import-with-Key', { privateKey });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const importEVMToken = async (address, chain, network_name, erc20_address) => {
    try {
        const responseData = await postData(BASE_URI + '/imp_eth_tokenerc_20', { address, chain, network_name, erc20_address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const importSolToken = async (address, erc20_address) => {
    try {
        const responseData = await postData(BASE_URI + '/imp_tokenerc_20', { address, erc20_address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const sendSolToken = async (privateKey, recipientAddress, tokenMintAddress, amount) => {
    try {
        privateKey = await encrypt(privateKey, KEY)
        const responseData = await postData(BASE_URI + '/send-non-native', { privateKey, recipientAddress, tokenMintAddress, amount });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const sendEvmToken = async (privateKey, recipientAddress, amount, tokenAddress, chain) => {
    try {
        privateKey = await encrypt(privateKey, KEY)
        const responseData = await postData(BASE_URI + '/eth-send-720', { privateKey, recipientAddress, amount, tokenAddress, chain });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const Evm_estimatedGas = async (to, from, amount, chain) => {
    try {
        const responseData = await postData(BASE_URI + '/getEstimatedGas_evm', { to, from, amount, chain });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const Evm_estimatedGas_Evm = async (to, from, amount, chain , tokenAdd) => {
    try {
        const responseData = await postData(BASE_URI + '/getEstimatedGasERC20_evm', { to, from, amount, chain, tokenAdd });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const Sol_estimatedGas = async (key, from, amount) => {
    try {
        key = await encrypt(key, KEY)
        const responseData = await postData(BASE_URI + '/getEstimatedGas_sol', {key, from, amount});
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const SolToken_estimatedGas = async (key, from, tokenAddress, amount ) => {
    try {
        key = await encrypt(key, KEY)
        const responseData = await postData(BASE_URI + '/getEstimatedGas_soltoken', {key, from, tokenAddress, amount });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const Solana_swap = async (chain, fromToken, toToken, amount, sender, recipient) => {
    try {
        console.log(">>>>",inputMint, outputMint, amount, token)
        // token = await encrypt(token, KEY)
        const responseData = await postData(BASE_URI + '/solana-swap', {inputMint, outputMint, amount, token});
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
async function confirmEvmSwap( rpcUrl, fromToken, toToken, amount, sender, recipient , privateKey) {
    // console.log("Execute Swap", rpcUrl, fromToken, toToken, amount, sender, recipient)
    try {
        //chain, fromToken, toToken, amount, sender, recipient,
        // token = await encrypt(token, KEY)
        amount = (amount).toString()
        const responseData = await postData(BASE_URI + '/executeEvmSwap', {rpcUrl, fromToken, toToken, amount, sender, recipient , privateKey});
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
} 
//BTC
const CreateBitcoinWallet = async () => {
    try {
        const responseData = await postData(BASE_URI + '/btc-create-wallet');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const CreateBitcoinAccount = async () => {
    try {
        const responseData = await postData(BASE_URI + '/btc-create-new-account');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getBTCBalance = async (address) => {
    try {
        const responseData = await postData(BASE_URI + '/btc-getbalance', { address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getBitcoin_AccountImport = async (privateKey) => {
    try {
        let result = await encrypt(privateKey, KEY)
        privateKey = result
        const responseData = await postData(BASE_URI + '/btc-importaccount', { privateKey });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getBitcoin_AccountImportMnemonic = async (mnemonic) => {
    try {
        mnemonic = mnemonic?.replace(/\n/g, "")
        const responseData = await postData(BASE_URI + '/btc-import-mnemonic', { mnemonic });
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const sendBitcoinNative = async (senderPrivateKeyWIF, recipientAddress, amount ) => {
    // let senderPrivateKeyWIF = await encrypt(privateKey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/btc-send', { senderPrivateKeyWIF, recipientAddress, amount  });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const Bitcoin_estimatedGas = async (senderPrivateKeyWIF, recipientAddress, amount) => {
    // let senderPrivateKeyWIF = await encrypt(privateKey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/btc-confirm-send', { senderPrivateKeyWIF, recipientAddress, amount});
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getBitcoinTrx = async (address) => {
    try {
        const responseData = await postData(BASE_URI + '/btc-transactions', { address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

//TRON
const CreatetronWallet = async () => {
    try {
        const responseData = await postData(BASE_URI + '/tron-create-wallet');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const CreatetronAccount = async () => {
    try {
        const responseData = await postData(BASE_URI + '/tron-create-new-account');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const gettronBalance = async (address) => {
    try {
        const responseData = await postData(BASE_URI + '/tron-getbalance', { address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const gettron_AccountImport = async (privateKey) => {
    try {
        // let result = await encrypt(privateKey, KEY)
        // privateKey = result
        const responseData = await postData(BASE_URI + '/tron-importaccount', { privateKey });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const gettron_AccountImportMnemonic = async (mnemonic) => {
    try {
        mnemonic = mnemonic?.replace(/\n/g, "")
        const responseData = await postData(BASE_URI + '/tron-import-mnemonic', { mnemonic });
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const sendtronNative = async (privateKey, recipientAddress, amount ) => {
    // let senderPrivateKeyWIF = await encrypt(privateKey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/tron-send', { privateKey, recipientAddress, amount  });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const tron_estimatedGas = async (senderPrivateKeyWIF, recipientAddress, amount) => {
    // let senderPrivateKeyWIF = await encrypt(privateKey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/btc-confirm-send', { senderPrivateKeyWIF, recipientAddress, amount});
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const gettronTrx = async (address) => {
    try {
        // address = 'TYhMLE3tKTBrJdeC55oZjq466Mi9s5v62f'
        const responseData = await postData(BASE_URI + '/tron-transactions', { address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

//TRON
const CreatedogeWallet = async () => {
    try {
        const responseData = await postData(BASE_URI + '/doge-create-wallet');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const CreatedogeAccount = async () => {
    try {
        const responseData = await postData(BASE_URI + '/doge-create-new-account');
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getdogeBalance = async (address) => {
    try {
        const responseData = await postData(BASE_URI + '/doge-getbalance', { address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getdoge_AccountImport = async (privateKey) => {
    try {
        // let result = await encrypt(privateKey, KEY)
        // privateKey = result
        const responseData = await postData(BASE_URI + '/doge-importaccount', { privateKey });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const getdoge_AccountImportMnemonic = async (mnemonic) => {
    try {
        mnemonic = mnemonic?.replace(/\n/g, "")
        const responseData = await postData(BASE_URI + '/doge-import-mnemonic', { mnemonic });
        return decrypt(responseData)
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
const senddogeNative = async (senderPrivateKeyWIF, recipientAddress, amount ) => {
    // let senderPrivateKeyWIF = await encrypt(privateKey, KEY)
    amount = Number(amount)
    try {
        const responseData = await postData(BASE_URI + '/doge-send', { senderPrivateKeyWIF, recipientAddress, amount  });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const doge_estimatedGas = async (senderPrivateKeyWIF, recipientAddress, amount) => {
    // let senderPrivateKeyWIF = await encrypt(privateKey, KEY)
    try {
        const responseData = await postData(BASE_URI + '/btc-confirm-send', { senderPrivateKeyWIF, recipientAddress, amount});
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getdogeTrx = async (address) => {
    try {
        // address = 'D9LiKde4rDrzfHMgikhHSH3kZsCC45zz4V'
        const responseData = await postData(BASE_URI + '/doge-transactions', { address });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//Stacking
const getStakedDetails = async (network_type) => {
    try {
        const responseData = await postData(BASE_URI + '/get_config_staking', { network_type });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const Staked = async (rpcUrl , wallet , amount , wallet_type) => {
    try {
        const responseData = await postData(BASE_URI + '/stake_amount', { rpcUrl , wallet , amount , wallet_type });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const ClaimStaked = async (id) => {
    try {
        const responseData = await postData(BASE_URI + '/claim', { id });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
const getStakedbyaddress = async ( wallet  , wallet_type) => {
    try {
        const responseData = await postData(BASE_URI + '/get_staking', { wallet  , wallet_type });
        return responseData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
async function fetchCoins() {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: true, // Set this to true to get the sparkline data
          price_change_percentage: '24h',
        },
      });
      AsyncStorage.setItem('GekoTokens', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      const GekoTokens = await AsyncStorage.getItem('GekoTokens');
      console.log("Error fetching geko coins: ", error);
      return JSON.parse(GekoTokens);
    //   return []; // Return an empty array in case of an error
    }
};
async function getUSDamount(symbol) {
    if (typeof symbol !== 'string' || symbol.trim() === '') {
        console.error("Invalid or undefined symbol provided.");
        return {"data": {"amount": "0", "base": "Invalid Symbol", "currency": "USD"}};
    }
    
    try {
        const response = await axios.get(`https://api.coinbase.com/v2/prices/${symbol.toUpperCase()}-USD/spot`);
        return response.data;
    } catch (coinbaseError) {
        console.error("Error fetching price from Coinbase:", coinbaseError.message);
        try {
            const coingeckoResponse = await fetchTokenPriceInUSD(symbol);
            return coingeckoResponse ? coingeckoResponse : {"data": {"amount": "0", "base": "---", "currency": "USD"}};
        } catch (coingeckoError) {
            console.error("Error fetching price from CoinGecko:", coingeckoError.message);
            return {"data": {"amount": "0", "base": "---", "currency": "USD"}};
        }
    }
}
async function getCoinGeckoIdForSymbol(symbol) {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      const data = response.data;
      const coin = data.find(coin => coin.symbol.toLowerCase() === symbol.toLowerCase());
      return coin ? coin.id : null;
    } catch (error) {
      console.error("Error fetching CoinGecko coin list:", error);
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
  
      const priceResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
      const priceInUSD = priceResponse.data[coinId].usd;
      return { 'data': { 'amount': priceInUSD.toString(), 'base': 'CoinGecko', 'currency': "USD" } };
    } catch (error) {
      console.error("Error fetching token price from CoinGecko:", error);
    }
}
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
async function decrypt(token) {
    try {
        const decryptData = await postData(BASE_URI + '/decrypt', { token, KEY });
        return decryptData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
async function encrypt(token) {
    try {
        const encryptData = await postData(BASE_URI + '/encrypt', { token, KEY });
        return encryptData
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
async function postData(apiUrl, data) {
    try {
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
    ClaimStaked,
    getStakedbyaddress,
    Staked,
    getStakedDetails,
    senddogeNative,
    sendtronNative,
    getdogeTrx,
    gettronTrx,
    getdoge_AccountImportMnemonic,
    gettron_AccountImportMnemonic,
    getdoge_AccountImport,
    gettron_AccountImport,
    CreatedogeAccount,
    CreatetronAccount,
    getdogeBalance,
    gettronBalance,
    CreatedogeWallet,
    CreatetronWallet,
    getBitcoinTrx,
    Bitcoin_estimatedGas,
    sendBitcoinNative,
    getBitcoin_AccountImportMnemonic,
    getBitcoin_AccountImport,
    getBTCBalance,
    CreateBitcoinAccount,
    CreateBitcoinWallet,
    decrypt,
    encrypt,
    CreateEVMmainWallet,
    getEVM_AccountImportMnemonic,
    getSol_AccountImportMnemonic,
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
    fetchCoins,
    Evm_estimatedGas,
    Evm_estimatedGas_Evm,
    Sol_estimatedGas,
    SolToken_estimatedGas,
    getUSDamount,
    Solana_swap,
    confirmEvmSwap,
    ValidateEvmNetworks
};