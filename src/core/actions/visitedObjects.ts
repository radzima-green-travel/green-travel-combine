import {createAction} from '@reduxjs/toolkit';
import {ACTIONS} from 'core/constants';
import {createAsyncAction} from 'core/helpers';
import {
  AddVisitedObjectBody,
  ShareExperienceInitialData,
  VisitedObjectsData,
} from 'core/types';

export const getVisitedObjectsRequest = createAsyncAction<
  void,
  VisitedObjectsData,
  Error
>(ACTIONS.GET_VISITED_OBJECTS);

export const addVisitedObjectRequest = createAsyncAction<
  {
    objectId: string;
    data: AddVisitedObjectBody;
  },
  void,
  Error
>(ACTIONS.ADD_VISITED_OBJECT);

export const deleteVisitedObjectRequest = createAsyncAction<
  {
    objectId: string;
  },
  void,
  Error
>(ACTIONS.DELETE_VISITED_OBJECT);

export const clearVisitedObjects = createAction(ACTIONS.CLEAR_VISITED_OBJECTS);

export const scheduleShareExperienceMenu = createAction<{
  delayMs: number;
  data: ShareExperienceInitialData;
}>(ACTIONS.SCHEDULE_OPEN_SHARE_EXPERIENCE_MENU);

export const setShareExperienceData = createAction<ShareExperienceInitialData>(
  ACTIONS.SET_SHARE_EXPERIENCE_DATA,
);

export const clearShareExperienceData = createAction(
  ACTIONS.CLEAR_SHARE_EXPERIENCE_DATA,
);

export const updateVisitedObjectRequest = createAsyncAction<
  {
    objectId: string;
    data: AddVisitedObjectBody;
  },
  void,
  Error
>(ACTIONS.UPDATE_VISITED_OBJECT);

export const sendInaccuraciesEmailRequest = createAsyncAction<
  {
    subject: string;
    message: string;
    objectId: string;
    showSuccessMenu?: boolean;
  },
  boolean,
  Error
>(ACTIONS.SEND_INACCURACIES_EMAIL);

export const sendAddInfoEmailRequest = createAsyncAction<
  {
    subject: string;
    message: string;
    objectId: string;
    showSuccessMenu?: boolean;
  },
  boolean,
  Error
>(ACTIONS.SEND_ADD_INFO_EMAIL);
