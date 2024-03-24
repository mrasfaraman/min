import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';

interface Account {
  id: number;
  name: string;
}
interface Session {
  id: number;
  name: string;
}
interface Networks {
  id: number;
  name: string;
}

interface Tokens {
  id: number;
  name: string;
}
interface AuthContextType {
  password: string;
  savePassword: (newPassword: string) => void;
  wc: string;
  walletConnectUrl: (text: string) => void;
  wallet: any; // You may replace `any` with a more specific type
  setWeb3Wallet: (wallet: any) => void; // You may replace `any` with a more specific type
  Session: Session[];
  saveSession: (newSession: Session) => void;
  removeSession: (index: number) => void;
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account | null) => void;
  Accounts: Account[];
  addAccount: (newAccount: Account) => void;
  removeAccount: (index: number) => void;
  updateAccountName : (index: number, newName: string) => void,
  Networks: Networks[];
  setNetworks: (Networks: any) => void;
  addNetwork: (newAccount: Networks) => void;
  removeNetwork: (accountId: number) => void;
  selectedNetwork: Networks | null;
  setSelectedNetwork: (account: Networks | null) => void;
  updateToken: (index: number, updatedTokenData: Partial<Tokens>) => void;
  Tokens: Tokens[];
  addToken: (newToken: Tokens) => void;
  removeToken: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [password, setPassword] = useState<string>('');
  const [wc, wcSet] = useState<string>('');
  const [wallet, setWeb3Wallet] = useState<any>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [Accounts, setAccounts] = useState<Account[]>([]);

  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(null);
  const [Networks, setNetworks] = useState<Networks[]>([]);

  const [Tokens, setTokens] = useState<Tokens[]>([]);

  const walletConnectUrl = (text: string) => {
    wcSet(text);
  };

  const saveSession = (newSession: Session) => {
    setSessions(prevSessions => [...prevSessions, newSession]);
  };

  const removeSession = (index: number) => {
    setSessions(prevSessions => {
      const updatedSessions = [...prevSessions];
      updatedSessions.splice(index, 1);
      return updatedSessions;
    });
  };

  const savePassword = async (newPassword: string) => {
    setPassword(newPassword);
    try {
      await AsyncStorage.setItem('password', newPassword);
    } catch (e) {
      console.error('Failed to save the password to storage', e);
    }
  };

  const addAccount = async (newAccount: Account) => {
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
  };

  const removeAccount = (index: number) => {
    setAccounts(prevAccounts => {
      // Create a copy of the current accounts array
      const updatedAccounts = [...prevAccounts];
      // Remove the account at the specified index
      updatedAccounts.splice(index, 1);
      // Update AsyncStorage with the updated accounts array
      AsyncStorage.setItem('Accounts', JSON.stringify(updatedAccounts))
        .then(() => {
          console.log('Account removed from AsyncStorage');
        })
        .catch((error) => {
          console.error('Failed to remove Account from AsyncStorage', error);
        });
      // Return the updated accounts array to update the state
      return updatedAccounts;
    });
  };
  const updateAccountName = async (index: number, newName: string) => {
    setAccounts(prevAccounts => {
      const updatedAccounts = [...prevAccounts];
      if(index >= 0 && index < updatedAccounts.length) {
        const accountToUpdate = updatedAccounts[index];
        const updatedAccount = { ...accountToUpdate, name: newName };
        updatedAccounts[index] = updatedAccount;
        setSelectedAccount(updatedAccount);
        // Asynchronously update AsyncStorage with the new list of accounts
        AsyncStorage.setItem('Accounts', JSON.stringify(updatedAccounts))
          .then(() => {console.log('Account name updated successfully')})
          .catch((error) => console.error('Failed to update account name in AsyncStorage', error));
      }
    
      return updatedAccounts;
    });
  };
  

  const addNetwork = async (newNetwork: Networks) => {
    setNetworks(prevNetworks => [...prevNetworks, newNetwork]);
  };

  const removeNetwork = (networkId: number) => {
    setNetworks(prevNetworks =>
      prevNetworks.filter(network => network.id !== networkId),
    );
  };

  const addToken = async (newToken: Tokens) => {
    setTokens(prevTokens => {
      // Update the state with the new token
      const updatedTokens = [...prevTokens, newToken];

      // Asynchronously update AsyncStorage with the new list of tokens
      AsyncStorage.setItem('Tokens', JSON.stringify(updatedTokens))
        .then(() => {
          console.log('Token added successfully');
        })
        .catch((error) => {
          console.error('Failed to add token to AsyncStorage', error);
        });

      // Return the updated state
      return updatedTokens;
    });
  };

  const updateToken = async (index: number, updatedTokenData: Partial<Tokens>) => {
    // Update the token in the state
    setTokens(prevTokens => {
      if (index >= 0 && index < prevTokens.length) {
        const updatedTokens = [...prevTokens];
        // Update token data using Partial<Tokens> type to allow updating specific token fields
        updatedTokens[index] = { ...updatedTokens[index], ...updatedTokenData };

        // Also update AsyncStorage
        AsyncStorage.setItem('Tokens', JSON.stringify(updatedTokens))
          .then(() => {
            console.log('Token updated in AsyncStorage.');
          })
          .catch(error => {
            console.error('Failed to update token in AsyncStorage', error);
          });
        // console.log("My Updated Token IN Context ==> ", updatedTokens)
        return updatedTokens;
      }
      return prevTokens; // Return the original tokens if index is out of bounds
    });
  };

  const removeToken = async (index: number) => {
    setTokens(prevTokens => {
      const filteredTokens = [...prevTokens];
      filteredTokens.splice(index, 1);
      AsyncStorage.setItem('Tokens', JSON.stringify(filteredTokens))
        .then(() => {
          console.log('Token removed from AsyncStorage');
        })
        .catch((error) => {
          console.error('Failed to remove token from AsyncStorage', error);
        });
      return filteredTokens;
    });

  };

  useEffect(() => {
    // Load tokens from AsyncStorage when the component mounts
    const loadTokens = async () => {
      try {
        const tokensString = await AsyncStorage.getItem('Tokens');
        if (tokensString !== null) {
          // Parse the string back into an array
          const tokensArray = JSON.parse(tokensString);
          setTokens(tokensArray);
        }
      } catch (e) {
        console.error('Failed to load tokens from AsyncStorage', e);
      }
    };

    loadTokens();
  }, []);

  useEffect(() => {
    const setnet = async () => {
      const SelectedNetwrks = await AsyncStorage.getItem('SelectedNetworks');
      setSelectedNetwork(SelectedNetwrks as any);
    };
    setnet();
  }, [selectedNetwork]);

  useEffect(() => {
    const loadPassword = async () => {
      try {
        const storedPassword = await AsyncStorage.getItem('password');
        if (storedPassword !== null) {
          setPassword(storedPassword);
          const Accountss = await AsyncStorage.getItem('Accounts');
          const SelectedAccount = await AsyncStorage.getItem('selectedAccount');
          const Netwrks = await AsyncStorage.getItem('Networks');
          const SelectedNetwrks = await AsyncStorage.getItem(
            'SelectedNetworks',
          );
          setNetworks(JSON.parse(Netwrks as any));
          setAccounts(JSON.parse(Accountss as any));
          setSelectedAccount(SelectedAccount as any);
          setSelectedNetwork(SelectedNetwrks as any);
        }
      } catch (e) {
        console.error('Failed to load the password from AsyncStorage', e);
      }
    };

    loadPassword();
  }, []);

  const authContextValue: AuthContextType = {
    password,
    savePassword,
    wc,
    walletConnectUrl,
    wallet,
    setWeb3Wallet,
    Session: sessions,
    saveSession,
    removeSession,
    selectedAccount,
    setSelectedAccount,
    Accounts,
    addAccount,
    removeAccount,
    Networks,
    addNetwork,
    removeNetwork,
    selectedNetwork,
    setSelectedNetwork,
    setNetworks,
    removeToken,
    Tokens,
    addToken,
    updateToken,
    updateAccountName
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
