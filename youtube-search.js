// alert("Hello World");

// css���� ���� �ָ� �����ؼ� ���

$(function(){
	var apiKey = "AIzaSyDlWtmZLrEEPlgVth-w9Jmi_TdpnoSRUow";
	var apiYoutube = "https://www.googleapis.com/youtube/v3/search";

	$('form').submit(function(ev){
		ev.preventDefault(); //������ ����
		var query = $('#query').val();
//		console.log(query);
		search(query);
	})

	function search(query){
		$.get(
			apiYoutube,
			{
				part:'snippet',
				q:query,
				type:'video',
				maxResults:10,
				key:apiKey
			},
			//������ ����
			function(data){
//				console.log(data);

				$('#results').empty();

				$.each(data.items,function(index,item){
					var newItem = buildItem(item);
					$('#results').append(newItem);
				})
			}
		);
	}

	var buildItem = function(item){
		var videoId = item.id.videoId;
		var thumbnail = item.snippet.thumbnails.default.url;
		var title = item.snippet.title;
		var description = item.snippet.description;

		var newItem = `	 
		<li class="item">
          		<a href="http://www.youtube.com/watch?v=${videoId}" target="_blank">
          			<h3>${title}</h3>
          			<div class="image-wrapper">
            				<img src="${thumbnail}">
          			</div>
          			<div class="description">
            				${description}
				</div>
        		</a>
		</li>
		`;

		return newItem;
	}
});