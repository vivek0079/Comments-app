$(document).ready(function () {
    var endpoint = "http://127.0.0.1:8000/api/comments/"
    var Url = $(".load-comments").attr("data-url")
    $(".load-comments").before("<h3>Comments</h3><br><div class='form-container'></div>")

    getComments(Url)

    function renderComment(object) {
        var image = "<div class='media-left'>" + 
                    "<img class='media-object' style='max-width:64px;max-height:64px;margin-bottom:5px' src='" + object.image + "'></div>"
        var authorName = "";
        if (object.user){
            authorName = "<small>via " + object.user.username + "</small>"
        }
        var timeStamp = new Date(object.timestamp).toLocaleString()
        var html = "<div class='media'; style='border-bottom:1px solid #ccc';>" + image +"<div class='media-body'>" +  
                    object.content + "<br>" + authorName + 
                    "<small> on " + timeStamp + "</small>"
                    "</div></div><hr>"
        return html
    }
    function getComments(Url){
        $(".load-comments").html('')
        $.ajax({
            method: "GET",
            url: endpoint,
            data: {
                url: Url,
            },
            success: function (data) {
                if (data.length > 1){
                    
                    $.each(data, function (index, object) {
                        $(".load-comments").append(renderComment(object))
                    })
                }    
                var form = commentForm()  
                $(".form-container").html(form)          
            },
            error: function (data) {
                console.log('error')
            }
        })
    }

    function commentForm(){
        var html = "<form method='POST' class='comment-form'><textarea placeholder='Comment here...' name='content' class='form-control'></textarea><br><input type='submit' class='btn btn-lg btn-success' value='Submit'></form><br> "
        return html
    }

    function formatMsg(json) {
        var message = ""
        $.each(json, function(key, value){
            message += value + "<br>"
        })
        var msg =   '<div class="alert-error alert alert-warning alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    message + '</div>'
        return msg
        
    }
    function handleForm(data){
        console.log(data) 
        $.ajax({
            url: endpoint + "create/",
            method: "POST",
            data: data + "&url=" + Url,
            success: function(data){
                getComments(Url)
            },
            error: function(data){
                console.log('error')
                console.log(data.responseJSON)
                var error = $('.alert-error')
                if(error.length > 0){
                    error.remove()
                }
                var msg = formatMsg(data.responseJSON)
                $('.comment-form textarea').before(msg)
            }
        })
    }

    $(document).on('submit', '.comment-form', function(e){
        e.preventDefault()
        var data = $(this).serialize()
        handleForm(data)
    })

})