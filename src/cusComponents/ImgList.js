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
  GridList,
  GridListTile,
  GridListTileBar
}from '@material-ui/core';
import * as Constant from '../util/Constant';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import SeeIcon from '@material-ui/icons/ZoomIn';
import CrossIcon from '@material-ui/icons/Close';
var classNames = require('classnames');
class ImgList extends Component {

	constructor(props){
		super(props)
    this.state = {
      data : this.props.data
    }
	}

	static propTypes = {
		...GridList.propTypes,
    data : PropTypes.array.isRequired,
    onDelete : PropTypes.func.isRequired,
    onZoom : PropTypes.func.isRequired,
    onAdd : PropTypes.func.isRequired
	}

	static defaulPropTypes = {
		...GridList.defaulPropTypes
	}

	render() {
		const {classes , className} = this.props;
		return (
      <GridList cols={3.5} spacing={2} cellHeight={Constant.window.height * 0.25} className={classes.gridList}>
        {
          this.state.data.map((item,i) => (


                item.imgId?
                  <GridListTile key={i} className={classes.root}>
                    <div className={classes.root}>
                      <img src={item.imgId} width={Constant.window.width * 0.25} height={Constant.window.height * 0.25} alt=""></img>
                      <div className={classes.listheader}>
                        <IconButton>
                          <DeleteIcon className={classes.icon} onClick={(event) => this.props.onDelete(item)}/>
                        </IconButton>
                        <IconButton>
                          <SeeIcon className={classes.icon} onClick={(event) => this.props.onZoom(item)}/>
                        </IconButton>
                      </div>
                    </div>

                  </GridListTile>:
                  <GridListTile key={i} className={classes.root}>
                    <div className={classes.root}>
                      <IconButton>
                        <AddIcon onClick={(event) => this.props.onAdd(item)}/>
                      </IconButton>
                    </div>

                  </GridListTile>




          ))
        }
      </GridList>
		);
	}
}
const styles = theme => ({
  root: {
    display: 'flex',
		flexDirection : 'column',
    justifyContent: 'center',
		alignItems:'center',
    height : Constant.window.height * 0.25,
    width : Constant.window.width * 0.25,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    flex : 1
  },
  tile : {
    height : Constant.window.height * 0.25,
    width : Constant.window.width * 0.25,
  },

  listheader : {
    position : 'absolute',
    height : Constant.window.height * 0.05,
    width : Constant.window.width * 0.25,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    left : 0,
    right : 0,
    top : 0,
    display : 'flex',
    alignItems : 'center',
    paddingLeft : 10
  },
  icon:{
    color : 'white',
    width : 50
  },
	addIcon : {
		color : 'white',
		width : 100,
		height : 100
	}
});
export default withStyles(styles)(ImgList);
