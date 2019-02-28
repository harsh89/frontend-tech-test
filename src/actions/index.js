const BASE_URL = 'http://localhost:3000/api/task/';

export const addItem = (title) => {
  let url = BASE_URL + 'create/' + `${title}`;

  return function (dispatch) {
    return fetch(url, {
        method: "POST"
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + ' ' + response.statusText);
        }
        return response.json();
      }).then(json => {
        dispatch({
          type: "ADD_ITEM",
          payload: json
        });
      }).catch(error => {
        return dispatch({
          type: "ERROR_STATE",
          payload: error.message
        })
      })
  };
}

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleItem = (item) => {
  let url =  BASE_URL + 'update/' + `${item.id}` + '/' + `${item.title}` + '/' + `${item.completed}`;

  return function (dispatch) {
    return fetch(url, {
        method: "PUT"
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + ' ' + response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json)
          dispatch({
            type: "TOGGLE_ITEM",
            payload: json
          });
      })
      .catch(error => {
        return dispatch({
          type: "ERROR_STATE",
          payload: error.message
        })
      });
  }
}


export const deleteItem = (id) => {
  let url =  BASE_URL + 'delete/' + `${id}`;

  return function (dispatch) {
    return fetch(url, {
        method: "DELETE"
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + ' ' + response.statusText);
        }
        return response.json();
      })
      .then(json => {
        if (json)
          dispatch({
            type: "DELETE_ITEM",
            payload: json
          });
      })
      .catch(error => {
        return dispatch({
          type: "ERROR_STATE",
          payload: error.message
        })
      });
  }
}

export const getAllTodos = () => {
  let url = 'http://localhost:3000/api/tasks';

  return function (dispatch) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + ' ' + response.statusText);
        }
        return response.json();
      })
      .then(json => {
        dispatch({
          type: "GET_INITIAL",
          payload: json
        });
      }).catch(error => {
        return dispatch({
          type: "ERROR_STATE",
          payload: error.message
        })
      });
  };
}
