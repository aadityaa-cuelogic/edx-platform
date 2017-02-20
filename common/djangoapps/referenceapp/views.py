from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from django.utils import timezone
from datetime import datetime
import urllib
from .models import Referenceapp


from edxmako.shortcuts import render_to_response, render_to_string
from openedx.core.djangoapps.theming import helpers as theming_helpers

def index(request):
	return render_to_response('referenceapp/referenceapp.html', {})

def getreferencelinks(request):
	reference_list = Referenceapp.objects.all()
	response_data = []
	ref_list_dict = {
		'ref_list': None
	}

	for obj in reference_list:
		ref_dict = {
			'id': obj.id,
			'name': obj.reference_name,
			'type': obj.reference_type,
			'link': obj.reference_link,
			'desc': obj.reference_desc,
		}
		response_data.append(ref_dict)

	ref_list_dict['ref_list'] = response_data
	return HttpResponse(json.dumps(ref_list_dict),
		content_type="application/json")
	# return render_to_response('referenceapp/referenceapp.html', {})


def geteditreferencelinks(request, id=None):
	# return render_to_response('referenceapp/referenceapp.html', {})
	if request.method == 'GET':
		try:
			ref_data = Referenceapp.objects.get(pk=id)
		except Referenceapp.DoesNotExist:
			return HttpResponse(status=404)
		return render_to_response('referenceapp/edit_referenceapp.html', {'request_id':id})
	else:
		return HttpResponse(status=400)

def editreferencelinks(request, id=None):
	if request.method == "GET":
		response_data =[]
		ref_list_dict = {}
		try:
			ref_obj = Referenceapp.objects.get(pk=id)
		except Referenceapp.DoesNotExist:
			return HttpResponse(status=404)
		ref_dict = {
			'id': ref_obj.id,
			'name': ref_obj.reference_name,
			'type': ref_obj.reference_type,
			'link': ref_obj.reference_link,
			'desc': ref_obj.reference_desc
		}
		response_data.append(ref_dict)
		ref_list_dict['ref_list'] = response_data
		return HttpResponse(json.dumps(ref_list_dict), 
			content_type="application/json", status=200)
	else:
		return HttpResponse(status=400)

@csrf_exempt
def savereferencelinks(request, id=None):
	if request.method == "POST":
		v_id = request.POST['v_id']
		v_type = request.POST['v_type']
		v_name = request.POST['v_name']
		v_link = request.POST['v_link']
		v_desc = request.POST['v_desc']
		checkUrl = urllib.urlopen(v_link)
		if checkUrl.getcode() == 200:
			try:
				Referenceapp.objects.filter(pk=v_id).update(reference_type=v_type,
					reference_name=v_name, reference_link=v_link,
					reference_desc=v_desc)
			except Referenceapp.DoesNotExist or IntegrityError as e:
				return HttpResponse(404)
			return HttpResponse(status=200)
		else:
			return HttpResponse(status=400)
	else:
		return HttpResponse(status=400)

@csrf_exempt
def deletereferencelinks(request):
	if request.method == "POST":
		v_id = request.POST['v_id']
		try:
			ref_obj = Referenceapp.objects.get(pk=v_id)
		except Referenceapp.DoesNotExist:
			return HttpResponse(status=404)
		Referenceapp.objects.get(pk=v_id).delete()
		return HttpResponse(status=200)
	else:
		return HttpResponse(status=400)

@csrf_exempt
def addreferencelinks(request):
	if request.method == "GET":
		return render_to_response('referenceapp/add_referenceapp.html', {})
	elif request.method == "POST":
		v_type = request.POST['v_type']
		v_name = request.POST['v_name']
		v_link = request.POST['v_link']
		v_desc = request.POST['v_desc']

		checkUrl = urllib.urlopen(v_link)
		if checkUrl.getcode() == 200:
			try:
				ref_obj = Referenceapp.objects.get(reference_link=v_link)
			except Referenceapp.DoesNotExist:
				try:
					new_ref = Referenceapp.objects.create(
									reference_name=v_name,
									reference_type=v_type,
									reference_link=v_link,
									reference_desc=v_desc,
								)
				except Referenceapp.DoesNotExist:
					return HttpResponse(status=400)
			return HttpResponse(status=400)
	return HttpResponse(status=200)
