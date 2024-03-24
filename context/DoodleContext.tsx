import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Doodle, doodles, DoodleBG, doodleBGs} from './Doodle';

type DoodleContextType = {
  doodle: Doodle;
  switchDoodle: (doodleName: string) => void;
  doodleBG: DoodleBG;
  switchDoodleBG: (doodleBGName: string) => void;
};

export const DoodleContext = createContext<DoodleContextType>({
  doodle: doodles.doodle1,
  switchDoodle: () => {},
  doodleBG: doodleBGs.doodleBG1,
  switchDoodleBG: () => {},
});

type DoodleProviderProps = {
  children: ReactNode;
};

export const DoodleProvider = ({children}: DoodleProviderProps) => {
  const [doodle, setDoodle] = useState<Doodle>(doodles.doodle1);
  const [doodleBG, setDoodleBG] = useState<DoodleBG>(doodleBGs.doodleBG1);

  useEffect(() => {
    // Load doodle and doodleBG from storage on mount
    const loadSettings = async () => {
      const storedDoodle = await AsyncStorage.getItem('doodle');
      const storedDoodleBG = await AsyncStorage.getItem('doodleBG');
      if (storedDoodle && doodles[storedDoodle]) {
        setDoodle(doodles[storedDoodle]);
      }
      if (storedDoodleBG && doodleBGs[storedDoodleBG]) {
        setDoodleBG(doodleBGs[storedDoodleBG]);
      }
    };

    loadSettings();
  }, []);

  const switchDoodle = (doodleName: string) => {
    setDoodle(doodles[doodleName]);
    AsyncStorage.setItem('doodle', doodleName);
  };

  const switchDoodleBG = (doodleBGName: string) => {
    setDoodleBG(doodleBGs[doodleBGName]);
    AsyncStorage.setItem('doodleBG', doodleBGName);
  };

  return (
    <DoodleContext.Provider
      value={{doodle, switchDoodle, doodleBG, switchDoodleBG}}>
      {children}
    </DoodleContext.Provider>
  );
};
