import React from 'react';
import PropTypes from 'prop-types';

const PriceOperationLine = props => (
  <tr>
    <td>{props.operation}</td>
    <td>{props.gasCost}</td>
    <td>{props.gasCost / (10 ** 9).toFixed(9)}</td>
    <td>{(((props.gasCost * props.gasCostSafe) / (10 ** 9)) * props.ethToEur).toFixed(2)} €</td>
    <td>{(((props.gasCost * props.gasCostAverage) / (10 ** 9)) * props.ethToEur).toFixed(2)} €</td>
    <td>{(((props.gasCost * props.gasCostFast) / (10 ** 9)) * props.ethToEur).toFixed(2)} €</td>
    <td>{(((props.gasCost * props.gasCostFastest) / (10 ** 9)) * props.ethToEur).toFixed(2)} €</td>
  </tr>
);

PriceOperationLine.propTypes = {
  operation: PropTypes.string.isRequired,
  gasCost: PropTypes.number.isRequired,
  ethToEur: PropTypes.number.isRequired,
  gasCostSafe: PropTypes.number.isRequired,
  gasCostAverage: PropTypes.number.isRequired,
  gasCostFast: PropTypes.number.isRequired,
  gasCostFastest: PropTypes.number.isRequired,
};

export default PriceOperationLine;
