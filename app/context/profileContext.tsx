import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProfileContextType = {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;

  username: string;
  setUsername: (name: string) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');  // added username state

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage, username, setUsername }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
