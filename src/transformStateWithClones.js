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

    let next = Object.assign({}, prev);

    const nextStep = () => {
      stateHistory.push(next);
      prev = next;
    };

    switch (action.type) {
      case 'addProperties': {
        Object.assign(next, action.extraData);

        nextStep();
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete next[key];
        }
        nextStep();
        break;
      }

      case 'clear': {
        next = {};
        nextStep();
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
