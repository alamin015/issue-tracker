document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
let isOkay = true;

  const description = getInputValue('issueDescription');


  const severity = getInputValue('issueSeverity');


  const assignedTo = getInputValue('issueAssignedTo');

  if(!description){
    isOkay = false;
    document.getElementById("issueDescription").classList.add(`error`);
    document.getElementById("issueDescription").focus();
  }else if(!assignedTo){
    isOkay = false;
    document.getElementById("issueDescription").classList.remove("error")
    document.getElementById("issueAssignedTo").classList.add("error")
    document.getElementById("issueAssignedTo").focus();
  }else {
    isOkay = true;
    document.getElementById("issueAssignedTo").classList.remove("error");
    document.getElementById("issueDescription").classList.remove("error")
  }




  if(isOkay){


    const id = Math.floor(Math.random()*100000000) + '';
    const status = 'Open';
  
    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  
    document.getElementById('issueInputForm').reset();
    fetchIssues();
  




  }

  e.preventDefault();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  
  let myStatus = currentIssue.status==="Open" ? "Closed" : "Open";

  currentIssue.status = myStatus;
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));


  const remainingIssues = issues.filter((item) => {
    return item.id !== id;
  })


  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}



const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';


  let len = issues?.length ? issues.length : 0;




  for (var i = 0; i < len; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    let myStatus = status==="Open" ? "Close Status": "Open Status";


    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status}  </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">${myStatus}</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}

