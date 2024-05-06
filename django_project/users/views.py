from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from .models import User
from .form import RegisterUserForm
from resume.models import Resume
from company.models import Company
# Create your views here.

# register applicant only
def register_applicant(request):
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            var = form.save(commit=False)
            var.is_applicant = True
            # save is used for saving the form data to the database
            var.save()
            # create after resume is used for creating a resume for the user
            Resume.objects.create(user=var)
            messages.info(request, 'Your account has been created successfully')
            return redirect('login')
        else:
            messages.warning(request, 'Something went wrong')
            return redirect('register-applicant')
    else:
        form = RegisterUserForm()
        context = {'form': form}
        return render(request, 'users/register_applicant.html', context)
    
    
# register recruiter only
def register_applicant(request):
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            var = form.save(commit=False)
            var.is_recruiter = True
            # save is used for saving the form data to the database
            var.save()
            # create after resume is used for creating a resume for the user
            Resume.objects.create(user=var)
            messages.info(request, 'Your account has been created successfully')
            return redirect('login')
        else:
            messages.warning(request, 'Something went wrong')
            return redirect('register-recruiter')
    else:
        form = RegisterUserForm()
        context = {'form': form}
        return render(request, 'users/register_recruiter.html', context)
    
    
# login
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # check if the user is authenticated
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.warning(request, 'Something went wrong')
            return redirect('login')
    else:
        return render(request, 'users/login.html')
    

# logout
def logout_user(request):
    logout(request)
    messages.info(request, 'You have been logged out')
    return redirect('login')
