$(document).ready(function() {

	$('#new').submit(addBook);
	$('#find').submit(findBook);
	$('#update').submit(updateBook);
	$('#delete').on('click', deleteBook);
	$('#all').on('click', allBooks);

	function addBook(event) {
		var name = $('#new input')[0].value;
		var author = $('#new input')[1].value;
		var published = $('#new input')[2].value;
		$.ajax({
			url: 'book/'+name+'/'+author+'/'+published,
			type: 'PUT',
			success: function(result) {
				console.log("Successfully added book");

				$('#books').append('<li>'+name+', '+author+', '+published+'</li>');
			}
		});
		event.preventDefault();
	}

	function findBook(event) {
		var name = $('#find input')[0].value;
		$.ajax({
			url: 'book/'+name,
			type: 'GET',
			success: function(result) {
				console.log("Successfully found book");
				var name = result.name;
				var author = result.author;
				var published = result.published;

				$('#foundbook').html('<ul><li>'+name+', '+author+', '+published+'</li></ul>');
			},
			error: function(response, status) {
				$('#foundbook').html('Book not found, please try another search!');
			}
		});
		event.preventDefault();
	}

	function updateBook(event) {
		var name = $('#update input')[0].value;
		var author = $('#update input')[1].value;
		var published = $('#update input')[2].value;
		$.ajax({
			url: 'book/'+name+'/'+author+'/'+published,
			type: 'POST',
			success: function(result) {
				console.log("Successfully updated book");
				$('#updatebook').html('<ul><li>'+name+', '+author+', '+published+'</li></ul>');
			},
			error: function(response, status) {
				$('#updatebook').html('Book not found, please try another search!');
			}
		});
		event.preventDefault();
	}

	function deleteBook() {
		var name = $("#delete input")[0].value;
		$.ajax({
			url: 'book/'+name,
			type: 'DELETE',
			success:function(result){
				console.log("Successfully deleted book");
				alert("Deleted book!");
			}
		});
		event.preventDefault();
	}


	//new functionality to retrieve all books from view partial
	function allBooks() {
		$.ajax({
			url: 'book/',
			success:function(result) {
				$('#allBooks').html(result);
			}
		})
	}

});