function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$(document).ready(function () {
    var endpoint = "/api/comments/"
    var Url = $(".load-comments").attr("data-url")
    var isUser = false
    var authUser;

    $(".load-comments").before("<h1 class='text-center' style='font-size:50px;'>Comments</h1><h3 class='text-center' style='font-size:30px;'>A Reusable comments app</h3><br><div class='form-container'></div>")

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
                    "<p class='comment-content' data-id='" + object.id + "'>" + object.content + "</p>" + authorName + 
                    "<small> on " + timeStamp 
        if (object.user){
            if(object.user.username == authUser){
                html = html + " | <a href='#' class='edit-button'>Edit</a>"
            }
        }
        html += "</small></div></div>"
        return html
    }
    function getComments(Url){
        isUser = $.parseJSON(getCookie('isUser'))
        authUser = String(getCookie('authUser'))
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
        var html = ""
        if(isUser){
            html = "<form method='POST' class='comment-form'><textarea placeholder='Comment here...' name='content' class='form-control'></textarea><br><input type='submit' class='btn btn-lg btn-success' value='Submit'></form><br> "

        }
        else{
            html = "<div style='font-size:large;padding:20px;'><strong>Login required to comment</strong></div>"
        }
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
                // getComments(Url)
                $(".load-comments").append(renderComment(data))
                var form = commentForm()
                $(".form-container").html(form)
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

    $(document).on('click', '.edit-button', function(e){
        e.preventDefault()
        $(this).fadeOut()
        var contentHolder = $(this).parent().parent().find('.comment-content')
        var content = contentHolder.text()
        var Id = contentHolder.attr('data-id')
        $(this).after(commentEditForm(Id, content))

    })

    $(document).on('submit', '.comment-edit-form', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        var Id = $(this).attr('data-id')
        handleEditForm(data, Id)
    })

    function commentEditForm(Id, content) {
        var html = "<form method='POST' class='comment-edit-form' data-id='" + Id + "'>" +
            "<hr><textarea placeholder='Comment here...' name='content' class='form-control'>" +
            content + "</textarea><br><input type='submit' class='btn btn-success' value='Edit'>" +
            "<button class='btn btn-danger comment-delete' style='margin-left:10px'>Delete</button>" + 
            "<button class='btn btn-primary comment-cancel' style='margin-left:10px'>Cancel</button>" + 
            "</form><br>"
        return html
    }

    $(document).on('click', '.comment-cancel', function (e) {
        $(this).parent().parent().find('.edit-button').fadeIn();
        $(this).parent().remove()   
    })


    $(document).on('click', '.comment-delete', function(e){
        e.preventDefault()
        var Id = $(this).parent().attr('data-id')
        $.ajax({
            url: endpoint + Id + "/",
            method: "DELETE",
            success: function(){
                getComments(Url)
            },
            error: function(){
                console.log('error')
            }
        })
    })

    function handleEditForm(data, Id) {
        $.ajax({
            url: endpoint + Id + "/",
            method: "PUT",
            data: data,
            success: function (data) {
                getComments(Url)
            },
            error: function (data) {
                console.log('error')
                console.log(data.responseJSON)
                var error = $('.alert-error')
                if (error.length > 0) {
                    error.remove()
                }
                var msg = formatMsg(data.responseJSON)
                $('[data-id='+Id+'] textarea').before(msg)
            }
        })
    }


})