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
var common = require('../css/common.css')
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
			<FormControl fullWidth={true}>
				<InputLabel htmlFor="adornment-password" FormLabelClasses={{asterisk : common.inputlabel}}>{this.props.label}</InputLabel>
				{
					this.props.multiline?
					<Input {...this.props}/>:
					<Input
						classes={{root : common.inputroot}} className={common.input} {...this.props}/>
				}

			</FormControl>
		);
	}
}

export default FlexInput;
