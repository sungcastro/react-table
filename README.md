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
Under the routes folder, in users file, we need to write in router.post(...) a standard http header
<b>.header("access-control-expose-headers", "x-auth-token")</b>
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

<h1>Loggin out a User</h1>
<p> 
If we delete the token key, from our local storage, the user gets log out.
<br>
So basically, if we have a json web token in our local storage, that means the user is logged in, otherwise that means they are logged out or anonymous.
</p>

<h1>Refactoring</h1>
<p>
If tomorrow, we decide to change the token <<'key'>> to something else, there are multiple places in our application that we need to modify.
<br>
Technically we should have only a single module where we have the implementation of authentication.
</p>

<h1>Calling Protected API Endpoints</h1>
<p> 
This are the end points that require the users to be authenticated or logged in, and potentially have certain permissions.
</p>
<p>
The module httpService is reponsible for making http calls to the back end, and this is the only place where axios is configured.
</p>
<p> 
So, whenever we want to send an http request, we need to include the header in the request. 
<br>
<b>axios.defaults.headers.common </b> with this, we can set headers on all kinds of http request. That is get request, post request and so on. We use bracket notation, to set a common header, that is 
<b>['x-auth-token']</b> and get the user token from local storage. But in here we shouldn't talk directly to the local storage, we are going to use our authService, because that is the only module that knows where this tokens are stored. 
</p>
<p> 
So whenever we have an http request, this header will be included. If the users is not logged in, token will be undefined, so this header will not be set.
</p>

<h1>Fixing Bi-directional Dependencies</h1>
<p> 
In our http service, we have a dependency to authService and at the same time, in authService we have a dependency to the http service.
<br>
So we have a bidirectional dependency.
</p>
<p> 
In order to fix this, first we need to determine which module is more an essential or core module. In this case is our httpService is the core module. Because if we can not make connections to the backend, the authentication doesn't even make sense.
</p>
<p> 
So our auth module, should be on top of the http module. Instead of http service telling to auth service, "hey, give me your json web token", we can go to auth service, and tell http service, "here is my json web token". So we reverse the statement.
</p>
<p>
We have created a very common and dangerous design issue, this is called bi-directional dependency.
</p>

<h1>Showing or Hiding Elements based on the User</h1>
<p> 
In order to show or hide elements if the user is logged in, we need to pass the user object to our movies component and there we will decide to show or hide various elements depending on this user object.
</p> 
<p> 
As we saw in the section, routing and navigation, we can not pass the user object as a property, So in order to pass additional props to the child component "Movies" we need to use the render attribute, so we need to replace component with render, and pass a function that takes props and returns the movies component. We need to give {...props} to the movies component this props includes history, match, and other props that React automatically injects  we we use routing. 
<br>
In addition to these props, we want to pass the prop that is our user object. And extract it in our movies component.
</p>

<h1>Protecting Routes</h1>
<p> 
Currently, if we go to /movies/new we can access to the form, without even logged in.
</p>
<p> 
So in the app component, we are going to use the same technique on the movies component to protect this route, pass a function and in that function we can check if the current user is null and if that is the case, we will redirect the user, otherwise we will render the movie form component.
</p>

<h1>Extracting Protected Route</h1>
<p> 
In order for not repeating the logic to protect a route, we can extract this route and put it in a component.
<br>
We want this<b>Protected Route</b> to be dynamic, and read what we need from props. 
</p>
<p> 
When we use the route component, we either supply a component or a render function.
So in our protected route component, its possible that the component from our props is null, so we should also pick the render function from our props. 
</p>
<p> 
So in our return statement we should have a conditional, if our component is trythy, we will return that, otherwise we will call the render function and give the props that we recive.
</p>
<p> 
Its also possible that this object might have other properties, so using the rest operator should add the other additional properties.
</p>

<h1>Redirecting after login</h1>
<p> If we want to redirect the user back to where they wanted to go, we need to modify our protected route component. </p>
<p>The props object has history, location, match objects, that are automatically passed from react router.</p>
<p>
The "to" attribute in the redirect component can be a string or an object. more info:
<b>https://reacttraining.com/react-router/web/api/Redirect</b>
</p>
<p> 
The state can be use to pass any additional data in the component we are redirecting the user to, in our case, the login component.
</p>
<p>The location object represent the current location before we redirect the user to the login page.</p>
<p>Back to our login form component, we need to see if state is set. If it's set, we will redirect the user back 
where they wanted to go. 
</p>
<p>We get the location object, and this location might have a state property, so we can use object destructuring to pick the state property. 
<br>
So now, insted of locating the user to the home page, if state is defined, we pick state.from ("that is the custom property that in the protected route component") ("from is a location object, and location objects in react router have a property called <b> pathname </b>")
otherwise, if state is not defined, we redirect the user to the home page.
</p>
<p> 
Also, if the user is logged in (auth.getCurrentUser) is defined, we can redirect them to the home page.
</p>

<h1>Enviroment Variables</h1>
<p> 
The parameters that we set in config.json are not enviroment specific. Every application goes through multiple enviroments.
<br>
Development, test and production. Sometimes we want the value of the parameters to be different accross different enviroments. 
</p>
<p> 
In our enviroment file, we can store all our enviroment variables with their default values, we can also have, enviroment specific files <.development, .test, .production> 
<br>
Variables have a key and a value, the key should start with <b>REACT_APP_</b> if we dont use prefix, all what we do is not going to work.
</p>
<p> 
If we do "console.log(process.env);" process represents the current process and env is a property of this object that represents all the enviroment variables.
</p>
<p>Everytime that we make changes in our .env files, we have to restart our application, because they are not watched.</p>
<p>In order to get the application name, we should get this property from the enviroment property.(process.env.REACT_APP_NAME);
</p>
