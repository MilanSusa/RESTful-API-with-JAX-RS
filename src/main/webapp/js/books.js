var rootURL = "http://localhost:8080/webapi";

$(function() {
	findAllBooks(1, '');
	welcomeToBooksPage();
});

function findAllBooks(page, query) {
	if (page == 0)
		page = 1;
	var booksURL = rootURL + '/books';
	$.ajax({
		type : 'GET',
		url : booksURL + '?query=' + query + '&page=' + page,
		dataType : "json",
		success : function(result) {
			var maxResults = result.pagination.maxResults;
			var books = result.data;
			$('#tBooks').empty();
			$.each(books, function(index, book) {
				$('#tBooks').append(
						'<tr><td>' + book.title + '</td><td>'
								+ book.releaseYear + '</td></tr>');
			});
			generatePagination('#pagination', 'findAllBooks', maxResults,
					query, page, 10);
		}
	});
}

function welcomeToBooksPage() {
	var position = document.cookie.indexOf("username=");
	if (position != -1) {
		var start = position + 9;
		var end = document.cookie.indexOf(";", start);
		if (end == -1) {
			end = document.cookie.length;
		}	
		var email = unescape(document.cookie.substring(start, end));
	}

	var rootURL = "http://localhost:8080/webapi/registration/";
	$.ajax({
		type : "GET",
		url : rootURL + email,
		dataType : "json",
		success : function(user) {
			document.getElementById("listBooks").innerHTML = 'Welcome to the books page, '
				+ user.name + '.';
		}
	});
}

function searchBooks() {
	var query = $('#search').val();
	findAllBooks(1, query);
}

function executeSearch(inputField) {
	var delayedSearch = function() {
		findAllBooks(1, $(inputField).val());
	};
	window.clearTimeout(this.keystrokeTimeout);
	this.keystrokeTimeout = window.setTimeout(delayedSearch, 250);
}