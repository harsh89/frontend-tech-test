import React, { Component } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../actions/index';

const InputComp = Loadable({
  loader: () => import(/* webpackChunkName: 'inputcomp' */ '../components/InputComp'),
  loading() {
    return <div>Loading...</div>
  }
});

class InputContainer extends Component {
	constructor(props) {
    super(props);
  }

  onInputClick = (event) => {
    console.log('input entered');

    if (event.keyCode === 13) {
      this.props.addItem(event.currentTarget.value);
    }
  }

	render() {
		return (
			<article className="inp-container">
        <InputComp onInputClick = {this.onInputClick}></InputComp>
			</article>
		);
	}
}

const mapStateToProps = (state) => {
  return {
      todoList: state.todoList
  };
};

InputContainer.propTypes = {
  todoList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {addItem})(InputContainer);
