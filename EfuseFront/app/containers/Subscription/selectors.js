import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the account state domain
 */

const selectSubscriptionDomain = state => state.subscription || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Account
 */

const makeSelectSubscription = () =>
  createSelector(
    selectSubscriptionDomain,
    substate => substate,
  );

export default makeSelectSubscription;
export { selectSubscriptionDomain };
