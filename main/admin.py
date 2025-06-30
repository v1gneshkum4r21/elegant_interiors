from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Contact, SiteVisit, Category, Project

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'estimate_type', 'created_at', 'status_badge', 'response_button')
    list_filter = ('estimate_type', 'created_at', 'is_responded')
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('created_at',)
    list_per_page = 10
    save_on_top = True
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Request Details', {
            'fields': ('estimate_type', 'message', 'is_responded')
        }),
        ('System Fields', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def status_badge(self, obj):
        if not obj.is_responded:
            return format_html('<span class="badge badge-danger">Pending</span>')
        return format_html('<span class="badge badge-success">Responded</span>')
    
    status_badge.short_description = 'Status'

    def response_button(self, obj):
        if not obj.is_responded:
            return format_html(
                '<button type="button" onclick="markAsResponded({})" '
                'class="btn btn-success btn-sm">Mark as Responded</button>',
                obj.id
            )
        return format_html(
            '<button type="button" onclick="markAsPending({})" '
            'class="btn btn-warning btn-sm">Mark as Pending</button>',
            obj.id
        )
    
    response_button.short_description = 'Action'

    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('toggle-response/<int:contact_id>/',
                 self.admin_site.admin_view(self.toggle_response),
                 name='toggle-response'),
        ]
        return custom_urls + urls

    def toggle_response(self, request, contact_id):
        from django.http import JsonResponse
        try:
            contact = Contact.objects.get(id=contact_id)
            contact.is_responded = not contact.is_responded
            contact.save()
            return JsonResponse({
                'status': 'success',
                'is_responded': contact.is_responded
            })
        except Contact.DoesNotExist:
            return JsonResponse({'status': 'error'}, status=404)

    class Media:
        js = ('js/admin_contact.js',)

@admin.register(SiteVisit)
class SiteVisitAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'path', 'timestamp')
    list_filter = ('timestamp', 'path')
    search_fields = ('ip_address', 'path')
    readonly_fields = ('timestamp',)
    list_per_page = 10

    fields = ('ip_address', 'user_agent', 'path', 'timestamp')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_image', 'description', 'project_count')
    search_fields = ('title', 'description')
    list_per_page = 10
    
    # Fields to show in add/edit form
    fields = ('title', 'slug', 'description', 'image')
    
    # Make slug auto-populate from title
    prepopulated_fields = {'slug': ('title',)}
    
    # Specify the custom form template
    change_form_template = 'admin/main/category/change_form.html'
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['title'].widget.attrs['class'] = 'vTextField'
        form.base_fields['description'].widget.attrs['class'] = 'vLargeTextField'
        return form
    
    def response_add(self, request, obj, post_url_continue=None):
        return super().response_add(request, obj, post_url_continue)
    
    def response_change(self, request, obj):
        return super().response_change(request, obj)
    
    def project_count(self, obj):
        return obj.projects.count()
    project_count.short_description = 'Number of Projects'

    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"
    display_image.short_description = 'Image'

    class Media:
        js = ('admin/js/slug_auto.js',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'completion_date', 'display_image')
    list_filter = ('category', 'completion_date')
    search_fields = ('title', 'description', 'location')
    list_per_page = 10
    
    # Fields to show in add/edit form
    fields = ('title', 'category', 'description', 'location', 'completion_date', 'image')
    
    # Specify the custom form template
    change_form_template = 'admin/main/project/change_form.html'
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['title'].widget.attrs['class'] = 'vTextField'
        form.base_fields['description'].widget.attrs['class'] = 'vLargeTextField'
        form.base_fields['location'].widget.attrs['class'] = 'vTextField'
        return form
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    display_image.short_description = 'Image'

    def response_add(self, request, obj, post_url_continue=None):
        return super().response_add(request, obj, post_url_continue)
    
    def response_change(self, request, obj):
        return super().response_change(request, obj)

    class Media:
        css = {
            'all': ['admin/css/custom_admin.css']
        }
