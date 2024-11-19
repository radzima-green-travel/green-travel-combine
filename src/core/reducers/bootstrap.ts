import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {bootstrapRequest} from 'core/actions';

interface InitialState {
  finished: boolean;
}

const initialState: InitialState = {
  finished: false,
};

export const bootstrapReducer = createReducer(initialState, builder => {
  builder.addMatcher(
    isAnyOf(
      bootstrapRequest.meta.successAction,
      bootstrapRequest.meta.failureAction,
    ),
    state => ({
      ...state,
      finished: true,
    }),
  );
});
