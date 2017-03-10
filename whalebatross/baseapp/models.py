from __future__ import unicode_literals
import datetime
from django.utils.translation import ugettext_lazy as _
from django.db.models import permalink
from django.contrib.auth.models import User
from django.conf import settings
from django.db import models
from tinymce.models import HTMLField
from django.utils import timezone
import re

# Create your models here.

class Category(models.Model):
    """Category model."""
    title = models.CharField(_('title'), max_length=100)
    slug = models.SlugField(_('slug'), unique=True)

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        db_table = 'blog_categories'
        ordering = ('title',)

    def __unicode__(self):
        return u'%s' % self.title


class Post(models.Model):
    """Post model."""
    STATUS_CHOICES = (
        (1, _('Draft')),
        (2, _('Public')),
    )
    title = models.CharField(_('title'), max_length=200)
    slug = models.SlugField(_('slug'), unique=True)
    author = models.ForeignKey(User, blank=True, null=True)
    body = HTMLField(_('body'), blank=True)
    excerpt = models.TextField(_('excerpt'), blank=True, help_text=_('Concise text suggested.'))
    status = models.IntegerField(_('status'), choices=STATUS_CHOICES, default=2)
    allow_comments = models.BooleanField(_('allow comments'), default=True)
    publish = models.DateTimeField(_('publish'), default=lambda: timezone.localtime(timezone.now()))
    created = models.DateTimeField(_('created'), auto_now_add=True)
    modified = models.DateTimeField(_('modified'), auto_now=True)
    categories = models.ManyToManyField(Category, blank=True)

    class Meta:
        verbose_name = _('post')
        verbose_name_plural = _('posts')
        db_table  = 'blog_posts'
        ordering  = ('-publish',)
        get_latest_by = 'publish'

    def __unicode__(self):
        return u'%s' % self.title

    def save(self, *args, **kwargs):
        if not getattr(self, 'excerpt'):
            s = re.compile('<!-- ?more ?-->.*', re.DOTALL)
            self.excerpt = re.sub(s, '', self.body)
        super(Post, self).save(*args, **kwargs)

class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.__class__.objects.exclude(id=self.id).delete()
        super(SingletonModel, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        try:
            return cls.objects.get()
        except cls.DoesNotExist:
            return cls()

class SiteSettings(SingletonModel):
    title = models.CharField(_('title'), max_length=200)
    logo = models.ImageField(upload_to='sitesettings/logo/', max_length=255, null=True, blank=True)
    class Meta:
        verbose_name = _('site settings')
        verbose_name_plural = _('site settings')
