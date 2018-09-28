$(document).ready(function(){
	$("#articleBtn").on("click", function(){
		$.ajax({
			url:'/scrape',
			type:"POST"
		})
	})
})
$.getJSON("/articles", function(data){
	const articleList = $("<ul>")
	for(let i =0; i<data.length; i++){
		articleList.append(`<div class='row' id=${data[i]._id}><li>${data[i].title}</li>
		<li>${data[i].link}</li>
		<li>${data[i].summary}</li></div>`)
	}
	$('articleList').append(articleList)
})