SECRET_KEY = 'my^c00L^S3cR3tk3y'

ALLOWED_HOSTS = ['mywebsite.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'my_db',
        'USER': 'my_db_user',
        'PASSWORD': 'pa55w0rD',
    }
}
