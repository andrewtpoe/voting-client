import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('Reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4
          })
        })
      })
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      }
    }));
  });

  it('handles SET_STATE with a plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            Trainspotting: 4
          }
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      }
    }));
  });

  it('handles SET_STATE without initialState', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4
          })
        })
      })
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      }
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      },
      hasVoted: 'Trainspotting'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      }
    });
    const action = {type: 'VOTE', entry: 'Sunshine'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 4
        }
      },
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 3
        }
      },
      hasVoted: 'Trainspotting'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Sunshine', 'Slumdog Millionare']
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionare']
      }
    }));
  });

});
