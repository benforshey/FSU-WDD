/*
    Project:    Better Board
    Author:     Ben Forshey
*/
(function ($) {
    'use strict';
    /*jslint browser:true */
    /*============================================
    FUNCTION-LEVEL VARIABLE DECLARATIONS
    ============================================*/
//    global variable to determine whether to update or to edit; passed as projectID to database
    var projectIdTracker = 0,
        noteIdTracker = 0,
        currentTeam = 0,
        userIdTracker = 0;

    /*============================================
    FUNCTION EXPRESSION DECLARATIONS
    ============================================*/
    //    call jQuery fadeToggle on clickedElement
    var toggleVisually = function (clickedElement) {
        clickedElement.fadeToggle();
    };

//    username autofill
    var usernameAutofill = function () {
        if (document.getElementById('userName')) {
            $.getJSON('xhr/check_login.php', function (data) {
                var userName = data.user.user_n;
                $('#userName').html(userName);
                currentTeam = data.user.teamID;
            });
        }
    };

//    random number generator between 99999999 and 1
    var createMinMaxRandomIngeter = function () {
        return Math.floor(Math.random() * (100000000 - 1)) + 1;
    };


    /*============================================
    PROJECT CRUD
    ============================================*/
    var projectCRUD = function () {

//        template a project per entry in database
        $.ajax({
            url : 'xhr/get_projects.php',
            type: 'get',
            dataType : 'json',
            success : function (data) {
                var i = 0,
                    l = data.projects.length;
//                loop the projects in the database and assign the key information to variables
                for (i, l; i < l; i = i + 1) {
                    var projectTitle = data.projects[i].projectName,
                        projectStatus = data.projects[i].status,
                        projectDueDate = data.projects[i].dueDate,
                        projectDescription = data.projects[i].projectDescription,
                        projectDatabaseId = data.projects[i].id;
//                    for each project, template the html
                    $('<div id="' + projectDatabaseId + '" class="project ui-state-default"><h3 class="projectTitle">' + projectTitle + '<span class="projectStatus"> (' + projectStatus + ') </span></h3><h4 class="projectDueDate">' + projectDueDate + '</h4><p class="projectDescription">' + projectDescription + '</p><button class="projectEdit primary">Edit Project</button><button class="projectRemove secondary">Remove Project</button></div>').appendTo('.projectContainer');
                }
            }
        });

//        add or replace project information to database
        $('#addProjectForm').on('submit', function (event) {
            event.preventDefault();
            var projectName = $('#projectName').val(),
                projectDescription = $('#projectDescription').val(),
                projectDueDate = $('#projectDueDate').val(),
                projectStatus = $('input[name="projectStatus"]:checked').val();
//            if this isn't an existing project (has value assigned to projectIdTracker), run as new project and reload the window
            if (projectIdTracker === 0) {
                $.ajax({
                    url : 'xhr/new_project.php',
                    type : 'post',
                    dataType : 'json',
                    data : {
                        projectName : projectName,
                        projectDescription : projectDescription,
                        dueDate : projectDueDate,
                        status : projectStatus
                    },
                    success : function (response) {
                        window.location.reload(true);
                    }
                });
//            otherwise update the project, passing in projectIdTracker as the projectID; after that, set projectIdTracker to 0 and reload the window
            } else {
                $.ajax({
                    url : 'xhr/update_project.php',
                    type : 'post',
                    dataType : 'json',
                    data : {
                        projectName : projectName,
                        projectDescription : projectDescription,
                        dueDate : projectDueDate,
                        status : projectStatus,
                        projectID : projectIdTracker
                    },
                    success : function (response) {
                        projectIdTracker = 0;
                        window.location.reload(true);
                    }
                });
            }
        });

//        pull up modal with values loaded into inputs
        $(document).on('click', '.projectEdit', function (event) {
            event.preventDefault();
            $('#submitAddProjectForm').html('Edit Project');
            var projectDatabaseId = $(this).parent('div').attr('id');
            $.ajax({
                url : 'xhr/get_projects.php',
                type: 'get',
                dataType : 'json',
                success : function (data) {
                    var i = 0,
                        l = data.projects.length;

                    for (i, l; i < l; i = i + 1) {
                        if (projectDatabaseId === data.projects[i].id) {
                            projectIdTracker = data.projects[i].id;
                            var oldProject = {
                                name : data.projects[i].projectName,
                                status : data.projects[i].status,
                                dueDate : data.projects[i].dueDate,
                                description : data.projects[i].projectDescription,
                                databaseId : data.projects[i].id
                            };

                            $('#projectName').val(oldProject.name);
                            $('#projectDescription').val(oldProject.description);
                            $('#projectDueDate').val(oldProject.dueDate);
                            $('input:radio[value="' + oldProject.status + '"]').prop('checked', true);
                        }
                    }
                }
            });
            toggleVisually($('.modalContainer'));
        });

//        delete function pulls the ID from the html and passes it to the PHP
        $(document).on('click', '.projectRemove', function (event) {
            event.preventDefault();
            var projectDatabaseId = $(this).parent('div').attr('id');
            $.ajax({
                url : 'xhr/delete_project.php',
                data : {
                    projectID : projectDatabaseId
                },
                type : 'post',
                dataType : 'json',
                success : function (data) {
                    window.location.reload(true);
                }
            });
        });

    };

    /*============================================
    NOTE CRUD
    ============================================*/
    var noteCRUD = function () {

//        fill in select element, for selecting associated project
        $.ajax({
            url : 'xhr/get_projects.php',
            type : 'get',
            dataType : 'json',
            success : function (data) {
                var i = 0,
                    l = data.projects.length;
//                loop through the project data to get the project title and ID
                for (i, l; i < l; i = i + 1) {
                    var projectName = data.projects[i].projectName,
                        projectID = data.projects[i].id;
//                    for each project, fill in select
                    $('<option value="' + projectID + '">' + projectName + '</option>').appendTo('#associatedProject');
                }
            }
        });

//        template a task per entry in database
        $.ajax({
            url : 'xhr/get_tasks.php',
            type: 'get',
            dataType : 'json',
            success : function (data) {
                var i = 0,
                    l = data.tasks.length;
//                loop the tasks in the database and assign the key information to variables
                for (i, l; i < l; i = i + 1) {
                    var noteName = data.tasks[i].taskName,
                        noteBody = data.tasks[i].taskDescription,
                        noteID = data.tasks[i].id,
                        projectID = data.tasks[i].projectID,
                        projectName = data.tasks[i].projectName;

//                    for each task, template the html with the note structure
                    $('<div id="' + noteID + '" class="note ui-state-default"><h3 class="noteName">' + noteName + '</h3><h4 class="projectName">Associated Project: ' + projectName + '</h4><p class="noteBody">' + noteBody + '</p><button class="noteEdit primary">Edit Note</button><button class="noteRemove secondary">Remove Note</button></div>').appendTo('.noteContainer');
                }
            }
        });

//        add or replace project information to database
        $('#addNoteForm').on('submit', function (event) {
            event.preventDefault();
            var noteName = $('#noteName').val(),
                noteBody = $('#noteBody').val(),
                associatedProject = $('#associatedProject').val(),
                statusRequired = "active";
//            if this isn't an existing project (has value assigned to projectIdTracker), run as new project and reload the window
            if (noteIdTracker === 0) {
                $.ajax({
                    url : 'xhr/new_task.php',
                    type : 'post',
                    dataType : 'json',
                    data : {
                        taskName : noteName,
                        taskDescription : noteBody,
                        projectID : associatedProject,
                        status : statusRequired
                    },
                    success : function (response) {
                        window.location.reload(true);
                    }
                });
//            otherwise update the project, passing in projectIdTracker as the projectID; after that, set projectIdTracker to 0 and reload the window
            } else {
                $.ajax({
                    url : 'xhr/update_task.php',
                    type : 'post',
                    dataType : 'json',
                    data : {
                        taskName : noteName,
                        taskDescription : noteBody,
                        taskID : noteIdTracker,
                        projectID : associatedProject,
                        status : statusRequired
                    },
                    success : function (response) {
                        noteIdTracker = 0;
                        window.location.reload(true);
                    }
                });
            }
        });

//        pull up modal with values loaded into inputs
        $(document).on('click', '.noteEdit', function (event) {
            event.preventDefault();
            $('#submitAddNoteForm').html('Edit Note');
            var noteDatabaseId = $(this).parent('div').attr('id');

            $.ajax({
                url : 'xhr/get_tasks.php',
                type: 'get',
                dataType : 'json',
                success : function (data) {
                    var i = 0,
                        l = data.tasks.length;

                    for (i, l; i < l; i = i + 1) {
                        if (noteDatabaseId === data.tasks[i].id) {
                            noteIdTracker = data.tasks[i].id;
                            var oldNote = {
                                name : data.tasks[i].taskName,
                                description : data.tasks[i].taskDescription,
                                databaseId : data.tasks[i].projectID
                            };

                            $('#noteName').val(oldNote.name);
                            $('#noteBody').val(oldNote.description);
                            $('#associatedProject').val(oldNote.databaseId);
                        }
                    }
                }
            });
            toggleVisually($('.modalContainer'));
        });

//        delete function pulls the ID from the html and passes it to the PHP
        $(document).on('click', '.noteRemove', function (event) {
            event.preventDefault();
            var noteDatabaseId = $(this).parent('div').attr('id');
            $.ajax({
                url : 'xhr/delete_task.php',
                data : {
                    taskID : noteDatabaseId
                },
                type : 'post',
                dataType : 'json',
                success : function (data) {
                    window.location.reload(true);
                }
            });
        });

    };

    /*============================================
    USER CRUD
    ============================================*/
    var userCRUD = function () {

//        template a user per entry in database that meets qualifications
        $.ajax({
            url : 'xhr/get_user_list.php',
            type: 'get',
            dataType : 'json',
            success : function (data) {
                var i = 0,
                    l = data.users.length;
//                loop the tasks in the database and assign the key information to variables (used avatar for user roles because oddly get_user_list.php doesn't return all fields of data that are stored in the database)
                for (i, l; i < l; i = i + 1) {
                    var userName = data.users[i].user_n,
                        userRoles = data.users[i].avatar,
                        teamID = data.users[i].teamID,
                        userID = data.users[i].id;
//                    for each user that matches the signed in user's id and has a role of admin, template the html with the note structure
                    if (currentTeam === teamID) {
                        $('<div id="' + userID + '" class="user ui-state-default"><h3 class="userName">' + userName + '</h3><h4 class="userRoles">Role: ' + userRoles + '</h4><button class="userEdit primary">Edit User</button><button class="userRemove></button></div>').appendTo('.userContainer');
                    }
                }
            }
        });

//          SECTION THAT FOLLOWS IS THE USER CRUD THAT I WASN'T ABLE TO GET WORKING; LEFT IN FOR POSTERITY'S SAKE
////        add or replace project information to database
//        $('#addUserForm').on('submit', function (event) {
//            event.preventDefault();
//            window.console.log("beginning submit event");
//            var userEmail = $('#addUserEmail').val(),
//                userName = $('#addUserName').val(),
//                userRoles = $('#addUserRoles').val(),
//                userPassword = $('#addUserPassword').val(),
//                confirmUserPassword = $('#addUserConfirmPassword').val(),
//                teamID = currentTeam;
////            if this isn't an existing project (has value assigned to projectIdTracker), run as new project and reload the window
//            window.console.log(userIdTracker);
//            if (userIdTracker === 0) {
//                window.console.log("passwords match; beginning ajax");
//                $.ajax({
//                    url : 'xhr/register.php',
//                    type : 'post',
//                    dataType : 'json',
//                    data : {
//                        username : userName,
//                        password : userPassword,
//                        avatar : userRoles,
//                        email : userEmail,
//                        teamID : teamID
//                    },
//                    success : function (response) {
//                        window.console.log("beginning register success function");
//                        window.console.log(response);
//                        $.ajax({
//                            url : 'xhr/get_user.php',
//                            type : 'get',
//                            dataType : 'json',
//                            data : {
//                                teamID : currentTeam
//                            },
//                            success : function (response) {
//                                window.console.log("beginning update user success function");
//                                window.console.log(response);
//                                window.location.reload(true);
//                            }
//                        });
//                    }
//                });
//
////            otherwise update the project, passing in projectIdTracker as the projectID; after that, set projectIdTracker to 0 and reload the window
//            } else {
//                window.console.log("else fired");
////                $.ajax({
////                    url : 'xhr/update_user.php',
////                    type : 'post',
////                    dataType : 'json',
////                    data : {
////                        username : userName,
//                            password : userPassword,
//                            avatar : userRoles,
//                            email : userEmail,
//                            teamID : teamID
////                    },
////                    success : function (response) {
////                        userIdTracker = 0;
////                        window.location.reload(true);
////                    }
////                });
//            }
//        });
//
////        NOT YET MODIFIED; WILL PULL UP MODAL WITH USER'S VALUES LOADED INTO FIELDS (JUST LIKE OTHER CRUD FUNCTIONS)
//        $(document).on('click', '.noteEdit', function (event) {
//            event.preventDefault();
//            $('#submitAddNoteForm').html('Edit Note');
//            var noteDatabaseId = $(this).parent('div').attr('id');
//            window.console.log(noteDatabaseId);
//            $.ajax({
//                url : 'xhr/get_tasks.php',
//                type: 'get',
//                dataType : 'json',
//                success : function (data) {
//                    var i = 0,
//                        l = data.tasks.length;
//
//                    for (i, l; i < l; i = i + 1) {
//                        if (noteDatabaseId === data.tasks[i].id) {
//                            noteIdTracker = data.tasks[i].id;
//                            var oldNote = {
//                                name : data.tasks[i].taskName,
//                                description : data.tasks[i].taskDescription,
//                                databaseId : data.tasks[i].projectID
//                            };
//
//                            $('#noteName').val(oldNote.name);
//                            $('#noteBody').val(oldNote.description);
//                            $('#associatedProject').val(oldNote.databaseId);
//                        }
//                    }
//                }
//            });
//            toggleVisually($('.modalContainer'));
//        });
//
////        NOT YET MODIFIED, BUT WILL "DELETE" A USER BY DISSASSOCIATING THE TEAM ID FROM THE USER!
//
//        $(document).on('click', '.noteRemove', function (event) {
//            event.preventDefault();
//            var noteDatabaseId = $(this).parent('div').attr('id');
//            $.ajax({
//                url : 'xhr/delete_task.php',
//                data : {
//                    taskID : noteDatabaseId
//                },
//                type : 'post',
//                dataType : 'json',
//                success : function (data) {
//                    window.location.reload(true);
//                }
//            });
//        });

    };

    /*============================================
    DOCUMENT READY
    ============================================*/
    $(document).ready(function () {
        /*============================================
        LOG IN
        ============================================*/
        $('#loginForm').submit(function (event) {
            event.preventDefault();
            var loginUserName = $('#loginUserName').val(),
                loginPassword = $('#loginPassword').val(),
                loginHoneyPot = $('#topYenoh-1').val(),
                status = $('#loginForm').find('label'),
                successError = function (response) {
                    if (response.error) {
                        status.addClass('warning formError').text(response.error);
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                };
//            if the honeypot is empty, AJAX to PHP file
            if (!loginHoneyPot) {
                $.ajax({
                    url : 'xhr/login.php',
                    type : 'POST',
                    dataType : 'json',
                    data : {
                        username : loginUserName,
                        password : loginPassword
                    },
                    success : successError
                });
            }
        });
        /*============================================
        SIGN UP
        ============================================*/
        $('#signupForm').submit(function (event) {
            event.preventDefault();
            var signupHoneyPot = $('#topYenoh-2').val(),
                email = $('#signupEmail').val(),
                username = $('#signupUserName').val(),
                password = $('#signupPassword').val(),
                confirmPassword = $('#signupConfirmPassword').val();
//            match passwords function
            var matchPassword = function () {
                if (password !== confirmPassword) {
                    $('#statusConfirmPassword').addClass('formError').html("Your passwords do not match.");
                    return false;
                } else {
                    return true;
                }
            };
            var successError = function (response) {
                if (response.error) {
                    window.alert(response.error);
                } else {
                    window.location.href = 'dashboard.html';
                }
            };
//            if the hidden field is empty and the passwords match, add user to database
            var passwordMatchBoolean = matchPassword();
            if (!signupHoneyPot && passwordMatchBoolean) {
                $.ajax({
                    url : 'xhr/register.php',
                    type : 'post',
                    dataType : 'json',
                    data : {
                        email : email,
                        username : username,
                        password : password,
                        avatar : "Admin"
                    },
                    success : successError
                });
            } else {
                return false;
            }
        });
        /*============================================
        LOG OUT + IN-APP NAVIGATION
        ============================================*/
//        go to home page on logout; chose to practice with $.ajax, but $.get worked well too
        $('#logoutSubmit').click(function (event) {
            event.preventDefault();
            var logout = function () {
                window.location.href = 'index.html';
            };
            $.ajax({
                url : 'xhr/logout.php',
                success : logout
            });

        });
//        go to dashboard page
        $('#dashboardButton').click(function (event) {
            event.preventDefault();
            window.location.href = 'dashboard.html';
        });
//        go to admin page
        $('#adminButton').click(function (event) {
            event.preventDefault();
            window.location.href = 'administration.html';
        });
//        go to projects page
        $('#projectsButton').click(function (event) {
            event.preventDefault();
            window.location.href = 'projects.html';
        });
//        go to notes page
        $('#notesButton').click(function (event) {
            event.preventDefault();
            window.location.href = 'notes.html';
        });
//        tabbed navigation
        $('#tabNav').find('ul').find('li').on('click', function (event) {
//            stop from following anchor element
            event.preventDefault();
//            store in vars the current href and anchor
            var $currentPanel = $(this).find('a').attr('href'),
                $currentTab = $(this).find('a');
//            remove the displayed class from everything
            $('#panelWrapper').find('div').removeClass('displayed');
            $('#tabNav').find('a').removeClass('active');
//            add the displayed class to what was clicked
            $($currentTab).addClass('active');
            $($currentPanel).addClass('displayed');
        });

        /*============================================
        TOOLTIP
        ============================================*/
//        fire toolTip on hover over any element with a title attribute
//        hover has mouseenter and mouseleave bound; calling both methods
        $('*[title]').hover(function () {
//            store the title of current hovered item in var
            var $title = $(this).attr('title');
//            creates data object with what was in the title text and removes the native title attribute
            $(this).data('toolTipText', $title).removeAttr('title');
//            appends title text into body, with a fade
            $('<p class="toolTip"></p>').text($title).appendTo('body').fadeIn('slow');
        }, function () {
//            restores title attribute with data object contents
            $(this).attr('title', $(this).data('toolTipText'));
//            removes the toolTip completely
            $('.toolTip').remove();
        }).mousemove(function (event) {
//            initialize variables
            var adjustY = 0,
                adjustX = 0,

//                get the dimensions of the page to determine upon which side of the cursor my toolTip should present
                pageHeight = $(window).height(),
                pageWidth = $(window).width(),

//                    getting the coordinates of the mouse
                mouseY = event.pageY,
                mouseX = event.pageX;

//            do the math for layout decision
            if (mouseY > (pageHeight / 2)) {
                adjustY = -140;
            } else {
                adjustY = 5;
            }
            if (mouseX > (pageWidth / 2)) {
                adjustX = -200;
            } else {
                adjustX = 10;
            }

//            add position to .toolTip
            $('.toolTip').css({
                'top' : (mouseY + adjustY) + 'px',
                'left' : (mouseX + adjustX) + 'px'
            });
        });


        /*============================================
        MODAL
        ============================================*/
//        toggle modal visibility, through named function
        $('.closeModal').on('click', function (event) {
            event.preventDefault();
            toggleVisually($('.modalContainer'));
        });
        $('#addProject').on('click', function (event) {
            event.preventDefault();
            toggleVisually($('.modalContainer'));
        });
        $('#addNote').on('click', function (event) {
            event.preventDefault();
            toggleVisually($('.modalContainer'));
        });
        $('#addUser').on('click', function (event) {
            event.preventDefault();
            toggleVisually($('.modalContainer'));
        });
//        fade effect on modal hover
        $('.statusImage').mouseover(function () {
            $(this).fadeTo(100, 0.5);
        });
        $('.statusImage').mouseleave(function () {
            $(this).fadeTo(100, 1);
        });

        /*============================================
        AJAX ERROR HANDLING
        ============================================*/
        $(document).ajaxError(function (event, jqxhr, settings, errorThrown) {
            window.console.log("An AJAX error has occurred. The event will be shown first; the error will be shown second.");
            window.console.log(event);
            window.console.log(errorThrown);
        });
    });

    /*============================================
    FUNCTION CALLS
    ============================================*/
    usernameAutofill();
    projectCRUD();
    noteCRUD();
    userCRUD();

//    jQuery Ui drag and drop
    $(function () {
        $('#sortable').sortable({
            placeholder : "ui-state-highlight",
            forcePlaceholderSize : true
        });
        $('#sortable').disableSelection();
    });

//    jQuery Ui datepicker
    $(function () {
        $('#projectDueDate').datepicker({
            showOtherMonths : true,
            selectOtherMonths : true,
            changeMonth : true,
            changeYear : true
        });
    });

//    jQuery Ui resizeable
    $(function () {
        $('#resizable').resizable({
            maxHeight : 1024,
            maxWidth : 960,
            minHeight : 580,
            minWidth : 540
        });
    });

})(jQuery);
//    end private scope with jQuery argument
