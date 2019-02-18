## npm

<ul> 
<li>npm i bootstrap@4.1.1 font-awesome@4.7.0</li>
<li>npm i --save lodash</li>
<li>npm i react-router-dom@4.3.1</li>
<li>npm i joi-browser@13.4</li>
<li>npm i axios@0.18.0</li>
<li>npm i react-toastify@4.1.0</li>
<li>npm i @sentry/browser</li>
</ul>

<h1>Saving the Movie</h1>
<p>
In the function saveMovie, we should be able to create a movie or updated,
So we check if movie._id exist, we should update the movie, so we sent an http put request to apiEndPoint, and then we need to pass this movie to the body of the url.<br>
However, this movie has an id property and our restful api on the backend doesn't like the id property to be in the body of the request, because if we have one id in the url and another in the body of the request which one is correct.<br>
So we need to remove the id from the movie object, but we should not modify this object directly.<br>
So we need to clone the object, then we delete the id and finally pass it to the body of the request.
</p>
<p> 
Otherwise, we are deling with a new movie.
<br>
So we should sent an http post request to the server.
</p>

<h1>Handling the registration Errors</h1>
<p>If the response is 400, we clone the errors object, and take the username <b>errors.username</b> 
in ```ex.response.data; ``` we take the message that comes from the server, and render it.
</p>
