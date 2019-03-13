import React, { Component } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../actions/index';
import debounce from 'lodash.debounce';

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

  componentDidMount() {
    this.inpDebounceClick =  debounce((event) => {
      if (event.keyCode === 13) {
        this.props.addItem(event.target.value);
      }
    }, 400)
  }

  onInputClick = (event) => {
    event.persist();
    this.inpDebounceClick(event);
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
