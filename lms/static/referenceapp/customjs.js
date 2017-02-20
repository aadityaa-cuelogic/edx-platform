$(document).ready(function(){
	//get list of reference apps links
	if(window.location.pathname === '/referenceapp/'){
		getreferenceapplinks();
	}

	//add new reference apps link
	if(window.location.pathname === '/referenceapp/addreferencelinks/'){
		$('.add-form').removeClass('dnone');
	}

	//get edit reference link
	if(window.location.href.indexOf("geteditreferencelinks") > -1) {
		geteditreferenceapplinks();
	}

	
});

//get list of reference apps links
function getreferenceapplinks(){
	$.ajax({
		url:'/referenceapp/getreferencelinks',
		type: 'get',
		dataType: 'json',
		success: function(response){
			console.log(response,'==success==');
			var table_tr  = '<caption>ReferenceApp List</caption>\
						<thead>\
							<tr>\
								<th>Type</th>\
								<th>Name</th>\
								<th>Link</th>\
								<th>Description</th>\
								<th>Action</th>\
							</tr>\
						</thead>\
						<tbody>'
			for(var i=0; i<response.ref_list.length; i++){
				var v_type = response.ref_list[i].type;
				var v_name = response.ref_list[i].name;
				var v_link = response.ref_list[i].link;
				var v_desc = response.ref_list[i].desc;
				var v_id = response.ref_list[i].id;
				table_tr += '<tr> \
								<td>'+v_type+'</td>\
								<td>'+v_name+'</td>\
								<td><a href="'+v_link+'">'+v_link+'</a></td>\
								<td>'+v_desc+'</td>\
								<td>\
									<a class="btn btn-warning" href="/referenceapp/geteditreferencelinks/'+v_id+'/" role="button">Edit</a>\
									<button id="'+v_id+'" class="btn btn-danger deleteLinkClick">Delete</button>\
								</td>\
							</tr>';
			}
			$("#referenceapp_table").html(table_tr+'</tbody>')
			$('.deleteLinkClick').on('click', function(e){
				e.preventDefault();
				var deleteId = $(this).attr('id');
				var check = confirm("Are you sure ?");
				if(check == true){
					deleteRefLink(deleteId);
				}
			});

		},
		error:function(response){
			console.log(response,'==error==');
		}
	});
}

//delete reference link entry
function deleteRefLink(id){
	$.ajax({
		url: '/referenceapp/deletereferencelinks/',
		type: 'post',
		data: {
			'v_id' : id
		},
		success: function(response){
			console.log(response,"====success delete response===");
			$("#referenceapp_table").addClass('dnone').after('\
						<div class="alert alert-success">\
						  <strong>Success!</strong> Link entry removed.\
						</div>\
			');
			setTimeout(function(){
				window.location.href = '/referenceapp';
			}, 3000);
		},
		error: function(response){
			console.log(response,"====error delete response===");
			window.location.href = '/referenceapp';
		}
	})
}

//add new reference apps link
function addnewreferenceapplink(){
	var inputDiv = $(".add-form");
	var v_type = inputDiv.find('#v_type').val();
	var v_name = inputDiv.find('#v_name').val();
	var v_link = inputDiv.find('#v_link').val();
	var v_desc = inputDiv.find('#v_desc').val();
	if(v_type != '' && v_name != '' && v_link != '' && v_desc != ''){
		$.ajax({
			url: '/referenceapp/addreferencelinks/',
			type: 'post',
			data : {
				'v_type':v_type,
				'v_name':v_name,
				'v_link':v_link,
				'v_desc':v_desc
			},
			beforeSend: function(){
				$(".add-form").addClass('dnone');
				$(".loading").removeClass('dnone');
			},
			success: function(response){
				console.log(response, '====Success response===');
				$(".add-form").addClass('dnone').after('\
					<div class="alert alert-success">\
						  <strong>Success!</strong> Link entry added.\
						</div>\
					');
				setTimeout(function(){
					window.location.href = '/referenceapp';
				}, 3000);
			},
			error: function(response){
				console.log(response, '====Error response===');
				window.location.href = '/referenceapp';
			}
		});
	}else{
		// alert("Invalid Data");
	}
}

//get edit reference link
function geteditreferenceapplinks(){
	var path = window.location.pathname;
	var pathArr = path.split("/");
	var v_id = pathArr[pathArr.length-2];
	$.ajax({
		url: '/referenceapp/editreferencelinks/'+v_id,
		type: 'get',
		success: function(response){
			console.log(response, '===success response===');
			if(response.ref_list !== undefined){
				var v_type = response.ref_list[0].type;
				var v_name = response.ref_list[0].name;
				var v_link = response.ref_list[0].link;
				var v_desc = response.ref_list[0].desc;
				var v_id = response.ref_list[0].id;

				var inputDiv = $(".edit-form");
				inputDiv.removeClass('dnone');
				$(".loading").addClass("dnone");
				inputDiv.find('#v_type').val(v_type);
				inputDiv.find('#v_name').val(v_name);
				inputDiv.find('#v_link').val(v_link);
				inputDiv.find('#v_desc').val(v_desc);
				inputDiv.find('#v_id').val(v_id);
			}

		},
		error: function(response){
			console.log(response, '===error response===');
			window.location.href = "/referenceapp";
		}
	})
}

function saveeditreferenceapplink(){
	var inputDiv = $(".edit-form");
	var v_id = inputDiv.find("#v_id").val();
	var v_type = inputDiv.find('#v_type').val();
	var v_name = inputDiv.find('#v_name').val();
	var v_link = inputDiv.find('#v_link').val();
	var v_desc = inputDiv.find('#v_desc').val();
	if(v_type != '' && v_name != '' && v_link != '' && v_id != '' && v_desc!= ''){
		$.ajax({
			url: '/referenceapp/savereferencelinks/',
			type: 'post',
			data : {
				'v_id':v_id,
				'v_type':v_type,
				'v_name':v_name,
				'v_link':v_link,
				'v_desc':v_desc,
				'csrfmiddlewaretoken':$( "#csrfmiddlewaretoken" ).val()
			},
			beforeSend: function(){
				$(".edit-form").addClass('dnone');
				$(".loading").removeClass('dnone');
			},
			success: function(response){
				console.log(response, '====Success response===');
				$(".edit-form").addClass('dnone').after('\
						<div class="alert alert-success">\
						  <strong>Success!</strong> Vehicle entry updated.\
						</div>\
				');
				setTimeout(function(){
					window.location.href = '/referenceapp';
				}, 3000);
			},
			error: function(response){
				$(".edit-form").addClass('dnone').after('\
						<div class="alert alert-error">\
						  <strong>Error!</strong> Invalid request.\
						</div>\
				');
				setTimeout(function(){
					window.location.href = '/referenceapp';
				}, 3000);
			}
		});
	}else{
		alert("Invalid Data");
	}
}