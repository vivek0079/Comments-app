================
# Comments-app
================

A reusable comments app that can be used to implement comments in nay of your URL feed.This can alsso be directly uploaded into Pypi to make it more availble to the public by using `pip install <your-app-name>`


__Description:__

 Build as a product to use comment system in any of the django project or webpage by simply adding a link to the Javascript file
 
 **PS: For deployment check out the other projects for references.**
  
  
__Technology Stack:__

_Front-end:_ &nbsp;&nbsp;Bootstrap 3, jQuery (JavaScript)

_Back-end:_ &nbsp;&nbsp;Django 1.11 , Django REST Framework 3.6.2(Python 3.5.2)

_Database:_ &nbsp;&nbsp;dbsqlite3

__Instructions:__

  1. Make a directory in your local machine and create a virtual environment by `python3 -p virtualenv .`

  2. Clone this repo in that directory and ensure to install the requirements by `pip install -r requirments.txt` 
  
  3. Add the following to `ROOT_URLCONF`:
  
    ```
    from django.conf.urls import url, include
    urlpatterns = [
        ...
        url(r'^api/comments/', include('comments.api.urls')),
    ]
    ```

  4. Add [jQuery](http://jquery.com/) and [Bootstrap](http://getbootstrap.com/)(recommended):

    ```
    <!-- jQuery Required -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <!-- Bootstrap JS Recommeded -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- Bootstrap CSS Recommeded -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    ```


  5. Add `comments.js`:
      ```
      {% load static %} 

      <!-- Primary Static files -->
      <script src='{% static "comments/js/comments.js" %}'></script>

      <!-- CSRF Safe For Ajax -->
      <script src='{% static "comments/js/csrf_ajax.js" %}'></script>
        ```

  6. Make the migrations to create the database by `python3 manage.py makemigrations` followed by `python3 manage.py migrate`

  7. To run the application open terminal and change directory where manage.py lives and run the command `python3 manage.py runserver` and the app goes live in your machine.

  __Note:__

  Fork this repo to your github account for you future use.
  
  
  Thank You !!!
