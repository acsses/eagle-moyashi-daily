from django.db import models
from django.shortcuts import render
from django.utils import timezone
from .models import Post
from django.contrib.auth.decorators import user_passes_test
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse


def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    for post in posts:
        post.lead()
    return render(request, 'blog/post_list.html', {'posts': posts})

def article(request,pk):
    post = Post.objects.filter(id_url=pk,published_date__lte=timezone.now())[0]
    post.image_set()
    try:
        try:
            prev = post.get_previous_by_created_date()
        except Post.DoesNotExist:
            prev = "none"
        try:
            next = post.get_next_by_created_date()
        except Post.DoesNotExist:
            next = "none"
        latests=Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')[:4]
        for latest in latests:
            latest.lead()
    except IndexError:
        pass
    
    return render(request, 'blog/article.html', {'post': post,'prev':prev,'next':next,'latests':latests})

def serch(request):
    serch=''
    if 'serch' in request.GET:
        serch=request.GET['serch']
    
    posts = Post.objects.filter(title__icontains=serch)
    for post in posts:
        post.lead()

    return render(request, 'blog/serch.html', {'posts': posts,'serch_word' : serch})

def file(request):
    print(request.FILES)
    if request.method == 'POST':
        myfile = request.FILES.get('file')
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request,'blog/add_page.html')

@user_passes_test(lambda u: u.is_superuser,login_url='/admin/login/?next=/add_page/')
def add_page(request):
    post = Post.objects.all()
    id=len(post)+1
    if request.method == 'POST':
        print(request.FILES)
        myfile = request.FILES["file"]
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
    return render(request,'blog/add_page.html',{'id':id})

