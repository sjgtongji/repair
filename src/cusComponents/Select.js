
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
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Radio,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Select
}from '@material-ui/core';
var common = require('../css/common.css')
var css = require('../css/Select.css')
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../util/Constant';
class CusSelect extends Component {

	constructor(props){
		super(props)
		this.state = {
	    selectedOption: '',
			value : ''
	  }
	}

	static propTypes = {
		...Select.propTypes,
		label: PropTypes.string.isRequired,
		data : PropTypes.array.isRequired,
	}

	static defaulPropTypes = {
		...Select.defaulPropTypes,
	}

	onSelect(event){
		let id = event.target.value;
		this.setState({value : id})
		for(var i = 0 ; i < this.props.data.length ; i++){
			if(this.props.data[i].id == id){
				this.props.onChange(this.props.data[i]);
			}
		}
	}
	render() {

		// <TextField
		// 		fullWidth
		// 		id="select"
		// 		select
		// 		margin="normal"
		// 		classes={{root : common.inputroot}}
		// 		SelectProps={{
		// 			native: true
		// 		}}
		// 		inputProps={{type : 'text'}}
		// 		{...this.props}
		// 		onChange={this.onStoreChange.bind(this)}
		// 		value={this.state.display}>
		// 		{this.props.data.map(item => (
		// 			<option key={item.id} value={item.id} className={common.selectOption}>
		// 				{item.menuName}
		// 			</option>
		// 		))}
		// </TextField>



		const {classes,className} = this.props;
		return (

			<FormControl fullWidth={true}>
				<InputLabel>{this.props.label}</InputLabel>
				<Select {...this.props} multiple={false} onChange={this.onSelect.bind(this)} value={this.state.value}
					input={<Input className={classes.root} margin='dense'></Input>}
					classes={{icon : css.icon}}>
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
const styles = theme => ({
	root : {
		height : Constant.window.height * 0.06,
	},
	inputMultiline : {
		height : Constant.window.height * 0.20,
		fontSize : 36
	}
});
export default withStyles(styles)(CusSelect);
