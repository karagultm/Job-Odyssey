from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from .models import User
from .form import RegisterUserForm
# Create your views here.

# register applicant only
def register_applicant(request):
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            var = form.save(commit=False)
            var.is_applicant = True
            var.save()
            login(request, var)
            messages.success(request, 'Account created successfully')
            return redirect('job_odyssey:home')