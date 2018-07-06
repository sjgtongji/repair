
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
class CusSelect extends Component {

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
			if(this.props.data[i].storeId == id){
				this.props.onChange(this.props.data[i]);
			}
		}
	}
	componentDidMount(){
		this.setState({
			data: this.props.data
		})
	}
	onOpen(event){
		console.log('onOpen');
		this.setState({
			open : true,
			anchorEl : event.target,
			disabled : true
		})
	}
	handleClose(item){
		console.log(item);
		this.setState({
			anchorEl : null,
			value: item.storeName
		},() => {
			this.setState({
				disabled : false
			})
		})
		this.props.onChange && this.props.onChange(item);
	}
	onSearch(event){
		if(event.target.value == ''){
			this.setState({
				data : this.props.data
			})
		}else{
			console.log(event.target.value);
			let data = [];
			for(var i = 0 ; i < this.props.data.length ; i++){
				if(this.props.data[i].storeName.indexOf(event.target.value) > -1){
					data.push(this.props.data[i]);
				}
			}
			this.setState({
				data : data
			})
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
				<Input {...this.props}
					className={classNames(className, classes.root)} onFocus={(event) => this.onOpen(event)}
					autoFocus={false}
					value={this.state.value}
					disabled={this.state.disabled}
					endAdornment={
							<InputAdornment position="end">
								<IconButton>
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
							{/* <MenuItem className={classes.search}>
								<Input
									className={classes.input}
									startAdornment={
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									}
									fullWidth
									onChange={(event) => this.onSearch(event)}
								/>
							</MenuItem> */}
							{this.props.data.map(item => (
								<MenuItem key={item.storeId} onClick={(event) => this.handleClose(item)}>
									{item.storeName}
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
export default withStyles(styles)(CusSelect);
