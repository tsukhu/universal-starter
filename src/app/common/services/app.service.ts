import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

export type InternalStateType = {
  [key: string]: any
};

const RESULT_KEY = makeStateKey<InternalStateType>('app-state');

@Injectable()
export class AppState {

  public _state: InternalStateType = {};

  constructor(private readonly transferState: TransferState) { }

  /**
   * Already return a clone of the current state.
   */
  public get state() {
    const found = this.transferState.hasKey(RESULT_KEY);
    if (found) {
      const res = this.transferState.get<InternalStateType>(RESULT_KEY, null);
      this.transferState.remove(RESULT_KEY);
      return this._state = this._clone(res);
    } else {
      this._state = this._clone(this._state);
      this.transferState.onSerialize(RESULT_KEY, () => this._state);
      return this._state;
    }
  }
  /**
   * Never allow mutation
   */
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    /**
     * Use our state getter for the clone.
     */
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    /**
     * Internally mutate our state.
     */
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    /**
     * Simple object clone.
     */
    return JSON.parse(JSON.stringify(object));
  }
}
