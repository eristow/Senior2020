/**
 *
 * Block
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Block() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Block.propTypes = {};

export default Block;
