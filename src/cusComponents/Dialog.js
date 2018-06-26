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
	Button,
  Dialog,
  CircularProgress,
	Typography
}from '@material-ui/core';
import * as Constant from '../util/Constant';
import { withStyles } from '@material-ui/core/styles';
class CusDialog extends Component {

	constructor(props){
		super(props)
	}

	static propTypes = {
		...Dialog.propTypes
	}

	static defaulPropTypes = {
		...Dialog.defaulPropTypes
	}

  // display(){
  //   this.setState({
  //     open : true
  //   })
  // }

  // hide(){
  //   this.setState({
  //     open : false
  //   })
  // }
	render() {
		const {classes , className} = this.props;
		return (
			<Dialog {...this.props} open={this.props.open} className={styles.root}>
        <CircularProgress className={classes.progress} size={Constant.window.width * 0.1}/>
			</Dialog>
		);
	}
}
const styles = theme => ({
	root : {
		display : 'flex',
    alignItems : 'center',
    justfyContent : 'center'
	},
	progress: {
    margin: Constant.window.width * 0.1,
  },
});
export default withStyles(styles)(CusDialog);
