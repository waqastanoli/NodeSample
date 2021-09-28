import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the account state domain
 */

const selectCancelDomain = state => state.cancel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Account
 */

const makeSelectCancel = () =>
  createSelector(
    selectCancelDomain,
    substate => substate,
  );

export default makeSelectCancel;
export { selectCancelDomain };
