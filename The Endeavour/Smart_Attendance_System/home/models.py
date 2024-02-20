from django.db import models


# Create your models here.

class Student(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    mobile = models.IntegerField(default=None)
    email = models.EmailField(max_length=50)
    branch = models.CharField(max_length=50)
    status = models.CharField(max_length=10, default='Absent')
    time = models.CharField(max_length=30, default='', null=True)

    def __str__(self):
        return str(self.fname) + " " + str(self.lname)


class MonthReport(models.Model):
    month = models.CharField(max_length=20)
    present = models.IntegerField(default=0)
    absent = models.IntegerField(default=0)

    def __str__(self):
        return self.month


class DayReport(models.Model):
    day = models.CharField(max_length=20)
    present = models.IntegerField(default=0)
    absent = models.IntegerField(default=0)

    def __str__(self):
        return self.day