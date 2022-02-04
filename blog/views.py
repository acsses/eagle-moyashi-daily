from django.db import models
from django.shortcuts import render,redirect
from django.utils import timezone
from .models import Post
from django.contrib.auth.decorators import user_passes_test
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import hashlib
from datetime import datetime
from django.conf import settings
import boto3

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
    if request.method == 'POST':
        myfile = request.FILES.get('file')
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return render(request,'blog/add_page.html')

@csrf_exempt
def new_page(request):
    client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name='ap-northeast-1'
    )
    headerfile=request.FILES["header_file"]
    fs = FileSystemStorage(location=settings.DEFAULT_FILE_STORAGE)
    fs.save(headerfile.name, headerfile)
    client.upload_fileobj(headerfile,headerfile.name)
    for f in request.FILES.getlist("images"):
        fs.save(f.name, f)
    title=request.POST['title']
    text=request.POST['inside']
    id=hashlib.md5(title.encode()).hexdigest()
    if len(Post.objects.filter(id_url=id))!=0:
        id=id+str(len(Post.objects.filter(id_url=id)))
    Post.objects.create(id_url=id, title=title, text=text,header_img = headerfile.name,published_date=datetime.now())
    print(Post.objects.all())
    return redirect("http://localhost:8000/"+str(id)+"/")

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

