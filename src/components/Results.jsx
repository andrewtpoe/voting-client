import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';
import Winner from './Winner';

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
};

export const Results = React.createClass({
  mixins: [PureRenderMixin],

  _getPair: function() {
    return this.props.pair || [];
  },

  _getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    } else {
      return 0
    };
  },

  render: function() {
    return (
      this.props.winner ?
      <Winner ref='winner' winner={this.props.winner} /> :
      <div className='results' >
        <div className='tally' >
          {this._getPair().map((entry) => { return (
            <div key={entry} className='entry' >
              <h1 >{entry}</h1>
              <div className='voteCount' >
                {this._getVotes(entry)}
              </div>
            </div>
          )})}
        </div>
        <div className='management' >
          <button ref='next'
                  className='next'
                  onClick={this.props.next} >
            Next
          </button>
        </div>
      </div>
    )
  }

});

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
