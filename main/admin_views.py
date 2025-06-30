from django.contrib.admin.views.decorators import staff_member_required
from django.views.generic import TemplateView
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from .models import Contact, Category, Project, SiteVisit

class CustomDashboardView(TemplateView):
    template_name = 'admin/dashboard.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Get statistics
        today = timezone.now()
        last_week = today - timedelta(days=7)
        
        # Contact Statistics
        context.update({
            'total_contacts': Contact.objects.count(),
            'pending_contacts': Contact.objects.filter(is_responded=False).count(),
            'recent_contacts': Contact.objects.filter(created_at__gte=last_week).count(),
            'contact_stats': Contact.objects.values('estimate_type').annotate(count=Count('id')),
        })
        
        # Category and Project Statistics
        context.update({
            'total_categories': Category.objects.count(),
            'total_projects': Project.objects.count(),
            'categories': Category.objects.annotate(project_count=Count('projects')),
            'recent_projects': Project.objects.order_by('-completion_date')[:5],
        })
        
        # Visit Statistics
        context.update({
            'total_visits': SiteVisit.objects.count(),
            'today_visits': SiteVisit.objects.filter(timestamp__date=today.date()).count(),
            'weekly_visits': SiteVisit.objects.filter(timestamp__gte=last_week).count(),
            'popular_pages': SiteVisit.objects.values('path').annotate(
                count=Count('id')).order_by('-count')[:5],
        })
        
        return context