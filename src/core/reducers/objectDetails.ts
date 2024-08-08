import {createReducer} from '@reduxjs/toolkit';
import {byIdReducer} from 'react-redux-help-kit';
import {clearObjectDetails, getObjectDetailsRequest} from 'core/actions';
import {ObjectDetailsResponseDTO} from 'core/types';

interface ObjectDetailsState {
  objectDetails: ObjectDetailsResponseDTO | null;
}

const initialState: ObjectDetailsState = {
  objectDetails: null,
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(
    getObjectDetailsRequest.meta.successAction,
    (state, {payload}) => ({
      ...state,
      objectDetails: payload.objectDetails,
    }),
  );
  builder.addCase(clearObjectDetails, state => ({
    ...state,
    objectDetails: null,
  }));
});

export const objectDetailsReducer =
  byIdReducer<ObjectDetailsState>('objectDetails')(reducer);
