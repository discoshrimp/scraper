$(document).ready(function () {
	$("#scrapeBtn").on("click", function (event) {
		event.preventDefault()
		console.log(`scrape clicked`)
		$.ajax({
			url: '/scrape',
			method: 'GET'
		}).then(function (data) {
			console.log(`app 40: ${JSON.stringify(data)}`)
		})
	})
	$("#articlesBtn").on('click', function (event) {
		event.preventDefault()
		console.log('button clicked')
		$.ajax({
			url: "/articles",
			method: "GET"
		}).then(function (data) {
			data.slice(',')
			console.log(data)
			for (i = 0; i < data.length; i++) {
				const link = data[i].link
				const summary = data[i].summary
				const id = data[i]._id
				const title = data[i].title
				$("#articleList").append(
					`<li id='${title}'>
				<a href='${link}'>${link}</a>
				<p>${title}</p>
				<p>${summary}</p>
			</li>`)
			}
		})
	})
})
