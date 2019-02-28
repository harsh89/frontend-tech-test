import React from 'react'
import PropTypes from 'prop-types';

const ListItem = ({item, onItemClick, onCloseClick}) => {
  let listClass = item.completed ? 'listitem complete' : 'listitem pending';

  return (
    <label className={listClass} >
      {/* <input className="inp-checkbox" checked = {item.completed ? 'checked' : ''} type="checkbox" name="checkbox" value="value" onClick={onItemClick.bind(null, item)}/>{item.title} */}
      <div class="funkyradio">
        <div className="funkyradio-success">
            <input type="checkbox" name="checkbox" id={item.id} onClick={onItemClick.bind(null, item)} checked = {item.completed ? 'checked' : ''}/>
            <label for={item.id}>{item.title}</label>
        </div>
      </div>
      <button type="button" class="close" onClick={onCloseClick.bind(null, item.id)} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </label>
  )
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ListItem
