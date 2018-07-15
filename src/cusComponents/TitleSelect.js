
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
	Select,
	Menu
}from '@material-ui/core';
var common = require('../css/common.css')
var css = require('../css/Select.css')
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../util/Constant';
var classNames = require('classnames');
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/Search';
const ITEM_HEIGHT = 48;

class TitleSelect extends Component {

	constructor(props){
		super(props)
		this.state = {
	    selectedOption: '',
			value : '',
			open: false,
			anchorEl: null,
			data: this.props.data,
			disabled: false
	  }
		this.input = React.createRef();
	}

	static propTypes = {
		...Select.propTypes,
		label: PropTypes.string.isRequired
	}

	static defaulPropTypes = {
		...Select.defaulPropTypes,
	}

	onOpen(event){
		console.log('onOpen');
		const node = this.input.current
		this.setState({
			open : true,
			anchorEl : ReactDom.findDOMNode(node),
			disabled : true
		})
	}
	handleClose(item){
		console.log(item);
		this.setState({
			anchorEl : null,
			value: item
		},() => {
			this.props.onChange && this.props.onChange(item);
			setTimeout(() => {
				this.setState({
					disabled : false
				})
			}, 500);
		})

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

		// <FormControl fullWidth={true} margin='dense'>
		// 	<InputLabel className={classes.label}>{this.props.label}</InputLabel>
			// <Select {...this.props} multiple={false} onChange={this.onSelect.bind(this)} value={this.state.value}
			// 	classes={{icon : css.icon}} margin="normal">
			// 	{
			//
			// 		this.props.data.map(item => (
			// 			<MenuItem key={item.storeId} value={item.storeId}>{item.storeName}</MenuItem>
			// 		))
			// 	}
			// </Select>
		// </FormControl>

		const {classes,className} = this.props;
		return (
			<FormControl fullWidth={true}>
				<InputLabel>{this.props.label}</InputLabel>
				<Input
					ref={this.input}
					{...this.props}
					className={classNames(className, classes.root)} onFocus={(event) => this.onOpen(event)}
					autoFocus={false}
					value={this.state.value}
					disabled={this.state.disabled}
					endAdornment={
							<InputAdornment position="end">
								<IconButton onClick={() => this.onOpen()}>
									<ArrowDropDownIcon></ArrowDropDownIcon>
								</IconButton>
							</InputAdornment>
						}/>
						<Menu
							open={Boolean(this.state.anchorEl)}
							anchorEl={this.state.anchorEl}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 7.5,
									width: this.state.anchorEl? this.state.anchorEl.getBoundingClientRect().right - this.state.anchorEl.getBoundingClientRect().left : 0
								}
							}}>
							{Constant.titles.map(item => (
								<MenuItem key={item} onClick={(event) => this.handleClose(item)}>
									{item}
								</MenuItem>
							))}
						</Menu>
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
	},
	label : {
		paddingBottom : 100
	},
	search : {
		height : Constant.window.height * 0.06,
	}
});
export default withStyles(styles)(TitleSelect);
