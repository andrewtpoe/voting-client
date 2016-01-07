import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  _getPair: function() {
    return this.props.pair || []
  },

  _isDisabled: function() {
    return !!this.props.hasVoted
  },

  _hasVotedFor: function(entry) {
    return this.props.hasVoted === entry
  },

  render: function() {
    return (
      <div className='voting' >
        {this._getPair().map((entry) => {
          return (
            <button key={entry}
                    disabled={this._isDisabled()}
                    onClick={() => this.props.vote(entry)}>
              <h1>{entry}</h1>
              {this._hasVotedFor(entry) ?
                <div className='label' >Voted</div> :
                null}
            </button>
          )
        }
        )}
      </div>
    )
  }

});
