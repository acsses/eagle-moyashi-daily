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
import os
import boto3

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
S3_URL = 'http://%s.s3.amazonaws.com/' % AWS_STORAGE_BUCKET_NAME

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    for post in posts:
        post.lead()
    return render(request, 'blog/post_list.html', {'posts': posts})

def article(request,pk):
    post = Post.objects.filter(id_url=pk,published_date__lte=timezone.now())[0]
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

@csrf_exempt
def new_page(request):
    title=request.POST['title']
    text=request.POST['inside']
    id=hashlib.md5(title.encode()).hexdigest()
    tag=request.POST['tag']
    print(tag)
    if len(Post.objects.filter(id_url=id))!=0:
        id=id+str(len(Post.objects.filter(id_url=id)))
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(AWS_STORAGE_BUCKET_NAME)
    headerfile=request.FILES["header_file"]
    bucket.upload_fileobj(headerfile,headerfile.name,ExtraArgs={"ACL": "public-read"})
    for f in request.FILES.getlist("images"):
        bucket.upload_fileobj(f,f.name,ExtraArgs={"ACL": "public-read"})
    Post.objects.create(id_url=id, title=title, text=text,tag=tag,header_img = headerfile.name,published_date=datetime.now())
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

