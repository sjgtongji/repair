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
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../util/Constant';
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
		multiline : false
	}

	render() {
		const {classes,className} = this.props;
		return (
			<FormControl fullWidth={true} margin='normal'>
				<InputLabel>{this.props.label}</InputLabel>
				{
					this.props.multiline?
					<Input {...this.props} className={classNames(className,classes.inputMultiline)} margin="dense" classes={{input : classes.inputMultiline}}/>:
					<Input
						 {...this.props}  margin="dense" className={classNames(className, classes.root)} />
				}
			</FormControl>
		);
	}
}
const styles = theme => ({
	root : {
		height : Constant.window.height * 0.06
	},
	inputMultiline : {
		height : Constant.window.height * 0.20,
		fontSize : 36,
		paddingTop : 10
	},
	label : {
		marginBottom : 100
	}
});
export default withStyles(styles)(FlexInput);
