import React, { Component } from 'react';
import { arrayOf, string, shape, number } from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>Table</div>
    );
  }
}

const mapStateToProps = ({ expenses }) => ({
  expenses,
});

Table.defaultProps = {
  expenses: [{
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangesRates: {},
  }],
};

Table.propTypes = {
  expenses: arrayOf(shape({
    id: number,
    value: string,
    description: string,
    currency: string,
    method: string,
    tag: string,
    exchangesRates: shape({}),
  })),
};

export default connect(mapStateToProps)(Table);
