import React from 'react';
import {Pressable, Text} from 'react-native';
import {Auth} from 'aws-amplify';

export const Profile = () => {
  const signOut = () => {
    Auth.signOut();
  };

  return (
    <>
      <Text>ProfilePage</Text>
      <Pressable onPress={signOut}>
        <Text>Выйти</Text>
      </Pressable>
    </>
  );
};
