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
	VisibilityOff,
	Button
}from '@material-ui/core';
var classNames = require('classnames');
var common = require('../css/common.css');
var css = require('../css/HistoryOrder.css')
class HistoryOrder extends Component {

	constructor(props){
		super(props)
	}

	static propTypes = {
		...Button.propTypes
	}

	static defaulPropTypes = {
		...Button.defaulPropTypes
	}

	render() {
		return (
			<div></div>
		);
	}
}
export default HistoryOrder;
