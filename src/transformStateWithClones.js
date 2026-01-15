'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prev = Object.assign({}, state);
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties': {
        const next = Object.assign({}, prev);

        Object.assign(next, action.extraData);
        stateHistory.push(next);
        prev = next;
        break;
      }

      case 'removeProperties': {
        const next = Object.assign({}, prev);

        for (const key of action.keysToRemove) {
          delete next[key];
        }
        stateHistory.push(next);
        prev = next;
        break;
      }

      case 'clear': {
        const next = {};

        stateHistory.push(next);
        prev = next;
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
