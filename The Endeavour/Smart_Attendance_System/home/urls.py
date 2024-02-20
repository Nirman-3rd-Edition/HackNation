from django.conf.urls import url
from . import views


urlpatterns=[
    url(r'^$', views.login, name='login'),
    url('^dashboard/$', views.dashboard, name='dashboard'),
    url('^dashboard/addstudent/$', views.add_student, name='addstudent'),
    url('^dashboard/train/$', views.train_database, name='train'),
    url('^dashboard/takeattendance/$', views.take_attendance, name='takeattendance'),
    url('^dashboard/view/', views.view_attendance, name='view'),
    url('^dashboard/settings/', views.settings, name='settings'),
    url('^dashboard/sendmail/', views.send_mail, name='sendmail'),
    url('^dashboard/profile/$', views.profile, name='profile'),
    url('^logout/$', views.logout, name='logout'),

    url(r'^api/chart/data/$', views.ChartData.as_view()),
]