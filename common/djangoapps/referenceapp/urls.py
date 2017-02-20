from django.conf.urls import url, patterns
from . import views

urlpatterns = patterns(
	'',
	url(r'^$', views.index, name="referenceindex"),
	url(r'^getreferencelinks/$', views.getreferencelinks, name="getreferencelinks"),

	url(r'^geteditreferencelinks/(?P<id>[0-9]+)/$', views.geteditreferencelinks,
	 name="geteditreferencelinks"),

	url(r'^editreferencelinks/(?P<id>[0-9]+)/$', views.editreferencelinks,
	 name="editreferencelinks"),

	url(r'^savereferencelinks/$', views.savereferencelinks,
	 name="savereferencelinks"),

	url(r'^deletereferencelinks/$', views.deletereferencelinks,
	 name="deletereferencelinks"),

	url(r'^addreferencelinks/$', views.addreferencelinks,
	 name="addreferencelinks"),
)