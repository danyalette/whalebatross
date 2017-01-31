NOTE: This is not a comprehensive instructional - just some rough notes I made during setup.

(assuming you're on ubuntu)

helpful instructions on django + nginx:
https://uwsgi-docs.readthedocs.io/en/latest/tutorials/Django_and_nginx.html

- make project folder and enter it
`mkdir /var/www/mungobungo/html`
`cd /var/www/mungobungo/html`
- install nginx, uwsgi, virtualenv, mysql globally
- create and activate your venv
`virtualenv env`
`source env/bin/activate`
- create your django project and main app:
`django manage.py startproject mungobungo`
`cd my_new_project`
`django manage.py startapp baseapp`
and now set your static root in `settings.py`

    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, "static/")

and add your new app to your project's settings:

    INSTALLED_APPS = [
        ...
        'baseapp'
    ]

and collect your static files there:  
`python manage.py collectstatic`

- add an import to the bottom of `settings.py` for secret local settings:

    from settings_local import *

and create the file `settings_local.py` in the same directory as `settings.py`.
move secret configurations from `settings.py` to `settings_local.py`, such as `SECRET_KEY`.

- set timezone in settings file:

    TIME_ZONE = 'America/Toronto'

- create a `.gitignore` file in the same directory as `settings.py`. you may wish to initalize a repo as well.
add the following to `.gitignore`:

`*.pyc`

- to use mysql:

    sudo apt-get install libmysqlclient-dev
    pip install MySQL-python
    mysql -u root -p
    >>> create database new_db;
    >>> grant all on new_db.* to 'new_user'@'localhost' identified by 'm7P@55word';

and add to `settings_local.py`:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'new_db',
            'USER': 'new_user',
            'PASSWORD': 'm7P@55word',
        }
    }
and populate your database:
`django manage.py makemigrations`
`django manage.py migrate`

- create a django superuser:
`django manage.py createsuperuser`

- create your nginx config in order to use uwsgi (`/etc/nginx/sites-available/mysite_nginx.conf`)

    upstream django {
        # server 127.0.0.1:8001; # for a web port socket
        server unix:///var/www/mungobungo/html/mungobungo.sock; # for a file socket
    }

    server {
    	listen 80;
    	listen [::]:80;
    	charset     utf-8;
    	server_name mungobungo.com;
      client_max_body_size 75M;   # adjust to taste
    	location /media  {
    			alias /var/www/mungobungo/html/mungobungo/media;  # your Django project's media files - amend as required
    	}
    	location /static {
    			alias /var/www/mungobungo/html/mungobungo/static; # your Django project's static files - amend as required
    	}
    	location / {
    			uwsgi_pass  django;
    			include     /var/www/mungobungo/html/uwsgi_params; # the uwsgi_params file you installed
    	}
    }

`sudo ln -s /etc/nginx/sites-available/mysite_nginx.conf /etc/nginx/sites-enabled/`

and a `uwsgi_params` file (in the location specific in the nginx config file): (paste in the following as is)

    uwsgi_param  QUERY_STRING       $query_string;
    uwsgi_param  REQUEST_METHOD     $request_method;
    uwsgi_param  CONTENT_TYPE       $content_type;
    uwsgi_param  CONTENT_LENGTH     $content_length;

    uwsgi_param  REQUEST_URI        $request_uri;
    uwsgi_param  PATH_INFO          $document_uri;
    uwsgi_param  DOCUMENT_ROOT      $document_root;
    uwsgi_param  SERVER_PROTOCOL    $server_protocol;
    uwsgi_param  REQUEST_SCHEME     $scheme;
    uwsgi_param  HTTPS              $https if_not_empty;

    uwsgi_param  REMOTE_ADDR        $remote_addr;
    uwsgi_param  REMOTE_PORT        $remote_port;
    uwsgi_param  SERVER_PORT        $server_port;
    uwsgi_param  SERVER_NAME        $server_name;

and a uwsgi ini file:

    # /var/www/mungobungo/html/mungobungo_uwsgi.ini file ()
    #
    # on the command line, in the project dir (where settings.py is) you might do
    # uwsgi --socket mungobungo.sock --module mungobungo.wsgi --chmod-socket=666

    [uwsgi]

    # Django-related settings
    # the base directory (full path) (this is the dir that manage.py is in)
    chdir           = /var/www/mungobungo/html/mungobungo
    # Django's wsgi file
    module          = mungobungo.wsgi
    # the virtualenv (full path)
    home            = /var/www/mungobungo/html/venv

    # process-related settings
    # master
    master          = true
    # maximum number of worker processes
    processes       = 10
    # the socket (use the full path to be safe
    socket          = /var/www/mungobungo/html/mungobungo.sock
    # ... with appropriate permissions - may be needed
    chmod-socket    = 666
    # clear environment on exit
    vacuum          = true
    # remove the following for production
    py-autoreload   = 3

- add line to /etc/rc.local to get uwsgi emperor to run on start up
`/usr/local/bin/uwsgi --emperor /etc/uwsgi/vassals --uid www-data --gid www-data --daemonize /var/log/uwsgi-emperor.log
`
- get your startup stuff running right away: `sudo /etc/rc.local`
- reload nginx after changing config:
`sudo /etc/init.d/nginx restart`
- remove line from uwsgi ini file for prod (checks for py changes every 3 secs)
`py-autoreload   = 3`
- here's how you configure uwsgi to work in emperor mode:

    # create a directory for the vassals
    sudo mkdir /etc/uwsgi
    sudo mkdir /etc/uwsgi/vassals
    # symlink from the default config directory to your config file
    sudo ln -s /var/www/mungobungo/html/mungobungo_uwsgi.ini /etc/uwsgi/vassals/
    # run the emperor
    uwsgi --emperor /etc/uwsgi/vassals --uid www-data --gid www-data

and then run it:

    sudo uwsgi --emperor /etc/uwsgi/vassals --uid www-data --gid www-data

- to reload the uwsgi emperor, just find the pid and kill it:
`ps ax | grep uwsgi`, locate the emperor, and then `sudo kill 12345`

- remove debug line from `settings.py`

- get start using webpack and react (in the dir where the manage.py file is, wiht venv on):
(source: http://owaislone.org/blog/webpack-plus-reactjs-and-django/, with addition for es6 and sass)

`npm init`
`npm install --save-dev react webpack webpack-bundle-tracker babel babel-core babel-loader babel-preset-react babel-preset-es2015 react-dom node-sass sass-loader style-loader css-loader`
`pip install django-webpack-loader`
`mkdir -p assets/baseapp/js`
`touch webpack.config.js`
`touch assets/baseapp/js/index.jsx`
`touch assets/baseapp/js/app.jsx`

start by adding some react code to those files:

app.jsx:

    import React from 'react';

    export default class App  extends React.Component {
      render() {
        return (
          <h1>Hello, worlddddd.</h1>
        );
      }
    }

index.jsx  

    import React from 'react';
    import { render } from 'react-dom';
    import App from './app';
    import './style.scss';

    render((
      <App/>
    ), document.getElementById('react-app'))



and here's your webpack file

    `var path = require("path")
    var webpack = require('webpack')
    var BundleTracker = require('webpack-bundle-tracker')

    module.exports = {
      context: __dirname,

      entry: './assets/baseapp/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

      output: {
          path: path.resolve('./assets/baseapp/bundles/'),
          filename: "[name]-[hash].js",
      },

      plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
      ],

      module: {
        loaders: [
          {
              test: /\.jsx?$/,         // Match both .js and .jsx files
              exclude: /node_modules/,
              loader: "babel",
              query:
                {
                  presets:['es2015', 'react']
                }
          },
          {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
          }
        ],
      },

      resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
      },
    }`

you may need to `ln -s /usr/bin/nodejs /usr/bin/node`.
now compile the bundle:
`./node_modules/.bin/webpack --config webpack.config.js`
or compile and watch:
`./node_modules/.bin/webpack --config webpack.config.js --watch`

add to settings:

    INSTALLED_APPS = [
        ...
        'webpack_loader'
    ]

    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'assets'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
    )


    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'baseapp/bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        }
    }

and do `python manage.py collectstatic`
add to `templates/index.html`:

    {% load render_bundle from webpack_loader %}
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Example</title>
      </head>

      <body>
        <div id="react-app"></div>
        {% render_bundle 'main' %}
      </body>
    </html>

at this stage, you will have to do a collectstatic every time you rebuild the bundle using webpack.

- create rest api (with venv on):
`pip install djangorestframework`
and add settins:
    INSTALLED_APPS = (
        ...
        'rest_framework',
    )

    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAdminUser',
        ],
        'PAGE_SIZE': 10
    }
