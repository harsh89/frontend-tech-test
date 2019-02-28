import React from 'react'
import PropTypes from 'prop-types';

const InputComp = ({onInputClick}) => {

  return (
    <div class="form-group">
      <label for="todoTitle">Enter todo list item</label>
      <input type="text" maxLength="30" onKeyUp={onInputClick.bind(this)} class="form-control" id="todoTitle" aria-describedby="todo list title" placeholder="Todo item"/>
      <small id="textHelp" class="form-text text-muted">Enter the list name and press enter</small>
    </div>
  )
}

InputComp.propTypes = {
  item: PropTypes.object.isRequired
};

export default InputComp
