import { ActionWithPayload } from './cms.reducer';
import { ActionReducer, Action } from '@ngrx/store';
import { DeviceDetail } from '../models/unlock.model';

export const deviceDetailInitialState: DeviceDetail = {};

export const ADD_DEVICE_DETAIL = 'ADD_DEVICE_DETAIL';

export function deviceDetailReducer(
  state: DeviceDetail = {},
  action: ActionWithPayload<DeviceDetail>
) {
  switch (action.type) {
    case ADD_DEVICE_DETAIL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
