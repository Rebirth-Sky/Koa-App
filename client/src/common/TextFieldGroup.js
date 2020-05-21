import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';



const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    const classname = classnames("form-control form-control-lg",
        { 'is-invalid': error }
    )
    return (<div className="form-group">
        <input type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            className={classname}
            disabled={disabled}
            placeholder={placeholder} />
        {
            info && (<small className="form-text text-muted">{info}</small>)
        }
        {
            error && (<div className="invalid-feedback">{error}</div>)
        }
    </div>)
}
TextFieldGroup.protoTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.object,
    error: PropTypes.string,
    info: PropTypes.string,
    disabled: PropTypes.string
}
TextFieldGroup.defaultProps = {
    type: "text"
}
export default TextFieldGroup