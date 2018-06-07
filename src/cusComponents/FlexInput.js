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
    type : 'text',
    placeholder : ''
  }
    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
      event.preventDefault();
    };

    handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };


    render() {
      return (
        <FormControl>
          <InputLabel htmlFor="adornment-password">{this.props.label}</InputLabel>
          <Input
            {...this.props}
            type={this.props.type}
						value={this.state.password}
						onChange={this.handleChange('value')}/>
        </FormControl>
      );
    }
  }

  const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis : 50
    }
  });
export default FlexInput;
