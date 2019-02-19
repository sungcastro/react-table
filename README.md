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
So we check if movie._id exist, we should update the movie, so we sent an http put request to apiEndPoint, and then we need to pass this movie to the body of the url.
</p>
<p>
However, this movie has an id property and our restful api on the backend doesn't like the id property to be in the body of the request, because if we have one id in the url and another in the body of the request which one is correct.
</p>
<p>
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
in <b>ex.response.data; </b> we take the message that comes from the server, and render it.
</p>

<h1>Storing the JWT</h1>
<p>When the user successfully log's in,  we get a Json Web Token which is like an identification.
So at this point we should store this json web token on the the client.
</p>
<p>Every Browser has a small little database called local storage. And in this database we can store key value pairs. So when await the promise  <b>await login(data.username, data.password);</b> that we get from our login function, we get the response object. And this response has a property called "data", so we can use object destructuring to pick the data property, but since we already defined data earlier, we are going to rename it to "jsw".  </p>

<p>
So with this we can get the Json web token in the body of the response.
</p>
<p>
We access to local Storage object, this object has some methods. We are going to call the method 
<b>setItem</b>. This method takes two parameters, "key" and "value" and both parameters are strings.
</p>
<p>
And after that, we redirect the user to the homepage, as we saw in routing and navigation, the props object has an adittional property called, "history" and this represents the browsers history. Here we can call the push method to navigate the user to a different address.
</p>
