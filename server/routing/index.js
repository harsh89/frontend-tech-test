const fetch = require('node-fetch');
const path = require('path');
const filePath = path.resolve(__dirname, '../../server-dist/tasks.json');
let taskList = [];

var fs = require('fs');

function appRouting(app) {
  app.get('/api/tasks', (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log('error reading the file');
        throw err;
      } else {
        taskList = JSON.parse(data);
        console.log(taskList);
        return res.status(200).json(taskList);
      }
    });
  });

  /**
   * PUT /task/update/:id/:title/:description
   *
   * id: Number
   * title: string
   * description: string
   *
   * Update the task with the given id.
   * If the task is found and update as well, return a status code 204.
   * If the task is not found, return a status code 404.
   * If the provided id is not a valid number return a status code 400.
   */
  app.put('/api/task/update/:id/:title/:completed', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(req.params);

    if (!!taskList && taskList.length === 0) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log('error writting to file');
          throw err;
        } else {
          console.log('Data read to file under put api');
          taskList = JSON.parse(data);
          updateTask();
        }
      })
    } else {
      updateTask();
    }

    function updateTask() {
      if (!Number.isNaN(id)) {
        const task = taskList.find(item => item.id === id);
        console.log(task);
        console.log('delete');

        if (task !== null) {
          task.title = req.params.title;
          task.completed = (req.params.completed === 'true');

          fs.writeFile(filePath, JSON.stringify(taskList, null, 2), (err) => {
            if (err) {
              console.log('error writting to file');
              throw err;
            } else {
              return res.status(200).json(taskList);
            }
          });
        } else {
          return res.status(404).json({
            message: 'Not found',
          });
        }
      } else {
        return res.status(400).json({
          message: 'Bad request',
        });
      }
    }

  });

  /**
   * POST /task/create/:title/:description
   *
   * title: string
   * description: string
   *
   * Add a new task to the array taskList with the given title and description.
   * Return status code 201.
   */
  app.post('/api/task/create/:title', (req, res) => {
    console.log(req.params);

    if (!!taskList && taskList.length === 0) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log('error writting to file');
          throw err;
        } else {
          console.log('Data read to file under put api');
          taskList = JSON.parse(data);
          addTask();
        }
      })
    } else {
      addTask();
    }

    function addTask() {
      const oldId = Math.max(...taskList.map(o => o.id));

      const newId = (taskList.length === 0 ? 0 : oldId)  + 1;
      console.log(newId);

      const task = {
        id: newId,
        title: req.params.title,
        completed: false
      };

      taskList.push(task);

      console.log(taskList);

      fs.writeFile(filePath, JSON.stringify(taskList, null, 2), (err) => {
        if (err) {
          console.log('error writting to file');
          throw err;
        } else {
          console.log('task added');
          return res.status(200).json(taskList);
        }
      });
    }
  });

  /**
   * DELETE /task/delete/:id
   *
   * id: Number
   *
   * Delete the task linked to the  given id.
   * If the task is found and deleted as well, return a status code 204.
   * If the task is not found, return a status code 404.
   * If the provided id is not a valid number return a status code 400.
   */
  app.delete('/api/task/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (!!taskList && taskList.length === 0) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log('error writting to file');
          throw err;
        } else {
          console.log('Data read to file under put api');
          taskList = JSON.parse(data);
          deleteTask();
        }
      })
    } else {
      deleteTask();
    }

    function deleteTask() {
      if (!Number.isNaN(id)) {
        const task = taskList.find(item => item.id === id);
        console.log(task);

        if (task !== null) {
          const taskIndex = taskList.indexOf(task);
          console.log(taskIndex);
          taskList.splice(taskIndex, 1);
          fs.writeFile(filePath, JSON.stringify(taskList, null, 2), (err) => {
            if (err) {
              console.log('error writting to file');
              throw err;
            } else {
              console.log('task deleted');
              return res.status(200).json(taskList);
            }
          });
        } else {
          return res.status(404).json({
            message: 'Not found',
          });
        }
      } else {
        return res.status(400).json({
          message: 'Bad request',
        });
      }
    }
  });
}

module.exports = appRouting;
