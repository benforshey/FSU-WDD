// youmightnotneedjquery.com IE8+ ready event
function ready(fn) {
    if (document.readyState !== 'loading'){
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState !== 'loading') {
                fn();
            }
        });
    }
}

// execute when DOM is ready
function readyWrap() {
    // facilitates deferred loading by capturing the data-deferSrc (where I'm storing the src URI), setting it to src on click
    // removes div containing anchor wrapped image fallback if JS loads
    // modeled from http://www.feedthebot.com/pagespeed/defer-videos.html (but requires on click events)
    function deferLoading() {
        var deferredElement = document.getElementById("js-deferLoad"),
            deferredElementSource = deferredElement.getAttribute('data-deferSrc');
        function addSource() {
            deferredElement.setAttribute('src', deferredElementSource);
        }
        document.querySelector('.JSVideoLoad').innerHTML = "<p>Loading&hellip;</p>";  // loading message for deferred video
        document.getElementById('accordionHeaderV').addEventListener('click', addSource);  // sets source for video when clicked
        document.getElementById('accordionContentV').removeChild(document.getElementById('noJSVideo'));  // removes noJS fallback
    }

    // checks for session; checks for localStorage support; sets eventListener; validates input and redirects page; loads when localStorage and current query disagree
    function viewController() {

        var session = document.getElementsByTagName('body')[0].getAttribute('data-session');  // get the boolean whether or not user is logged in

        function sessionSave(pathname) {  // saving to localStorage as the session saves to the database
            localStorage.setItem('section', pathname);
            return true;
        }

        function localSaveGo(pathname) {  // save to localStorage and go there
            localStorage.setItem('section', pathname);
            window.location = pathname;
            return true;
        }

        function targetFilter(event) {  // filter through the different properties of event that are sent
            event.preventDefault();

            if (event.target.nodeName === "A") {  // if the target falls on the anchor element
                localSaveGo(event.target.pathname);
            } else if (event.target.nodeName === 'svg') {  // if the target falls on the svg element
                localSaveGo(event.target.parentNode.pathname);
            } else if (event.target.nodeName === 'use') {  // if the target falls on the use element
                localSaveGo(event.target.parentNode.parentNode.pathname);
            } else {
                return false;
            }

        }

        function keyNav(event) {
            if (event.keyCode === 39) {
                var pathname = document.getElementById('nextNav').getAttribute('href');
                localStorage.setItem('section', pathname);
                window.location.pathname = pathname;
            } else if (event.keyCode === 37) {
                var pathname = document.getElementById('prevNav').getAttribute('href');
                localStorage.setItem('section', pathname);
                window.location.pathname = pathname;
            } else {
                return false;
            }
        }

        if ("localStorage" in window && window.localStorage !== null) {  // if the browser supports localStorage

            if (typeof session !== 'undefined' && session === 'true') {  // if the user is logged in (a session is present)

                sessionSave(window.location.pathname);  // save the session's progress to localStorage

                document.addEventListener('keydown', keyNav);  // keyboard nav while in session (which also saves to localStorage)

            } else {  // user is not logged in
                document.getElementById('js-saveProgress').addEventListener('click', targetFilter);  // if localStorage exists in the browser, set event listener to call the save function
                document.getElementById('js-allQuestions').addEventListener('click', targetFilter);  // if localStorage exists in the browser, set event listener to call the save function
                document.addEventListener('keydown', keyNav);  // if localStorage exists in the browser, set event listener to call the save function

                if (typeof localStorage.section !== 'undefined' && window.location.pathname !== localStorage.getItem('section')) {  // if section is set and the query and localStorage disagree
                    window.location.pathname = localStorage.getItem('section');  // set the pathname to what's in localStorage
                }
            }
        }
    }

    // modeled from http://heydonworks.com/practical_aria_examples/#progressive-collapsibles
    function accordionController() {
        var vH = document.getElementById('accordionHeaderV'),  // video header
            vC = document.getElementById('accordionContentV');  // video content

        vH.innerHTML = "<button class='accordionController button' aria-controls='accordionContentV' aria-expanded='false'>Show Video</button>";

        vC.setAttribute('class', 'embedContainer hidden');

        function showHide(event) {
            event.preventDefault();

            switch (this.getAttribute('id')) {  // built as a switch for further content (commentary, prayers)
                case 'accordionHeaderV':
                    if (vC.getAttribute('aria-hidden') === 'true') {
                        vH.innerHTML = "<button class='accordionController button' aria-controls='accordionContentV' aria-expanded='true'>Hide Video</button>";
                        vC.setAttribute('aria-hidden', 'false');
                        vC.setAttribute('class', 'embedContainer');
                    } else {
                        vH.innerHTML = "<button class='accordionController button' aria-controls='accordionContentV' aria-expanded='false'>Show Video</button>";
                        vC.setAttribute('aria-hidden', 'true');
                        vC.setAttribute('class', 'hidden');
                    }
                    break;
                default:
                    return false;
            }

        }

        vH.addEventListener('click', showHide);
    }

    deferLoading();
    viewController();
    accordionController();
}

ready(readyWrap);
