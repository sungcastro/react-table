## npm

<ul> 
<li>npm i bootstrap@4.1.1 font-awesome@4.7.0</li>
<li>npm i --save lodash</li>
<li>npm i react-router-dom@4.3.1</li>
<li>npm i joi-browser@13.4</li>
<li>npm i axios@0.18.0</li>
<li>npm i react-toastify@4.1.0</li>
<li>npm i @sentry/browser</li>
<li>npm i jwt-decode@2.2.0</li>
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

<h1>Logging in the User upon Registration</h1>
<p>
Whenever the header of the http request starts with an <b>x</b> like <b>x-auth-token</b> is treated like a custom header that is not part of the standard http protocol.
</p>
<p> 
Now (in the back end) the header is set to a json web token. With this when we register a user, we can read this http header, extract the json web token, store it in the local storage and redirect the user. 
</p>
<p> 
In the console, in the headers object, in order to see the our custom header, we need to our back end implementation and set an additional header in the response.
</p>
<p>
Under the routes folder, in users file, we need to write in router.post(...) a standard http header.
<b>header("access-control-expose-header", "x-auth-token")</b>
</p>
<p> 
So we call the method header, and pass two arguments. The first one is the key "access-control-expose-headers", this header lets a web server whitelist, the headers that the browser or the client is allow to access. And we set it to "x-auth-token".
</p>
<p> 
If we add this header, the client can read this custom header.
</p>
<p> 
In our registerForm, we call the localStorage.setItem, we set the key to "token" and the value to response.headers and access to the property x-auth-token response.headers["x-auth-token"]
<br>
And finally we redirect the user to our home page.
</p>

<h1>Getting the Current User</h1>
<p>
To render the current user in our navBar or to any other components in our component tree, we need to initialize the state to an empty object and get our json webtoken from our local storage in componentDidMount method.
</p>
<p>
In the localStorage we get the item, and give our token as the argument.
</p>
<p> 
This returns a json web token that we need to decode using a library.
<br>
In our library jwtDecode we need to pass the json web token jwtDecode(jwt);
</p>
<p> 
What if our application loads and we dont have a json web token in our local storage, that is the case for anonymous users.
</p>
<p>
That is going to throw an error 
<b>InvalidTokenError: Invalid token specified</b> So if we pass null, an empty string or an invalid json web token to this decode function 
"const user = jwtDecode(jwt);" we will get an exception.
</p>
<p> 
To solve this issue we need to wrap this lines in a try catch block and if we have any errors, we just ignore it, in our empty catch block.
<br>
Because technically this is not an application error, this is only to handle the scenario where we dont have a valid json web token in the local storage.
</p>

<h1>Displaying the Current User on NavBar</h1>
<p> 
If the user doesn't exist, we a going to render the Login and Register links in the navBar, and if exist, we are going to take tha name from the users object and render it in the Navbar.
</p>
<p> 
There is an issue in our implementation, if we login with a valid credential, we will still see the the login and register links.
But if we refresh the page, the problem goes away.
</p>
<p> 
In our app component, we are getting the json web token from our local storage and decoding it inside of the componentDidMount method. This method is called only once during the lifecycle of our application.
<br>
Because our app component is mounted once, and whenever we change the state, its re rendered.
</p>
<p> 
So we need to go back to our login and register forms, and instead of using the history object to take the user to the homepage.
<br>
We need to do a full reload of the application, and as result, our app component will be mounted again.
</p>
