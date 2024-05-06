from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from .models import User
from .form import RegisterUserForm
from resume.models import Resume
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
            return redirect('register_applicant')
    else:
        form = RegisterUserForm()
        context = {'form': form}
        return render(request, 'users/register_applicant.html', context)
    
    
# register recruiter only

            
            