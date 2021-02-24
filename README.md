# Social Network

Object of this task is to create a simple REST API.
Using Django and Django rest framework, React, Redux.

--------

**How to run**:
* Clone project
* pipenv shell
* pipenv install --skip-lock
* npm install
* npm run build
* python3 manage.py migrate
* python3 manage.py runserver
* Then go to the localhost:8000 in your browser

**Functionality**:
* Register, Login
* Create, Delete, Like, Dislike Posts.
* In 'my posts' page you can see only posts create by yourself.
* In 'feed' page you can see all posts created by other users.

**BOT**:
* python3 manage.py activate_bot (works only after applying migrations).
