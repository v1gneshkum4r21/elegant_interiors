from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()
    estimate_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_responded = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.estimate_type}"

class SiteVisit(models.Model):
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=500)
    path = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Site Visit'
        verbose_name_plural = 'Site Visits'

    def __str__(self):
        return f"{self.ip_address} - {self.path}"

class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to='categories/')
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['title']
    
    def __str__(self):
        return self.title

class Project(models.Model):
    category = models.ForeignKey(Category, related_name='projects', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    completion_date = models.DateField()
    image = models.ImageField(upload_to='projects/')
    
    class Meta:
        ordering = ['-completion_date']
    
    def __str__(self):
        return self.title
