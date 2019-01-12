import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ value, type, name, onChange, ...otherProps }) => (
    <React.Fragment>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            {...otherProps}
        />
    </React.Fragment>
);

TextField.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextField;