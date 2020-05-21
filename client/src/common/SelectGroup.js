import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';



const SelectGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value} >{option.value}</option>
    ));
    const classname = classnames("form-control form-control-lg",
        { 'is-invalid': error }
    )
    return (<div className="form-group">
        <select
            name={name}
            value={value || ''}
            onChange={onChange}
            className={classname} >
            {selectOptions}
        </select>
        {
            info && (<small className="form-text text-muted">{info}</small>)
        }
        {
            error && (<div className="invalid-feedback">{error}</div>)
        }
    </div>)
}
SelectGroup.protoTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    options: PropTypes.array.isRequired
}

export default SelectGroup