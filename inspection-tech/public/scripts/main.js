function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading') {
                fn();
            }
        });
    }
}
var readyWrap = function() {
    "use strict";

    var localDB = new PouchDB('reports');
    var remoteDB = new PouchDB('http://localhost:5984/integrous_web/');  // # customize #
    var checkboxes = document.getElementsByClassName('table_reportSelect');
    var checkboxesAll = document.getElementsByClassName('table_reportSelect__all')[0];
    var createReport = document.getElementsByClassName('reportActions__create')[0];
    var today = new Date(),
        thisDay = today.getDate(),
        thisMonth = today.getMonth(),
        thisYear = today.getYear();
    var days = document.getElementsByClassName('select__day')[0];
    var deleteButton = document.getElementsByClassName('reportActions__delete')[0];
    var months = document.getElementsByClassName('select__month')[0];
    var openReportButton = document.getElementsByClassName('reportDisplay_open');
    var pipeLibrary = {
        "abnormality": {
            "break": {
                "slight": {
                    "description": "The break is a small hole with some aggregate showing.",
                    "recommendation": "I recommend re-inspecting twice a year or just repairing the hole now. It will worsen over time."
                },
                "moderate": {
                    "description": "The break is a medium hole with a void under the pipe.",
                    "recommendation": "I recommend repairing the pipe now, as sewage is leaking into the ground and washing away the soil underneath the pipe."
                },
                "severe": {
                    "description": "The break is a large hole with a void under the pipe.",
                    "recommendation": "I recommend repairing the pipe now, as sewage is leaking into the ground and washing away the soil underneath the pipe."
                }
            },
            "buildup": {
                "slight": {
                    "description": "The buildup reduces less than 25% of the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend that nothing but toilet paper enter the line. Grease and oils contribute to buildups, as do products such as flushable wipes and feminine hygiene products. I would reinspect again in a few years to monitor the buildup&rsquo;s severity."
                },
                "moderate": {
                    "description": "The buildup reduces 25%&ndash;50% of the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend that the pipe be snaked or jetted to restore the side sewer&rsquo;s full functionality. I also recommend that nothing but toilet paper enter the line. Grease and oils contribute to buildups, as do products such as flushable wipes and feminine hygiene products."
                },
                "severe": {
                    "description": "The buildup reduces greater than 50% of the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend that the pipe be snaked or jetted to restore the side sewer&rsquo;s full functionality. I also recommend that nothing but toilet paper enter the line. Grease and oils contribute to buildups, as do products such as flushable wipes and feminine hygiene products."
                }
            },
            "corrosion": {
                "slight": {
                    "description": "The corrosion is without evidence of a break and causes less than 25% reduction in the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend re-inspecting the side sewer line every few years to monitor the progression of the corrosion."
                },
                "moderate": {
                    "description": "The corrosion is without evidence of a break and causes a 25%&ndash;50% reduction in the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend having the pipe cleaned out (snaking or jetting) and reinspected to determine the condition of the underlying material."
                },
                "severe": {
                    "description": "The corrosion is without evidence of a break and causes a greater than 50% reduction in the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend having the pipe cleaned out (snaking or jetting) and reinspected to determine the condition of the underlying material."
                }
            },
            "erosion": {
                "slight": {
                    "description": "The concrete aggregate is beginning to show through.",
                    "recommendation": "I recommend that you re-inspect the pipe every few years to monitor the erosion&rsquo;s progression."
                },
                "moderate": {
                    "description": "The concrete aggregate is showing through, and the interior surface of the pipe is bumpy.",
                    "recommendation": "I recommend that you re-inspect the pipe every year to monitor the erosion&rsquo;s progression."
                },
                "severe": {
                    "description": "The concrete aggregate is plainly visible, the interior surface is very bumpy, and pits in the pipe&rsquo;s structure are visible.",
                    "recommendation": "I recommend that you replace the pipe very soon, as the erosion will accelerate and sewage will leak into the soil."
                }
            },
            "foreign object": {
                "slight": {
                    "description": "The foreign object doesn&rsquo;t effect the overall function of the side sewer line.",
                    "recommendation": "There's no need to remove the foreign object, as it does not effect the overall function of the sewer line."
                },
                "moderate": {
                    "description": "The foreign object is hindering the overall function of the side sewer line.",
                    "recommendation": "I recommend that you have the foreign object removed."
                },
                "severe": {
                    "description": "The foreign object seriously impedes the overall function of the side sewer line.",
                    "recommendation": "I recommend that you have the foreign object removed."
                }
            },
            "fracture": {
                "slight": {
                    "description": "The fractures are slight have no effect on the side sewer&rsquo;s function.",
                    "recommendation": "I recommend that you inspect the pipe again in few years to determine if the fracturing is becoming more severe."
                },
                "moderate": {
                    "description": "The fractures are moderate and may or may not be effecting the side sewer&rsquo;s function.",
                    "recommendation": "I recommend that you inspect the pipe again every two years to monitor the condition of the fracturing."
                },
                "severe": {
                    "description": "The fractures are severe and have compromised the integrity of the side sewer.",
                    "recommendation": "I recommend that you replace the damaged section of the side sewer."
                }
            },
            "low area": {
                "slight": {
                    "description": "The low area retains less than 25% of the pipe&rsquo;s diameter.",
                    "recommendation": "Buildups may occur but are not likely to effect the overall function of the side sewer line. I recommend that nothing but toilet paper enter the line, as flushable wipes and feminine hygiene products may contribute to a buildup."
                },
                "moderate": {
                    "description": "The low area retains 25%&ndash;50% of the pipe&rsquo;s diameter.",
                    "recommendation": "Buildups will likely occur and may be severe enough to effect the overall function of the side sewer line. I recommend that nothing but toilet paper enter the line, as flushable wipes and feminine hygiene products will contribute to a buildup."
                },
                "severe": {
                    "description": "The low area retains greater than 50% of the pipe&rsquo;s diameter.",
                    "recommendation": "Buildups will likely occur and will likely effect the overall function of the side sewer line. I recommend that the low area be repaired."
                }
            },
            "offset": {
                "slight": {
                    "description": "The pipe is slightly offset and is very unlikely to effect the function of the side sewer. No soil is visible.",
                    "recommendation": "No action is needed for this slight offset."
                },
                "moderate": {
                    "description": "The pipe is moderately offset but is unlikely to effect the function of the side sewer since no soil is visible at the joint.",
                    "recommendation": "I recommend that you inspect the pipe again in a few years to see if the offset has shifted."
                },
                "severe": {
                    "description": "The pipe is severely offset, causing a break in the integrity of the side sewer. Soil is visible.",
                    "recommendation": "I recommend having this offset joint repaired."
                }
            },
            "root intrusion": {
                "slight": {
                    "description": "The roots block less than 25% of the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend that you have the root treated with a foaming herbicide like RootX."
                },
                "moderate": {
                    "description": "The roots block between 25%&ndash;50% of the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend that you have the pipe cleaned (snaked or jetted) then regularly treated with a foaming herbicide like RootX."
                },
                "severe": {
                    "description": "The roots block less than 25% of the pipe&rsquo;s capacity.",
                    "recommendation": "I recommend that you have the pipe cleaned (snaked or jetted) then regularly treated with a foaming herbicide like RootX."
                }
            }
        },
        "composition": {
            "access point": {
                "basement": "I accessed the side sewer line from the basement cleanout.",
                "crawlspace": "I accessed the side sewer line from the crawlspace cleanout.",
                "garage": "I accessed the side sewer line from the garage cleanout.",
                "laundry room": "I accessed the side sewer line from the laundry room cleanout.",
                "outside": "I accessed the side sewer line from the outside cleanout.",
                "pulled toilet": "Since no cleanout was accessible, I pulled the toilet to access the side sewer line.",
                "roof vent": "Since no cleanout was accessible, I accessed the side sewer line from a roof vent."
            },
            "end point": {
                "blockage": "The camera was stopped by a blockage.",
                "break": "The camera was stopped by a break in the line.",
                "city main": "The camera reached the city main line.",
                "foreign object": "The camera was stopped by a foreign object in the side sewer line.",
                "max run": "The camera reached the maximum length of the cable before reaching the city main line.",
                "offset": "The camera was stopped by an offset pipe in the side sewer line.",
                "resistance": "The camera was stopped by resistance from multiple bends in the line."
            },
            "tie in": {
                "from above": "The side sewer line is joined by another line from above.",
                "from left": "The side sewer line is joined by another line from the left.",
                "from right": "The side sewer line is joined by another line from the right."
            },
            "transition": {
                "from": {
                    "ABS": "The side sewer line transitioned from ABS ",
                    "cast iron": "The side sewer line transitioned from cast iron ",
                    "vitrified clay": "The side sewer line transitioned from vitrified clay pipe",
                    "concrete": "The side sewer line transitioned from concrete ",
                    "copper": "The side sewer line transitioned from copper ",
                    "lead": "The side sewer line transitioned from lead ",
                    "Orangeburg": "The side sewer line transitioned from Orangeburg ",
                    "PVC": "The side sewer line transitioned from PVC ",
                    "SDR": "The side sewer line transitioned from SDR ",
                    "Transite": "The side sewer line transitioned from Transite "
                },
                "to": {
                    "ABS": "to ABS.",
                    "cast iron": "to cast iron.",
                    "vitrified clay": "to vitrified clay pipe.",
                    "concrete": "to concrete.",
                    "copper": "to copper.",
                    "lead": "to lead.",
                    "Orangeburg": "to Orangeburg.",
                    "PVC": "to PVC.",
                    "SDR": "to SDR.",
                    "Transite": "to Transite."
                }
            }
        }
    };
    var previewLink = document.getElementsByClassName('js_previewReport')[0];
    var reportTable = document.getElementsByTagName('table')[0],
        tableBody = reportTable.getElementsByClassName('table_body')[0];
    var reportFilterSelect = document.getElementsByClassName('reportFilter__select')[0];
    var saveButton = document.getElementsByClassName('js_saveReport')[0];
    var sharingForm = document.getElementsByClassName('js_sharingForm')[0];
    var sharingParent = document.getElementsByClassName('js_sharingParentNode')[0];
    var sharingBlock = document.getElementsByClassName("js_sharingClone");
    var shareButton = document.getElementsByClassName('js_shareReport')[0];
    var years = document.getElementsByClassName('select__year')[0];

    var logErrorInDB = function (err) {  // "every doc a delta" error logging
        var stamp = Date.now();
        localDB.put({
            _id: stamp + " error",
            error_name: err.name,
            error_message: err.message
        }).catch(function (err) {  // to prevent recursive hell, don't log this error in the db
            console.log(err);
        });
    };

    var getConnectionStatus = function () {
        return navigator.onLine;
    };

    var connectionHandler = function () {  // sets connection info to user and starts / stops database sync
        var internetStatus = document.getElementsByClassName('connectionInfo__internetStatus');
        var databaseStatus = document.getElementsByClassName('connectionInfo__databaseStatus');
        var i;
        var j = internetStatus.length;

        var connection = getConnectionStatus();

        var syncDatabasesHandler = localDB.sync(remoteDB, {  // start syncing (attempt)
            live: true,
            retry: true
        }).on('change', function (change) {
            displayReportRange();  // update the UI
        }).on('error', function (err) {
            logErrorInDB(err);
        });

        if (!connection) {  // stop the db sync if offline
            //syncDatabasesHandler.on('complete', function (info) {  // event for sync canceled (currently unused)
            //});

            syncDatabasesHandler.cancel();  // the call to cancel sync
        }
        
        for (i = 0; i < j; i += 1) {  // write to user
            internetStatus[i].innerHTML = connection ? "Working Online" : "Working Offline";
            databaseStatus[i].innerHTML = connection ? "Saved Remotely and Locally" : "Saved Locally";
        }

        if (shareButton) {
            setShareButtonDisabledState();  // check if share button should be disabled due to connection
        }

        window.addEventListener('online', connectionHandler);  // sets listeners on the window for online events
        window.addEventListener('offline', connectionHandler);  // sets listeners on the window for offline events
    };

    var disableButton = function (target, intent) {  // disable or enable button states
        var button = target;
        var disable = intent;
        var classString;

        if (disable) {  // add the styles
            button.className += ' disabled';
        } else {
            if (button.classList.contains('disabled')) {  // test for class in > IE9
                button.classList.remove('disabled');
            } else if (new RegExp('(^| )' + 'disabled' + '( |$)', 'gi').test(button.className)) {  // test for class in < IE10
                classString = button.className;  // get it & set it
                classString.replace(' disabled', '');  // remove it
                button.className = classString;  // put it
            }
        }

        return button.disabled = disable;  // set disabled attribute to true or false
    };

    var goToTail = function (path) {  // function for button navigation by adding a tail onto the pathname; checks for trailing slash
        if (location.href.slice(-1) !== '/') {
            return window.location.pathname += '/' + path;
        } else {
            return window.location.pathname += path
        }
    };

    /* SPECIFIC TO REPORTS */

    var deleteButtonStatus = function () {  // set the singular or plural wording for delete button
        var num = countCheckedCheckboxes();

        if (num < 1) {  // plurality and state checks
            deleteButton.innerHTML = 'Delete Report';
            return disableButton(deleteButton, true);
        } else if (num === 1) {
            deleteButton.innerHTML = 'Delete Report';
            return disableButton(deleteButton, false);
        } else {
            deleteButton.innerHTML = 'Delete Reports';
            return disableButton(deleteButton, false)
        }
    };

    var getNumDaysInMonth = function (year, month) {
        return new Date(year, month, 0).getDate();  // the zero-th day of the next month (since Date constructor is 0-based by my select values are not) is the last day (number of days) in the previous month
    };

    var setDefaultSelectMonth = function () {
        for (var i = 0; i < months.children.length; i += 1) {  // loop through each month in the select
            if (parseInt(months[i].value - 1, 10) === thisMonth) {  // find the value that equals this month (-1 to adjust for 0-based month in constructor)
                months[i].selected = true;  // select it
            }
        }
        populateSelectDays();  // call once default month is set
    };

    var populateSelectDays = function () {
        var defaultOption = document.createElement('option');
        var daysToPopulate = getNumDaysInMonth(years.value, months.value);
        var i;
        var j = daysToPopulate + 1;

        while(days.lastChild) {
            days.removeChild(days.lastChild);
        }

        defaultOption.innerHTML = '&mdash;';
        defaultOption.value = '';
        defaultOption.selected = true;
        days.appendChild(defaultOption);

        for (i = 1; i < j; i += 1) {  // 'i' set to 1 for writing number of days; 'j' adjusted with + 1 also
            var option = document.createElement('option');
                option.value = i;
                option.innerHTML = i;
                days.appendChild(option);
        }
    };

    var checkUncheckAll = function () {
        var i = 0;
        var j = checkboxes.length;
        if (checkboxesAll.checked) {
            for (i = 0; i < j; i += 1) {
                checkboxes[i].checked = true;
            }
        } else {
            for (i = 0; i < j; i += 1) {
                checkboxes[i].checked = false;
            }
        }
    };

    var countCheckedCheckboxes = function () {
        var numChecked = 0;
        for (var i = 0; i < checkboxes.length; i += 1) {
            if (checkboxes[i].checked) {
                numChecked += 1;
            }
        }
        return numChecked;
    };

    var displayReportRange = function () {
        var year = parseInt(years.value);
        var month = parseInt(months.value);
        var day = parseInt(days.value);
        var asFarBackAs;
        var upUntil;

        if (year && month && day) {  // all three selected
            asFarBackAs = new Date(year, month - 1, day).toISOString();  // take away 1 because the Date object's month is 0-based
            upUntil = new Date(year, month - 1, day + 1).toISOString();
        } else if (year && month) {  // just year and month; everything from the beginning of the month to the end of the month (< the beginning of next month)
            asFarBackAs = new Date(year, month - 1).toISOString();  // this month
            upUntil = new Date(year, month).toISOString();  // first day of next month
        } else {  // just year selected; everything from the beginning of the year to now
            asFarBackAs = new Date(year).toISOString();
            upUntil = new Date().toISOString();  // now
        }

        localDB.allDocs({
            include_docs: true,
            startkey: asFarBackAs,
            endkey: upUntil
        }).then(function (results) {
            var i;
            var j = results.rows.length;
            while (tableBody.lastChild) {
                tableBody.removeChild(tableBody.lastChild);
            }

            for (i = 0; i < j; i += 1) {
                var row = document.createElement('tr');
                row.innerHTML =
(`<td><button class="reportDisplay_open primaryAction" data-id="${results.rows[i].doc._id}">Open</button></td>
<td>${results.rows[i].doc.customer.inspectionDate}</td>
<td>${results.rows[i].doc.customer.inspectionSite}</td>
<td>${results.rows[i].doc.customer.agent}</td>
<td>${results.rows[i].doc.customer.name}</td>
<td>${results.rows[i].doc.invoice.price}</td>
<td class="table_selectContainer"><input class="table_reportSelect" type="checkbox" title="select report"></td>`);
                tableBody.appendChild(row);
            }

            return tableListeners(); // set listeners on new elements

        }).catch(function (err) {
            logErrorInDB(err);
            console.log(err);
        });
    };

    var markReportForEdit = function (e) {
        var editID = e.target.dataset.id;
        localDB.upsert('_local/edit_id', function (doc) {
            doc.edit_id = editID;
            return doc;
        }).catch(function (err) {
            logErrorInDB(err);
            console.log(err);
        });
        return goToTail('generator');
    };

    var createButtonListeners = function () {
        createReport.addEventListener('click', function () {
            localDB.get('_local/edit_id').then(function (doc) {  // get and delete the local edit doc (not an edit)
                return localDB.remove(doc);
            }).then(function () {  // then go to the generator
                return goToTail('generator');
            }).catch(function (err) {
                if (err.status === 404) {
                    return goToTail('generator');
                }
                logErrorInDB(err);
                console.log(err);
            });

        });
    };

    var deleteButtonListeners = function () {
        deleteButton.addEventListener('click', function () {
            for (var i = 0; i < checkboxes.length; i += 1) {
                if (checkboxes[i].checked) {  // if the checkbox is checked
                    localDB.get(checkboxes[i].parentNode.parentNode.children[0].children[0].dataset.id).then(function (doc) {  // get the doc's id from open button
                        return localDB.remove(doc);  // delete the report
                    }).catch(function (err) {
                        logErrorInDB(err);
                        console.log(err);
                    });
                }
            }
        });
    };

    var selectListeners = function () {
        reportFilterSelect.addEventListener('change', function (e) {
            var targetClass = e.target.className;
            if (targetClass === 'select__year' || targetClass === 'select__month') {  // the target's className should cause the day select to repopulate
                populateSelectDays();  // populate the select days
                return displayReportRange();  // display what is chosen
            } else {  // the target's className shouldn't cause the day select to repopulate
                return displayReportRange();  // just display what is chosen
            }

        });
    };

    var tableListeners = function () {
        var i;
        var j = openReportButton.length;
        reportTable.addEventListener('change', function (e) {
            if (e.target.nodeName === 'INPUT') {
                if (e.target.className === 'table_reportSelect__all') {
                    checkUncheckAll();
                }
                return deleteButtonStatus();
            }
        });

        for (i = 0; i < j; i += 1) {
            openReportButton[i].addEventListener('click', markReportForEdit);
        }
    };

    /* SPECIFIC TO REPORT GENERATOR */

    var saveReport = function (id) {  // save report
        localDB.upsert(id, buildReport).then(function () {
        }).catch(function (err) {
            logErrorInDB(err);
            console.log(err);
        });
    };

    var buildReport = function () {
        var report = {
            "_id": "",
            "company": {
                "name": "",
                "tagline": "",
                "url": ""
            },
            "inspector": {
                "name": "",
                "phone": "",
                "email": ""
            },
            "customer": {
                "inspectionType": "",
                "inspectionDate": "",
                "inspectionSite": "",
                "name": "",
                "agent": ""
            },
            "summary": [

            ],
            "invoice": {
                "quantity": "",
                "item": "",
                "price": ""
            },
            "composition": [

            ],
            "abnormalities": [

            ],
            "legal": [

            ],
            "sharing": [

            ]
        };

        report._id = shareButton.dataset.id;  // pull the id from the page
        setPreviewPath(report._id);  // and set the preview path

        (function company() {
            report.company.name = document.querySelector('.company_name').innerHTML;
            report.company.tagline = document.querySelector('.company_tagline').innerHTML;
            report.company.url = document.querySelector('.company_url').innerHTML;
            report.company.logo = document.getElementsByClassName('company_logo')[0].src;
        })();
        (function inspector() {
            report.inspector.name = document.querySelector('.inspector_name').children[1].innerHTML;
            report.inspector.phone = document.querySelector('.inspector_phone').children[1].innerHTML;
            report.inspector.email = document.querySelector('.inspector_email').children[1].innerHTML;
        })();
        (function customer() {
            report.customer.inspectionType = document.querySelector('.customer_inspectionType').innerHTML;
            report.customer.inspectionDate = document.querySelector('.customer_inspectionDate').innerHTML;
            report.customer.inspectionSite = document.querySelector('.customer_site').children[1].innerHTML;
            report.customer.name = document.querySelector('.customer_name').children[1].innerHTML;
            report.customer.agent = document.querySelector('.customer_agent').children[1].innerHTML;
        })();
        (function summary() {
            var summary = document.querySelectorAll('.summary_paragraph');
            for (var i = 0; i < summary.length; i += 1) {
                report.summary[i] = summary[i].innerHTML;
            }
        })();
        (function invoice() {
            report.invoice.quantity = document.querySelector('.table_quantity').innerHTML;
            report.invoice.item = document.querySelector('.table_item').innerHTML;
            report.invoice.price = document.querySelector('.table_price').innerHTML;
        })();
        (function compositionBlock() {
            var compositionBlock = document.querySelectorAll(".js_compositionClone");
            var compositionBlockObject = {};
            for (var i = 0; i < compositionBlock.length; i += 1) {
                for (var j = 0; j < compositionBlock[i].children.length; j += 1) {
                    compositionBlockObject[compositionBlock[i].children[j].children[0].id] = compositionBlock[i].children[j].children[0].value;
                }
                var keysArray = Object.keys(compositionBlockObject);  // array of keys
                var filled = false;  // set to false; if one field is filled, store entire object in report
                for (var k = 0; k < keysArray.length; k += 1) {  // loop through the temp object
                    if (compositionBlockObject[keysArray[k]] !== '') {  // if it's not empty
                        filled = true;  // then it's filled
                    }
                }
                if (filled) {  // if it's filled, put it in the report
                    report.composition[i] = compositionBlockObject;
                }
                compositionBlockObject = {};  // reset to empty
            }
        })();
        (function abnormalitiesBlock() {
            var abnormalitiesBlock = document.querySelectorAll(".js_abnormalitiesClone");
            var abnormalitiesBlockObject = {};
            for (var i = 0; i < abnormalitiesBlock.length; i += 1) {
                for (var j = 0; j < abnormalitiesBlock[i].children.length; j += 1) {
                    abnormalitiesBlockObject[abnormalitiesBlock[i].children[j].children[0].id] = abnormalitiesBlock[i].children[j].children[0].value;
                }
                var keysArray = Object.keys(abnormalitiesBlockObject);  // array of keys
                var filled = false;  // set to false; if one field is filled, store entire object in report
                for (var k = 0; k < keysArray.length; k += 1) {  // loop through the temp object
                    if (abnormalitiesBlockObject[keysArray[k]] !== '') {  // if it's not empty
                        filled = true;  // then it's filled
                    }
                }
                if (filled) {  // if it's filled, put it in the report
                    report.abnormalities[i] = abnormalitiesBlockObject;
                }
                abnormalitiesBlockObject = {};  // reset to empty
            }
        })();
        (function legal(){
            var legal = document.querySelectorAll('.legal_paragraph');
            for (var i = 0; i < legal.length; i += 1) {
                report.legal[i] = legal[i].innerHTML;
            }
        })();
        (function sharing() {
            var sharingEmails = [];
            for (var i = 0; i < sharingBlock.length; i += 1) {  // push filled inputs into array
                if (sharingBlock[i].children[0].value) {
                    sharingEmails.push(sharingBlock[i].children[0].value);
                }
            }
            report.sharing = sharingEmails;  // put array as report.sharing value
        })();

        return report;
    };

    function buildPage(doc) { // todo: finish so that Composition and Abnormalities build (and whatever else isn't done)

        shareButton.dataset.id = doc._id;  // set the id on the page from the doc
        setPreviewPath(doc._id);  // and set the preview path

        (function company() {
            document.querySelector('.company_name').innerHTML = doc.company.name;
            document.querySelector('.company_tagline').innerHTML = doc.company.tagline;
            document.querySelector('.company_url').innerHTML = doc.company.url;
        })();
        (function inspector() {
            document.querySelector('.inspector_name').children[1].innerHTML = doc.inspector.name;
            document.querySelector('.inspector_phone').children[1].innerHTML = doc.inspector.phone;
            document.querySelector('.inspector_email').children[1].innerHTML = doc.inspector.email;
        })();
        (function customer() {
            document.querySelector('.customer_inspectionType').innerHTML = doc.customer.inspectionType;
            document.querySelector('.customer_inspectionDate').innerHTML = doc.customer.inspectionDate;
            document.querySelector('.customer_site').children[1].innerHTML = doc.customer.inspectionSite;
            document.querySelector('.customer_name').children[1].innerHTML = doc.customer.name;
            document.querySelector('.customer_agent').children[1].innerHTML = doc.customer.agent;
        })();
        (function summary() {
            var summary = document.querySelectorAll('.summary_paragraph');
            for (var i = 0; i < doc.summary.length; i += 1) {
                summary[i].innerHTML = doc.summary[i];
            }
        })();
        (function invoice() {
            document.querySelector('.table_quantity').innerHTML = doc.invoice.quantity;
            document.querySelector('.table_item').innerHTML = doc.invoice.item;
            document.querySelector('.table_price').innerHTML = doc.invoice.price;
        })();
        (function legal () {
            var legal =  document.getElementsByClassName('legal_paragraph');
            var j = legal.length;
            for (var i = 0; i < j; i += 1) {
                legal[i].innerHTML = doc.legal[i];
            }
        })();

    }

    var generateSharingInputs = function (emails, callback) {  // dynamically generate inputs with or without report content

        var generateExisting = function (email) {
            var span = document.createElement('span');
            var input = document.createElement('input');

            span.className = 'formBlock__inline js_sharingClone fadeIn';
            span.innerHTML = 'email';

            if (email) {  // prevent TypeError when calling on undefined values
                input.size = email.length;
                input.value = email;
            }

            input.className = 'js_inputWidth formBlock_input input__inline';
            input.name = 'email';
            input.type = 'email';
            input.placeholder = 'email@example.com';

            span.appendChild(input);
            sharingParent.appendChild(span);


        };

        var generateNew = function () {  // generate and place into the DOM
            var span = document.createElement('span');
            var input = document.createElement('input');

            span.className = 'formBlock__inline js_sharingClone fadeIn';
            span.innerHTML = 'email';

            input.size = '15';
            input.className = 'js_inputWidth formBlock_input input__inline';
            input.name = 'email';
            input.type = 'email';
            input.placeholder = 'email@example.com';

            span.appendChild(input);
            sharingParent.appendChild(span);

        };

        sharingParent.addEventListener('input', function () {  // checks if a new input should be created
            var i;
            var l = sharingBlock.length;

            var numEmpty = 0;

            for (i = 0; i < l; i += 1) {  // todo: delete empty inputs, leaving only one empty input on the end
                if (sharingBlock[i].children[0].value === '') {
                    numEmpty += 1;
                }
            }

            if (!numEmpty) {  // if the input is not empty, make a new one
                generateNew();
            }

            return setShareButtonDisabledState();  // call to set the state of the sharing button

        });

        if (emails) {  // if this function is called with existing emails
            var i;
            var l = emails.length;

            for (i = 0; i < l; i += 1) {  // generate and fill an input per email
                generateExisting(emails[i]);
            }

            generateNew();  // add an additional blank input after filling the existing emails
            setShareButtonDisabledState();

        } else {
            generateNew();  // just generate a blank input
        }

        if (callback) {  // call if callback
            return callback();
        }



    };

    var getIfEdit = function () {
        var editID;
        localDB.get('_local/edit_id').then(function (doc) {  // try to get the document id which is stored for editing
            editID = doc.edit_id;
        }).then(function () {  // this means it exists; build the page with it
            localDB.get(editID).then(function (doc) {
                return buildReportPageController(doc);
            }).catch(function (err) {  // some error (not 404)
                logErrorInDB(err);
                console.log(err);
            })
        }).catch(function (err) {  // the edit document id doesn't exist, so build the page without the document
            if (err.status === 404) {
                return buildReportPageController();
            }
            logErrorInDB(err);
            console.log(err);
        });
    };

    var setPreviewPath = function (id) {
        previewLink.href = '/integrous-web/reports/' + id;  // # customize #
        previewLink.className = 'js_previewReport';
    };

    var sharingController = function (e) {  // save the report, then send POST of email addresses in report
        e.preventDefault();

        localDB.upsert(e.target.dataset.id, buildReport).then(function () {
            localDB.get(e.target.dataset.id).then(function (doc) {
                var AJAX = new XMLHttpRequest();
                var i;
                var l = doc.sharing.length;
                var emailPayload = [];

                for (i = 0; i < l; i += 1) {
                    emailPayload.push({
                        "email": doc.sharing[i]
                    })
                }

                AJAX.addEventListener('load', function (e) {  // todo: e.target.response will hold errors / success; hook that back into the UI
                    console.log(e.target.response);
                });
                AJAX.open('POST', '/integrous-web/reports/generator', true);  // # customize #
                AJAX.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                AJAX.send('email=' + JSON.stringify(emailPayload) + '&link=https://www.inspection.tech/integrous-web/reports/' + doc._id);    // # customize #

            }).catch(function (err) {
                logErrorInDB(err);
                console.log(err);
            });

        }).catch(function (err) {
            logErrorInDB(err);
            console.log(err);
        });

    };

    var setShareButtonDisabledState = function () {  // sends correct call to disableButton based on logic of two values
        var connection = getConnectionStatus();
        var disable = true;  // set to true so that one input with a value will set to false
        var i;
        var j = sharingBlock.length;

        for (i = 0; i < j; i += 1) {  // loop through and set disable to false if one block has a value
            if (sharingBlock[i].children[0].value !== '') {
                disable = false;
            }
        }

        if (disable && connection) {  // disable, even though we're online
            disableButton(shareButton, true);
        } else if (!disable && connection) {  // no mandate to disable; pass decision to connection status
            disableButton(shareButton, false);
        } else if (!disable && !connection) {  // no mandate to disable; pass decision to connection status
            disableButton(shareButton, true);
        } else if (disable && !connection) {  // disable
            disableButton(shareButton, true);
        }


    };

    (function inputDimensionController() {
        var inputs = document.querySelectorAll('.js_inputWidth, .js_inputHeight'),  // querySelectorAll doesn't return 'null' (returns empty node list); ```if (inputs) {}``` won't work.
            delegate = document.querySelectorAll('.js_eventDelegation');  // using this selector for event delegation
        var widthController = function (e) {
            var base = 15;  // base size for all inputs
            var chars = e.target.value.length;
            var size = e.target.size;
            if (chars > size) {  // if the input needs to expand
                return e.target.size = e.target.value.length;  // expand it
            } else if (chars < size && chars > base) {  // if the input contains less than its width and still has more than 15 characters
                return e.target.size = e.target.value.length;  // shrink it
            } else {  // otherwise
                e.target.size = base;  // set to the base width
            }
        };
        var heightController = function (e) {
            if (e.target.scrollHeight > e.target.clientHeight) {
                var rows = e.target.rows;
                e.target.rows = rows + 1;
            } else if (e.target.value.length === 0) {  // resets rows to 2 if all text is removed
                e.target.rows = 2;
            }
        };
        var nodeNameFilter = function (e) {  // sorts and calls appropriate functions
            switch (e.target.nodeName) {
                case 'INPUT':  // if input, set the width to "size" attribute (or min of 20), which is character count for input type text
                    if (e.target.classList.contains('js_inputWidth')) {  // test for class in > IE9
                        widthController(e);
                    } else if (new RegExp('(^| )' + 'js_inputWidth' + '( |$)', 'gi').test(e.target.className)) {  // test for class in < IE10
                        widthController(e);
                    }
                    break;
                case 'TEXTAREA':  // if text area, set the number of rows (default of 2) to plus one when the scroll height exceeds the client height
                    heightController(e);  // currently no need to test classList, since textarea has only this javascript hook
                    break;
                default:
                    return false;
            }
        };
        if (inputs.length !== 0) {  // if there are targeted inputs on the page
            for (var i = 0; i < delegate.length; i += 1) {  // loop through and add event listeners to the delegate
                delegate[i].addEventListener('input', nodeNameFilter);
            }
        }
    })();
    (function sectionController() {  // ToDo: add support for older IE and Safari (maybe AJAX call to JSON?) for datalist element

        (function reportComposition() {
            var parent = document.querySelector('.js_compositionParentNode');  // grab the parent
            var node = document.querySelectorAll('.js_compositionClone');  // grab the existing node
            if (parent) {  // so wrapped to prevent type error
                var descriptionTrigger = parent.querySelectorAll('.js_description');
            }
            var inputHits = 0;  // sets the number of input hits
            function resetInputHits() {
                return inputHits = 0;
            }
            function clone(e) {  // creates the new node and adds the inner HTML; appends; calls 'cycle'
                var baseIDFull = e.target.parentNode.children[0].id;  // pull the id from the first node in the form block
                var baseIDStripped = baseIDFull.replace(/\D+/g, '');  // strip the words
                var nextNameID = Number(baseIDStripped) + 1;  // iterate the number for use in assigning to clone
                var newClone = node[node.length - 1].cloneNode(false);
                newClone.className = 'report_formBlock js_compositionClone fadeIn';
                newClone.innerHTML = (
`<span class="formBlock__inline">distance<input size="15" class="js_inputWidth js_generateNew formBlock_input input__inline" id="distanceComp${nextNameID}" name="distanceComp${nextNameID}" type="text" placeholder="at x"></span>
<span class="formBlock__inline">event<input size="15" class="js_inputWidth formBlock_input input__inline" id="eventComp${nextNameID}" name="eventComp${nextNameID}" list="eventCompDL" type="text" placeholder="&darr; choose an event"></span>
<label class="formBlock_label">description<textarea class="js_inputHeight formBlock_textarea" id="descriptionComp${nextNameID}" name="descriptionComp${nextNameID}" placeholder="description"></textarea></label>`
                );
                parent.appendChild(newClone);
                return cycle();
            }
            function unfold(e) {
                var val = e.target.value;
                var formBlock = e.target.parentNode.parentNode;
                var siblingNode = e.target.parentNode.nextElementSibling;
                var newNode = document.createElement('span');
                var siblingIDStripped = siblingNode.children[0].id.replace(/\D+/g, '');
                var duplicate;
                newNode.className = 'js_unfolded formBlock__inline fadeIn';
                function duplicateCheck() {  // prevents rare case of case match being pasted in multiple times, which (apart from this function) would create duplicate inputs
                    return ((siblingNode.classList.contains('js_unfolded')) || (new RegExp('(^| )' + 'js_unfolded' + '( |$)', 'gi').test(siblingNode.className)));  // return boolean for classList / className
                }
                function deleteInputs() {  // prevents multiple (incorrect) inputs
                    var toDelete = [];
                    for (var i = 0; i < formBlock.children.length; i += 1) {  // loop through, because sometimes multiple nodes are created (as in 'transition')
                        if ((formBlock.children[i].classList.contains('js_unfolded')) || (new RegExp('(^| )' + 'js_unfolded' + '( |$)', 'gi').test(formBlock.children[i].children[0].className))) {  // test for class in > IE9
                            toDelete.push(i);
                        }
                    }
                    toDelete = toDelete.reverse();  // reverse the array, so array order doesn't shift when node is deleted (last position will be deleted first)
                    for (var ii = 0; ii < toDelete.length; ii += 1) {  // loop through and delete the unwanted nodes
                        formBlock.children[toDelete[ii]].remove();
                    }
                    return false;
                }
                switch (val) {  // creates and inserts inputs based on previous selection
                    case 'access point':
                        duplicate = duplicateCheck();
                        if (!duplicate) {
                            newNode.innerHTML = `type<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="typeComp${siblingIDStripped}" name="typeComp${siblingIDStripped}" list="accessCompDL" type="text" placeholder="&darr; choose a type"></span>`;
                            formBlock.insertBefore(newNode, siblingNode);
                            return cycle();
                        } else {
                            e.target.value = '';
                            return deleteInputs();
                        }
                        break;
                    case 'end point':
                        duplicate = duplicateCheck();
                        if (!duplicate) {
                            newNode.innerHTML = `type<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="typeComp${siblingIDStripped}" name="typeComp${siblingIDStripped}" list="endCompDL" type="text" placeholder="&darr; choose a type"></span>`;
                            formBlock.insertBefore(newNode, siblingNode);
                            return cycle();
                        } else {
                            e.target.value = '';
                            return deleteInputs();
                        }
                        break;
                    case 'tie in':
                        duplicate = duplicateCheck();
                        if (!duplicate) {
                            newNode.innerHTML = `direction<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="directionComp${siblingIDStripped}" name="directionComp${siblingIDStripped}" list="tieCompDL" type="text" placeholder="&darr; choose a direction"></span>`;
                            formBlock.insertBefore(newNode, siblingNode);
                            return cycle();
                        } else {
                            e.target.value = '';
                            return deleteInputs();
                        }
                        break;
                    case 'transition':
                        duplicate = duplicateCheck();
                        if (!duplicate) {
                            var newNodeA = document.createElement('span');
                            var newNodeB = document.createElement('span');
                            newNodeA.className = 'js_unfolded formBlock__inline fadeIn';
                            newNodeB.className = 'js_unfolded formBlock__inline fadeIn';
                            newNodeA.innerHTML = `from<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="fromComp${siblingIDStripped}" name="fromComp${siblingIDStripped}" list="matCompDL" type="text" placeholder="&darr; from"></span>`;
                            newNodeB.innerHTML = `to<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="toComp${siblingIDStripped}" name="toComp${siblingIDStripped}" list="matCompDL" type="text" placeholder="&darr; to"></span>`;
                            formBlock.insertBefore(newNodeA, siblingNode);
                            formBlock.insertBefore(newNodeB, siblingNode);
                            return cycle();
                        } else {
                            e.target.value = '';
                            return deleteInputs();
                        }
                        break;
                    default:  // default is to remove the element if it was created by the unfold process (has className 'js_unfolded')
                        return deleteInputs();
                }
            }
            function generateDescription(e) {
                var parentBlock = e.target.parentNode.parentNode;
                var inputs = parentBlock.querySelectorAll('input');
                var target = parentBlock.querySelector('textarea');
                var description = '';
                var tail = '';
                var values = [];
                function encodeAsHTML(text) {  // function to cause text with HTML entities to be encoded as HTML, then returned; useful for entities in pipeLib descriptions
                    var element = document.createElement('p');
                    element.innerHTML = text;
                    return element.innerHTML;
                }
                for (var i = 0; i < inputs.length; i += 1) {  // set the input values to an array, which allows undefined
                    values[i] = inputs[i].value;
                }
                if (values[1] !== 'transition') {
                    if (typeof pipeLibrary.composition[values[1]] === 'undefined' || typeof pipeLibrary.composition[values[1]][values[2]] === 'undefined' ) {  // if description is not undefined (as it would be for a custom value)
                        return false;
                    } else {
                        description = pipeLibrary.composition[values[1]][values[2]];  // look up the description text
                        target.value = encodeAsHTML(description);  // set the description as HTML and value
                    }
                } else if (values[1] === 'transition') {
                    if (typeof pipeLibrary.composition[values[1]] === 'undefined' || typeof pipeLibrary.composition[values[1]].from[values[2]] === 'undefined' || typeof pipeLibrary.composition[values[1]].to[values[3]] === 'undefined') {   // if description is not undefined (as it would be for a custom value)
                        return false;
                    } else {
                        description = pipeLibrary.composition.transition.from[values[2]];   // look up the description text
                        target.value = encodeAsHTML(description);  // set the description as HTML and value
                        tail = pipeLibrary.composition.transition.to[values[3]];  // look up the second description text
                        target.value += encodeAsHTML(tail);  // set the description as HTML and value
                    }
                }
                return cycle();
            }
            function check(e) {
                if (inputHits < 1) {
                    clone(e);
                    return inputHits += 1;
                } else {
                    return false;
                }
            }
            function cycle() {
                node = document.querySelectorAll('.js_compositionClone');
                descriptionTrigger = parent.querySelectorAll('.js_description');
                for (var i = 0; i < node.length; i += 1) {
                    node[i].removeEventListener('input', check);
                    node[i].children[1].children[0].removeEventListener('focus', resetInputHits);
                }
                node[node.length - 1].addEventListener('input', check);
                node[node.length - 1].children[1].children[0].addEventListener('focus', resetInputHits);
                node[node.length - 1].children[1].children[0].addEventListener('input', unfold);  // never removed, because this field may change and should always update
                if (typeof descriptionTrigger[0] === 'undefined') {
                    return false;
                } else {
                    for (var ii = 0; ii < descriptionTrigger.length; ii += 1) {
                        descriptionTrigger[ii].addEventListener('input', generateDescription);  // dynamically added due to changing structure; never removed, because this field may change and should always update
                    }
                }
                return false;
            }
            if (node.length !== 0) {
                return cycle();
            } else {
                return false;
            }
        })();
        (function reportAbnormalities() {
            var parent = document.querySelector('.js_abnormalitiesParentNode');  // grab the parent
            var node = document.querySelectorAll('.js_abnormalitiesClone');  // grab the existing node
            if (parent) {  // so wrapped to prevent type error
                var descriptionTrigger = parent.querySelectorAll('.js_description');
            }
            var inputHits = 0;  // sets the number of input hits
            function resetInputHits() {
                return inputHits = 0;
            }
            function clone(e) {  // creates the new node and adds the inner HTML; appends; calls 'cycle'
                var baseIDFull = e.target.parentNode.children[0].id;  // pull the id from the first node in the form block
                var baseIDStripped = baseIDFull.replace(/\D+/g, '');  // strip the words
                var nextNameID = Number(baseIDStripped) + 1;  // iterate the number for use in assigning to clone
                var newClone = node[node.length - 1].cloneNode(false);
                newClone.className = 'report_formBlock js_abnormalitiesClone fadeIn';
                newClone.innerHTML =
                    (`<span class="formBlock__inline">distance<input size="15" class="js_inputWidth js_generateNew formBlock_input input__inline" id="distanceAbnorm${nextNameID}" name="distanceAbnorm${nextNameID}" type="text" placeholder="at x / from x to x"></span>
<span class="formBlock__inline">event<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="eventAbnorm${nextNameID}" name="eventAbnorm${nextNameID}" list="eventAbnormDL" type="text" placeholder="&darr; choose an event"></span>
<span class="formBlock__inline">grade<input size="15" class="js_description js_inputWidth formBlock_input input__inline" id="gradeAbnorm${nextNameID}" name="gradeAbnorm${nextNameID}" list="gradeAbnormDL"" type="text" placeholder="&darr; choose a grade"></span>
<label class="formBlock_label">description<textarea class="js_inputHeight formBlock_textarea" id="descriptionAbnorm${nextNameID}" name="descriptionAbnorm${nextNameID}" placeholder="description"></textarea></label>`);
                parent.appendChild(newClone);
                return cycle();
            }
            function generateDescription(e) {
                var parentBlock = e.target.parentNode.parentNode;
                var inputs = parentBlock.querySelectorAll('input');
                var target = parentBlock.querySelector('textarea');
                var description = '';
                var values = [];
                function encodeAsHTML(text) {  // function to cause text with HTML entities to be encoded as HTML, then returned; useful for entities in pipeLib descriptions
                    var element = document.createElement('p');
                    element.innerHTML = text;
                    return element.innerHTML;
                }
                for (var i = 0; i < inputs.length; i += 1) {  // set the input values to an array, which allows undefined
                    values[i] = inputs[i].value;
                }
                if (typeof pipeLibrary.abnormality[values[1]] === 'undefined' || typeof pipeLibrary.abnormality[values[1]][values[2]] === 'undefined') {  // prevent undefined object references
                    return false;
                } else {
                    description = pipeLibrary.abnormality[values[1]][values[2]].description;  // look up the description text
                    target.value = encodeAsHTML(description);  // set the description as HTML and value
                }
                return cycle();
            }
            function check(e) {
                if (inputHits < 1) {
                    clone(e);
                    return inputHits += 1;
                } else {
                    return false;
                }
            }
            function cycle() {  //
                node = document.querySelectorAll('.js_abnormalitiesClone');
                descriptionTrigger = parent.querySelectorAll('.js_description');
                for (var i = 0; i < node.length; i += 1) {
                    node[i].removeEventListener('input', check);
                    node[i].children[1].children[0].removeEventListener('focus', resetInputHits);
                }
                node[node.length - 1].addEventListener('input', check);
                node[node.length - 1].children[1].children[0].addEventListener('focus', resetInputHits);
                descriptionTrigger[descriptionTrigger.length -2].addEventListener('input', generateDescription);  // manually added (as opposed to through for loop) due to predictable structure; never removed, because this field may change and should always update
                descriptionTrigger[descriptionTrigger.length -1].addEventListener('input', generateDescription);  // manually added (as opposed to through for loop) due to predictable structure; never removed, because this field may change and should always update
                return false;
            }
            if (node.length !== 0) {
                return cycle();
            } else {
                return false;
            }
        })();

        //(function summaryWriter() {  // todo: add dynamically generated summary (composition, abnormalities, and recommendations)
        //    var container = document.querySelector('.section__summary');
        //    var composition = document.querySelector('.js_summary__composition');
        //    var abnormalities = document.querySelector('.js_summary__abnormalities');
        //    var recommendations = document.querySelector('.js_summary__recommendations');
        //    function reportLookup(reference) {
        //        if (reference) {
        //            return reference;
        //        } else {
        //            return false;
        //        }
        //    }
        //    function getKeyByValue(object, value) {
        //        console.log(object, value);
        //        var length = Object.keys(object).length;
        //        for (var i = 0; i < length; i += 1) {
        //            for (var property in object[i]) {
        //                if (object[i][property] === value) {
        //                    console.log(object[i]);
        //                    //console.log(object[i][property]);
        //                }
        //            }
        //        }
        //    }
        //    function writeComposition() {
        //        var keys = Object.keys(report.composition);
        //        getKeyByValue(report.composition, 'access point');
        //        //var accessPoint = reportLookup()
        //        composition.innerHTML = `I accessed the side sewer line through {accessPoint}. Your side sewer line is made up of {materialArray}.`;
        //    }
        //    function writeAbnormalities() {
        //        abnormalities.innerHTML = ``;
        //    }
        //    function writeRecommendations() {
        //        recommendations.innerHTML = ``;
        //    }
        //    writeComposition();
        //
        //    //console.log(reportLookup(report.company.name));
        //    //setTimeout(summaryWriter, 1000);
        //
        //})();
    })();

    var buildReportPageController = function (doc) {
        if (doc) {
            buildPage(doc);
            generateSharingInputs(doc.sharing);  // put one on the page initially
        } else {
            generateSharingInputs();
        }



    };

    if (createReport) {  // element test to ensure I'm on the right page; initial call stack
        try {
            connectionHandler();  // set initially & listen for changes
            setDefaultSelectMonth(); // set initially
            displayReportRange();  // populate initially
            deleteButtonStatus();  // set plurality & disabled state of delete button
            createButtonListeners();  // listen initially
            deleteButtonListeners();  // listen initially
            selectListeners();  // listen for changes
        } catch (err) {
            logErrorInDB(err);
            console.log(err);
        }
    }

    if (shareButton) {  // only run the build if the share button exists (the report generator page)
        if (!shareButton.dataset.id) {  // set the report's id if it isn't set
            shareButton.dataset.id = new Date().toISOString();
        }

        try {
            connectionHandler();
            getIfEdit();

            shareButton.addEventListener('click', sharingController);
            
            saveButton.addEventListener('click', function () {
                saveReport(shareButton.dataset.id);
            });
            
        } catch (err) {
            logErrorInDB(err);
            console.log(err);
        }

        
        //setTimeout(saveReport, 1000);  // save every second, until I figure out which events should trigger this  todo: determine which events trigger build / save
    }

};

/* *
 * Pipe Inspection Story
 *
 *
 * From <25 feet to 47 feet> OR At <25 feet> along the line I found <moderate to severe> OR <severe> <root intrusion>. The <roots cause greater than 50% reduction in the pipe’s capacity>, so I recommend <having the line cleaned out (snaking or jetting), then having the roots treated with a foaming herbicide like RootX>.
 * OR
 * At <25 feet> along the line <? and <12 feet> deep ?>I found <slight> <root intrusion>.
 * The entire line was <not inspected>. <I was stopped by roots at 47 feet> OR <I reached the max run of the camera line> OR <I reached the city main line>. <I recommend a re-inspection once the abnormality is repaired>.
 * */


ready(readyWrap);

//# sourceMappingURL=sewerLine.js.map
