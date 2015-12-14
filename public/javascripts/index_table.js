$(document).ready(function() {
    
    $(".update :button").click(function() {
        var name = $(this).next().val();
        var status = $(this).next().next().val();
        console.log("Status:");
        console.log(status);
        status = (status=='clean') ? 'dirty' : 'clean';
        $.ajax({
            url: 'clothes',
            data: {
                name: name,
                status: status
            },
            type: 'POST',
            success:function(result) {
                console.log("Successfully updated item");
                location.reload();
                $("#message").html(result);
            }   
        }); 
    });

    $(".delete :button").click(function() {
        var name = $(this).next().val()
        console.log(name);
        $.ajax({
            url: 'clothes',
            data: {
                name: name
            },
            type: 'DELETE',
            success:function(result) {
                console.log("Successfully deleted item");
                location.reload();
                $("#message").html(result);
            }   
        }); 
    });
});
