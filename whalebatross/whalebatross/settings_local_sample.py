import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'my^c00L^S3cR3tk3y'

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'mywebsite.com']

# use mysql
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'my_db',
#         'USER': 'my_db_user',
#         'PASSWORD': 'pa55w0rD',
#     }
# }

# OR

# use sqlite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}