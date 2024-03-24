import Doodle1 from '../assets/images/doodle/doodle1.png';
import Doodle2 from '../assets/images/doodle/doodle2.png';
import Doodle3 from '../assets/images/doodle/doodle3.png';
import Doodle4 from '../assets/images/doodle/doodle4.png';
import Doodle5 from '../assets/images/doodle/doodle5.png';

export type Doodle = string;
export type DoodleBG = string;

export const doodles: {[key: string]: Doodle} = {
  doodle1: Doodle1,
  doodle2: Doodle2,
  doodle3: Doodle3,
  doodle4: Doodle4,
  doodle5: Doodle5,
};

export const doodleBGs: {[key: string]: DoodleBG} = {
  doodleBG1: '#104A5C',
  doodleBG2: '#584C0D',
  doodleBG3: '#681A1A',
  doodleBG4: '#251A53',
  doodleBG5: '#125732',
};
