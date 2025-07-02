# SPA
__SPA__ stands for __Single Page Application__ .  
* __SPA__ is a web application that dynamically updates the webpage without reloading/refreshing the entire page. 
* React is mainly used to build single-page applications.
* All the HTML, CSS, JS are retrieved in the initial load and other data/resources can be loaded dynamically whenever required.
* In a single page application, all URLs are associated with a single HTML page.
* On navigating we only get the additional content(Component => HTML, CSS, JS).
* Single Page Application helps in faster page loading since they load only necessary Component (HTML, CSS, JS) resources on subsequent requests.

# MPA 
__MPA__ stands for __Multi-page application__
* In a Multi-page application, Every URL is associated with corresponding resources (HTML, CSS, JS).
* The browser downloads these resources when you access them or navigate between URLs.

## Q: What is the difference between `Client Side Routing` and `Server Side Routing`?
A: In `Server-side routing or rendering (SSR)`, every change in URL, http request is made to server to fetch the webpage, and replace the current webpage with the older one. 

In `Client-side routing or rendering (CSR)`, during the first load, the webapp is loaded from server to client, after which whenever there is a change in URL, the router library navigates the user to the new page without sending any request to backend. All `Single Page Applications uses client-side routing`. 





