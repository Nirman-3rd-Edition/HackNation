from django.shortcuts import render, HttpResponseRedirect, Http404
from django.urls import reverse
from . import models
from face_rec import face
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from django.core.mail import EmailMessage
from smtplib import SMTPException


# Create your views here.
def login(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return HttpResponseRedirect(reverse('dashboard'))
        messages.error(request, "Username or Password mismatch")
    return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('login'))

def dashboard(request):
    cst = models.Student.objects.filter(branch='CS').__len__()
    csp = models.Student.objects.filter(branch='CS', status='Present').__len__()
    itt = models.Student.objects.filter(branch='IT').__len__()
    itp = models.Student.objects.filter(branch='IT', status='Present').__len__()
    eet = models.Student.objects.filter(branch='EE').__len__()
    eep = models.Student.objects.filter(branch='EE', status='Present').__len__()
    cset = models.Student.objects.filter(branch='CSE').__len__()
    csep = models.Student.objects.filter(branch='CSE', status='Present').__len__()

    data = {'cs':{'total':cst, 'present':csp},
            'it':{'total':itt, 'present':itp},
            'ee': {'total': eet, 'present': eep},
            'cse': {'total': cset, 'present': csep},}
    return render(request, 'dashboard.html', data)

def add_student(request):
    if request.method == 'POST':
        fname = request.POST['fname']
        lname = request.POST['lname']
        roll = request.POST['roll'][-2:]
        mob = request.POST['mob']
        email = request.POST['email']
        branch = request.POST['branch']

        try:
            models.Student.objects.get(id=roll)
            models.Student.objects.filter(id=roll).update(fname=fname, lname=lname, mobile = mob, email = email, branch=branch)
            messages.warning(request, "A Student is updated with name " + fname + " " + lname)
        except:
            models.Student.objects.create(id=roll, fname=fname, lname=lname, mobile= mob, email= email, branch=branch)

            messages.success(request, "A new Student added named " + fname + " " + lname)

        face.create_user(roll, fname)

    return render(request, 'add_student.html')


def train_database(request):
    if request.method == 'POST':
        n = face.train()
        messages.info(request, "{0} faces trained successfully.".format(n))
    return render(request, 'train_database.html')


def take_attendance(request):
    if request.method == 'POST':
        name = {0: None}
        objs = models.Student.objects.all()
        for obj in objs:
            obj.status = 'Absent'
            obj.time = None
            name[obj.id] = obj.fname
            obj.save()

        face.recognige(name)

        to_day = datetime.datetime.now().strftime("%a")
        to_month = datetime.datetime.now().strftime("%b")
        present = len(models.Student.objects.filter(status='Present'))
        absent = len(models.Student.objects.filter(status='Absent'))

        models.DayReport.objects.filter(day=to_day).update(present=present, absent=absent)
        m = models.MonthReport.objects.get(month=to_month)
        m.present += present
        m.absent += absent
        m.save()
        messages.success(request, 'Attendance taken successfully')
    return render(request, 'take_attendance.html')


def view_attendance(request):
    students = models.Student.objects.all()
    return render(request, 'view_atten.html', {'students':students})



def send_mail(request):
    if request.method == 'POST':
        tomail = request.POST['tomail']
        subject = request.POST['subject']
        message = request.POST['message']
        mail = EmailMessage(subject, message, to=[tomail])

        try:
            if len(request.FILES):
                for file in request.FILES.getlist('file'):
                    mail.attach(file.name, file.read(), file.content_type)

            mail.send()
            messages.success(request, 'Email sent Successfully...')
        except (SMTPException, Exception) as e :
            messages.error(request, 'There was an error sending an email: ' + e)
    return render(request, 'send_mail.html')



def settings(request):
    return render(request, '404html')


def profile(request):
    obj = User.objects.get(username=request.user)
    return render(request, 'profile.html',{'user':obj})


class ChartData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        day = []
        d_present=[]
        d_absent=[]
        month = []
        m_present = []
        m_absent = []
        obj = models.DayReport.objects.all()
        for i in obj:
            day.append(i.day)
            d_present.append(i.present)
            d_absent.append(i.absent)

        obj = models.MonthReport.objects.all()
        for i in obj:
            month.append(i.month)
            m_present.append(i.present)
            m_absent.append(i.absent)

        data = {
                "month":{'labels':month, 'present':m_present, 'absent':m_absent},
                "day":{'labels':day, 'present':d_present, 'absent':d_absent}
        }
        return Response(data)