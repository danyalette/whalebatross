Note: This is a work in progress!

## Installation

### clone the repo
    $ git clone https://github.com/danyalette/whalebatross.git

### install python dependencies

    $ cd whalebatross
    $ virtualenv venv
    $ source venv/bin/activate
    $ pip install -r requirements.txt

If you're missing some dependencies, and you're on a mac, this might help:

    $ xcode-select --install

### create settings_local file
    $ cp whalebatross/whalebatross/settings_local_sample.py whalebatross/whalebatross/settings_local.py

### create admin user
enter the django project directory (containing the file `manage.py`):

    $ cd whalebatross
    $ ./manage.py createsuperuser

### initialize database:

    $ ./manage.py makemigrations
    $ ./manage.py migrate

### build the js bundle:
    $ npm install
    $ ./node_modules/.bin/webpack --config webpack.config.js
    $ ./manage.py collectstatic

For development, you may wish to use webpack's watcher. In order to avoid having to do collectstatic every time, create a symlink.

    $ rm -R static/baseapp
    $ ln -s assets/baseapp static/baseapp
    $ ./node_modules/.bin/webpack --config webpack.config.js --watch

### run a development server:
    $ ./manage.py runserver

You may now go to http://localhost:8000 in the browser.
Log in to the admin panel at http://localhost:8000/admin.
