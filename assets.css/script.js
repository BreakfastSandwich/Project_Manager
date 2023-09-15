let projectDisplayEl = $('projectDisplay')
let projectNameEl = $('#projectNameModal')
let projectTypeEl = $('#projectTypeModal')
let projectDateEl = $('#dueDateModal')
let captureBTN = $('#save')
let modalStartBTN = $('#modalStart');




// Setting date/ time current

function currentTime(){
    let now = dayjs().format('MMM DD,YYYY [at] HH:mm:ss' );
    $('#Date').text(now)
    };
    
    // calling date time and setting it to run every 0.5s for a smooth clock function
    currentTime ()
    setInterval(currentTime, 500)



modalStartBTN.on('click', function modal(){
    console.log("frustration")
// let capture = $('#save')
// capture.on('click', submit())
});


captureBTN.on('click', function (){
    console.log(projectNameEl.val().trim())
    console.log(projectTypeEl.val())
    console.log(projectDateEl.val())
    console.log("Burrito")    
});


// confirming the current project list by reading local storage
    // local storage must first be checked for the data set so it can determine the array position of the new data 
    // for instance you need to know where the garden tools go before you can store them, otherwise you may find a shovel in your sock drawer
function readProjectList() {   
var projects = localStorage.getItem('projects');
if (projects) {
    projects = JSON.parse(projects);
} else {
    projects = [];
}return projects ;
}


// creating the "save" function for the project list
    // JSON.stringify turns objects into a single item for later storage in an array "compression"
function saveProjectList(projects) {
    localStorage.setItem('projects', JSON.stringify(projects))
};


// prints the data from storage to the screen
   
function printProjectsData() {

    // clears current project list
    projectDisplayEl.empty();

    // retreives project list from storage to ensure list is up to date
    var projects = readProjectList(); 
    // var projectdate = projectDateEl.val()
    // var projectname = projectNameEl.val().trim();
    // var projecttype = projectTypeEl.val()
    

    // loop through each project and create a new row
    for (var i = 0; i < projects.length; i++); {
    var project = projects[i];
    var projectDate = dayjs(project.date);  
    // get date/time for start of today
    var today = dayjs().startOf('day')

    // create a row and column for project
    var rowEl = $('<tr>');
    var nameEl = $('<td>').text(project.name);
    var typeEl = $('<td>').text(project.type);
    var dateEl = $('<td>').text(projectDate.format('MM/DD/YYY'));

    // save the index of a ptoject as a data attribute on the button. this
    // will be used when removing the project from the array.
    var deleteEl = $('<td><button class+"btn btn-sm btn-delete-project" data-index+"' + i +'">x</button></td>')

    // add class to row by comparing project date to today's date
    if(projectDate.isbefore(today)) {
        rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
        rowEl.addclass('project-today');
    }

    rowEl.append(nameEl, typeEl, dateEl, deleteEl);
    projectDisplayEl.append(rowEl);
 }
}

// removes a project from list and local storage
function handleDeleteProject() {
    var projectIndex = parseInt($(this).attr('data-index'));
    var projects = readProjectList();
// remove from the array
    projects.splice(projectIndex, 1);
    saveProjectList(projects);
// print updated project list 
    printProjectsData();
}

function projectFormSubmit (event) {
    event.preventDefault();

    // read user input from form
    var projectName = projectNameEl.val().trim();
    var projectType = projectTypeEl.val()
    var projectDate = projectDateEl.val()

    var newProject = {
        name: projectName,
        type: projectType,
        date: projectDate
    };

    // add project to local storage
    var projects = readProjectList();
    projects.push(newProject);
    saveProjectList(projects);

    // print project data
    printProjectsData();

    // clear the form inputs 
    projectNameEl.val('')
    projectTypeEl.val('')
    projectDateEl.val('');
}

captureBTN.on('click', projectFormSubmit);

// JQuery event delegation to listen for clicks of project dynamic delete button
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

printProjectsData
















