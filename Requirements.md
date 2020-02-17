## BACK-END REQUIREMENTS

### Pip installation:

```
$ sudo apt install python-pip
```

### Flask installation:

```
$ pip install Flask
```

### Flask_PyMongo Installation:

```
$ pip install Flask-PyMongo
```

### Pymongo installation:

```
$ python -m pip install pymongo
```

### Jwt Installation:

```
$ pip install jwt
```

### Flask-CORS Installation:

```
$ pip install -U flask-cors
```

### MongoDB installation:

**Step 1:**

```
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
```

**Step 2:**

```
$ echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
```

**Step 3:**

```
$ sudo apt-get update
```

**Step 4:**

```
$ sudo apt-get install -y mongodb-org
```

**Starting the server**

```
$ sudo service mongod start
```

**Stopping the server**

```
$ sudo service mongod stop
```

**Restart the server**

```
$ sudo service mongod restart
```

## FRONT-END REQUIREMENTS

### NPM installation:

```
$ npm install
```

### Axios Installation:

```
$ npm install axios
```

### React-Router-Dom Installation:

```
$ npm install --save react-router-dom
```

### Material-UI Installation:

```
$ npm install @material-ui/core
$ npm install @material-ui/icons
```

### To run the application:

**Step 1:**

Navigate to the folder where **server.py** is located and type the following commands in the terminal to run flask

```
$ export FLASK_ENV=development 
$ export FLASK_APP=server.py
$ flask run
```

**Step 2:**

Open new tab in the terminal and type the following command to run the mongoDB server

```
$ sudo service mongod start
[It will ask for the password and once it is done run below command]
$ mongod
```

**Step 3:**

Open new tab in the terminal and navigate to the folder where the **src** folder is located and run the following command

```
$ npm start
```

