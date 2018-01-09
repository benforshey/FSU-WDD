# Python Server-Side

## Events on the client side
* user interacts (many different ways)
* browser detects interaction and reports event to JS (via event listeners)
* JS runs function (can be quite complex)

## Events on the Server Side
* browser sends request
* server gets request; sends response
* browser interprets and displays response
* effectively, can only get new response with page load / refresh
    * MVC's can reload page segments
    * Node.js and WebSockets are an exception
    * page refreshes on form submit
* basically only one event server side: *request*

## Request Cause
* URL typed into browser
* link clicks
    * bookmarks fall into this
    * back button also
* submission of form (GET)
* AJAX request

## Parts of a Request
* data in GET sent as associative array (like JS object)
* look after "?" in Google search to see the variables
* can only use self.request in the MainHandler class!
