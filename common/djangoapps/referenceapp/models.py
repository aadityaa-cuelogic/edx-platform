from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Referenceapp(models.Model):
	"""docstring for Referenceapp"""
	# def __init__(self, arg):
	# 	super(Referenceapp, self).__init__()
	# 	self.arg = arg
	reference_name = models.CharField(max_length=100)
	reference_type = models.CharField(max_length=100)
	reference_link = models.CharField(max_length=200, unique=True)
	reference_desc = models.CharField(max_length=200)
	reference_status = models.BooleanField(default=True)
	created_on = models.DateTimeField(auto_now_add=True)
	updated_on = models.DateTimeField(auto_now=True)


# class Fare(models.Model):
# 	vehicle_type = models.CharField(max_length=100, unique=True)
# 	fare = models.IntegerField()

# class Vehicle(models.Model):
# 	vehicle_type = (
# 	    ('CAR', 'Car'),
# 	    ('TRUCK', 'Truck'),
# 	    ('BUS', 'Bus'),
# 	    ('BIKE', 'Bike'),
# 	)

# 	name = models.CharField(max_length=100)
# 	number = models.CharField(max_length=100)
# 	v_type = models.CharField(
# 				max_length=5,
# 		        choices=vehicle_type,
# 		        default='CAR',
# 		    )
# 	intime = models.DateTimeField()
# 	outtime = models.DateTimeField()
# 	created_on = models.DateTimeField(auto_now_add=True)
# 	updated_on = models.DateTimeField(auto_now=True)

		