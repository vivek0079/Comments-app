from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Comment(models.Model):
    user        = models.ForeignKey(User, null=True, blank=True)
    url         = models.URLField()
    content     = models.TextField()
    allow_annon = models.BooleanField(default=True)
    timestamp   = models.DateTimeField(auto_now_add=True)
    updated     = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url