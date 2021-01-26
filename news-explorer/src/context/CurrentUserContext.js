import React from 'react';
import profileAvatar from '../images/about__photo.jpg';

export const initialUser = {
    name: 'Грета',
    avatar: profileAvatar
}

export const CurrentUserContext = React.createContext();