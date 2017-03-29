/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from 'hack-oregon-react-component-library/src/Navigation/Header';
import Table from './table';
import { getTestData } from '../../state/selectors/app';
import { fetchDemoData } from '../../state/app';

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

function App({ children, testData, onDataRequest }) {
  return (
    <Container>
      <Header title="Test" />
      {React.Children.toArray(children)}
      <button onClick={() => onDataRequest()}>Fetch Data</button>
      # Bedrooms:
      <select onChange={event => onDataRequest(event.target.value)}>
        <option value="Studio">Studio</option>
        <option value="1-BR">1</option>
        <option value="2-BR">2</option>
        <option value="3-BR">3</option>
        <option value="Homeownership">Owned</option>
      </select>
      <Table rows={testData} />
    </Container>
  );
}

App.displayName = 'App';
App.defaultProps = {
  children: <div />,
  testData: [],
  onDataRequest: () => {},
};

App.propTypes = {
  children: React.PropTypes.node,
  testData: React.PropTypes.array,
  onDataRequest: React.PropTypes.func,
};

const mapDispatch = dispatch => ({
  onDataRequest: (size) => {
    dispatch(fetchDemoData({
      demographic: 'Couple+with+Family',
      housing_size: size || 'Studio',
    }));
  },
});

const mapProps = state => ({
  testData: getTestData(state),
});

const ConnectedApp = connect(mapProps, mapDispatch)(App);

export default ConnectedApp;
