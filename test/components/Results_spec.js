import React from 'react/addons';
import ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import { Results } from '../../src/components/Results';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } = React.addons.TestUtils;

describe('Results', () => {

  it('renders entries with a vote count or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} /> );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map((e) => { return (e.textContent) });
    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when the next button is clicked', () => {
    let nextInvoked = false;
    const next = () => { return nextInvoked = true };
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next} /> );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when their is one', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               winner='Trainspotting' /> );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

});
