
getAllComments();

function getAllComments() {
	$.ajax({
		url: BASEURL + '/detail/comment/' + getParams('id'),
		type: 'GET',
		success: function (data) {
			var data = data['data'];
			var comments = '';
			for(var l = 0; l < data.length; l++) {
			    comments += '<li class="clearfix comment-item">'
		            +'<img class="author-profile fl-l" src="' + returnProfile() + '"></div>'
			        +'<div class="author-inf fl-l">'
			        +'<p class="author-name">'+ data[l]['commentUser'] +'</p>'
			        if(data[l]['commentDetail'].length > 120) {
			            comments +='<p class="comment-content">'+ data[l]['commentDetail'].substr(0, 120) +'...<span class="see-all">查看全部></span></p>'
			        }else {
			            comments +='<p class="comment-content">'+ data[l]['commentDetail'] +'</p>'
			        }
			    comments +='<p class="comment-date">' + formatterDate(data[l]['commentDateTime']) + '</p>'
			        +'</div></li>'
			}
			$('#comments').html(comments);

			$('#comments').on('click', '.see-all', function() {
			    var index = $(this).closest('li').index();
			    $(this).parent('.comment-content').html(data[index]['commentDetail']);
			});
		}
	})
}
/*随机返回头像*/
function returnProfile() {
    var num = parseInt(Math.random()*10);
    if (num%2 == 0) {
        return '../../images/plays/profile-f.png';
    }else {
        return '../../images/plays/profile-m.png';
    }
}