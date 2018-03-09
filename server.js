// All of your server code and endpoints will be in this file.

const express = require('express')
  , bodyParser = require('body-parser')
  , usersCtrl = require('./usersCtrl')
  , app = express();

app.use(bodyParser.json());



// ENDPOINTS:
app.get('/api/users', usersCtrl.getUsers)
app.get('/api/users/:id', usersCtrl.getUser)
app.get('/api/admins', usersCtrl.getAdmins)
app.get('/api/nonadmins', usersCtrl.nonAdmins)
app.get('/api/user_type/:userType', usersCtrl.getUserByType)

app.put('/api/users/:userId', usersCtrl.updateUser)

app.post('/api/users', usersCtrl.addUser)

app.delete('/api/users/:userId', usersCtrl.deleteUser)

// PORT 
const PORT = 3000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
