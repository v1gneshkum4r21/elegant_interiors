from django.contrib import admin
from django.contrib.admin.models import LogEntry
from django.contrib.auth.models import User, Group
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

# Register default models
admin.site.register(LogEntry)

# Customize admin index
admin.site.index_title = "Dashboard"
admin.site.site_header = "4th Dimension Administration"
admin.site.site_title = "4th Dimension Admin"

# Custom admin views can be added here 