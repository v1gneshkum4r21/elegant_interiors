from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Contact, Category, Project

def home(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest' and request.method == 'POST':
        try:
            Contact.objects.create(
                name=request.POST.get('name'),
                email=request.POST.get('email'),
                phone=request.POST.get('phone'),
                message=request.POST.get('message'),
                estimate_type=request.POST.get('estimate_type')
            )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error'}, status=400)
            
    categories = Category.objects.all()
    return render(request, 'main/index.html', {'categories': categories})

def portfolio_detail(request, category):
    category_data = get_object_or_404(Category, slug=category)
    projects = Project.objects.filter(category=category_data).order_by('-completion_date')
    
    context = {
        'category_data': category_data,
        'category': category_data,
        'projects': projects,
    }
    
    return render(request, 'main/portfolio_detail.html', context)