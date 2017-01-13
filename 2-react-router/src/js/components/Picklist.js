import React from 'react';

const Picklist = (props) => (
	<div className="form-group">
	<label className="form-label">{props.title}</label>
		<select
			name={props.name}
			defaultValue={props.selectedOption}
			onChange={props.controlFunc}
			className="form-select form-control">
			<option value="">{props.placeholder}</option>
			{Object.keys(props.options).map(key => {
            return (
              <option
                key={key}
                value={props.options[key]}>{props.options[key]}
              </option>
            );
          })}
			
			
		</select>
	</div>
);

Picklist.propTypes = {
	name: React.PropTypes.string.isRequired,
	options: React.PropTypes.object.isRequired,
	selectedOption: React.PropTypes.string,
	controlFunc: React.PropTypes.func.isRequired,
	placeholder: React.PropTypes.string
};

export default Picklist;