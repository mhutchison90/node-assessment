var userData = require('./userData.json');

module.exports = {
    getUsers: (req, res) => {
        var { age, lastname, email, favorites } = req.query;
        let dataToSend = userData

        if (Object.keys(req.query).length >= 1) {

            if (lastname) {
                dataToSend = userData.filter((user) => {
                    return user.last_name.toLowerCase() === lastname.toLowerCase() ? true : false;
                })
            }
            else if (email) {
                dataToSend = userData.filter((user) => {
                    return user.email.toLowerCase() === email.toLowerCase() ? true : false;
                })
            }
            else if (age) {
                dataToSend = userData.filter((user) => {
                    return user.age < age ? true : false;
                })
            }
            else if (favorites) {
                dataToSend =
                    userData.filter((user) => {
                        return user.favorites.includes(favorites) ? true : false;
                    })
            }
            res.status(200).send(dataToSend)
        } else {
            res.status(200).send(dataToSend)
        }
    },
    getUser: (req, res) => {
        var { id } = req.params;
        let dataToSend = userData.filter((user) => {
            return user.id == id ? true : false;
        });
        dataToSend.length === 1 ? res.status(200).send(dataToSend[0]) : res.status(404).json(null);
    },
    getAdmins: (req, res) => {
        let dataToSend = userData.filter((user) => {
            return user.type == 'admin' ? true : false;
        });
        res.status(200).send(dataToSend);
    },
    nonAdmins: (req, res) => {
        let dataToSend = userData.filter((user) => {
            return user.type !== 'admin' ? true : false;
        });
        res.status(200).send(dataToSend);
    },
    getUserByType: (req, res) => {
        var { userType } = req.params;
        let dataToSend = userData.filter((user) => {
            return user.type == userType ? true : false;
        });
        res.status(200).send(dataToSend);
    },
    updateUser: (req, res) => {
        var { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        var { userId } = req.params;

        let dataToSend
        userData.map((users) => {

            if (users.id == userId) {

                users.first_name = first_name;
                users.last_name = last_name;
                users.email = email;
                users.gender = gender;
                users.language = language;
                users.age = age;
                users.city = city;
                users.state = state;
                users.type = type;
                users.favorites = favorites;
                dataToSend = users;
                res.status(200).send(userData)

            }

        });
    },
    addUser: (req, res) => {
        var { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;     
        userData.push(Object.assign({'id': userData[userData.length - 1].id + 1}, req.body));
        res.status(200).send(userData);
    },
    deleteUser: (req, res) => {
            var { userId } = req.params;
            userData.map((user,i) => {
                user.id == userId? userData.splice(i, 1):null
            });
            res.status(200).send(userData)
        },
    }


