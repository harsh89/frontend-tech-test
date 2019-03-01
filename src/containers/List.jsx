import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTodos, toggleItem, deleteItem } from '../actions/index';
import debounce from 'lodash.debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loadable from 'react-loadable';

const ListItem = Loadable({
  loader: () => import(/* webpackChunkName: 'listitem' */ '../components/ListItem'),
  loading() {
    return <div>Loading...</div>
  }
});

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllTodos();
  }

  onListItemClick = debounce((item) => {
    item.completed = !item.completed;
    this.props.toggleItem(item);
  }, 200)

  onCloseClick = debounce((id) => {
    this.props.deleteItem(id);
  }, 100)

  invokeToast = (isErrorState, message) => {
    if(isErrorState) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  render() {
    console.log(this.props.todoList);
    const todoList = this.props.todoList.tasks || [];
    return (
      <article className="list">
        {todoList.map(item => {
          return <ListItem item={item} onItemClick={this.onListItemClick} onCloseClick={this.onCloseClick}></ListItem>
        })}
        {this.props.todoList.message !== '' && this.invokeToast(this.props.todoList.isErrorStateActive, this.props.todoList.message)}
        <div>
          <ToastContainer />
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList
  };
};

List.propTypes = {
  todoList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { getAllTodos, toggleItem, deleteItem })(List);
