import React from 'react';
import Select from 'react-select';

const Typehead = (props) => (
	<div className="form-group">
		
		<Select
	        name={props.name}
	        defaultValue="lucy"
	        options={props.options}
	        onChange={props.controlFunc} />
	</div>
);

Select.propTypes = {
	name: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	controlFunc: React.PropTypes.func.isRequired,
	content: React.PropTypes.string
};

export default Typehead;
