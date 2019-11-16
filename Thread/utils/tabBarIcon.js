import { FontAwesome, Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import * as React from 'react';

export const profileIcon = name => ({ tintColor }) => (
  <FontAwesome
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

export const spotIcon = name => ({ tintColor }) => (
  <Entypo
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

export const seekIcon = name => ({ tintColor }) => (
  <MaterialCommunityIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);
