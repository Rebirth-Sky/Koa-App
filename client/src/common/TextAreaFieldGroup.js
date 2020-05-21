import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';



const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
    const classname = classnames("form-control form-control-lg",
        { 'is-invalid': error }
    )
    return (<div className="form-group">
        <textarea
            name={name}
            value={value || ''}
            onChange={onChange}
            className={classname}
            placeholder={placeholder} />
        {
            info && (<small className="form-text text-muted">{info}</small>)
        }
        {
            error && (<div className="invalid-feedback">{error}</div>)
        }
    </div>)
}
TextAreaFieldGroup.protoTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string
}

export default TextAreaFieldGroup