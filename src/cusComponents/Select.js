
import React, {Component} from 'react';
import ReactDom from 'react-dom';
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
	Select,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Radio,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText
}from '@material-ui/core';
var common = require('../css/common.css')
class CusSelect extends Component {

	constructor(props){
		super(props)
	}

	static propTypes = {
		...TextField.propTypes,
		label: PropTypes.string.isRequired,
		data : PropTypes.array.isRequired,
	}

	static defaulPropTypes = {
		...Select.defaulPropTypes,
	}


	render() {


		// <TextField
		// 		fullWidth
		// 		id="select"
		// 		select
		// 		margin="none"
		// 		classes={{root : common.inputroot}}
		// 		SelectProps={{
		// 		  native: true
		// 		}}
		// 		{...this.props}>
		// 		{this.props.data.map(item => (
		// 			<option key={item.id} value={item.id} className={common.selectOption}>
		// 				{item.menuName}
		// 			</option>
		// 		))}
		// </TextField>
		return (
			<FormControl fullWidth={true}>
				<InputLabel>{this.props.label}</InputLabel>
				<Select {...this.props} input={<Input classes={{root : common.inputroot}} className={common.input}></Input>}>
					{

						this.props.data.map(item => (
							<MenuItem key={item.id} value={item.id}>{item.menuName}</MenuItem>
						))
					}
				</Select>
			</FormControl>


		);
	}
}

export default CusSelect;
