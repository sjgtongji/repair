import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	FormHelperText,
	FormControl,
	TextField,
	MenuItem,
	Visibility,
	VisibilityOff
}from '@material-ui/core';
var classNames = require('classnames');
class FlexInput extends Component {

	constructor(props){
		super(props)
		this.state = {
			value : this.props.value ? this.props.value : ''
		}
	}

	static propTypes = {
		...Input.propTypes,
		label: PropTypes.string.isRequired
	}

	static defaulPropTypes = {
		...Input.defaulPropTypes,
	}

	render() {
		return (
			<FormControl>
				<InputLabel htmlFor="adornment-password">{this.props.label}</InputLabel>
				<Input
					{...this.props}/>
			</FormControl>
		);
	}
}

export default FlexInput;
