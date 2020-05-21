import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';



const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    onChange
}) => {
    const classname = classnames("form-control form-control-lg",
        { 'is-invalid': error }
    )
    return (<div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
        </div>
        <input
            name={name}
            value={value || ''}
            onChange={onChange}
            className={classname}
            placeholder={placeholder} />
        {
            error && (<div className="invalid-feedback">{error}</div>)
        }
    </div>)
}
InputGroup.protoTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.object,
    error: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.string
}
InputGroup.defaultProps = {
    type: "text"
}
export default InputGroup