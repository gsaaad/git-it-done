//create a variable for container
var issuesContainerEl = document.querySelector("#issues-container");

//created a function to display the issues of the repos!
var displayIssues = function (issues) {
  console.log(issues + " these are the issues!");
  console.log(issues.length);
  if (issues.length === 0) {
    issuesContainerEl.textContent = "This repo has no open issues!";
    issuesContainerEl.classList = "app-title";
    return;
  }
  //createa  for loop that iterates through each issue!
  for (let i = 0; i < issues.length; i++) {
    //   if there are no open issues

    // console.log(issues[i]);

    //createa  a link element to take users to the issue on github!

    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type element

    var typeEl = document.createElement("span");

    //check if issue is an actualy issue or a pull request

    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    //append to container
    issueEl.appendChild(typeEl);

    //append to main container to display on HTML
    issuesContainerEl.appendChild(issueEl);
  }
};

var getRepoIssues = function (repo) {
  console.log(repo);
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    //request was successful
    if (response.ok) {
      response.json().then(function (data) {
        //pass response data to dom function!
        // console.log(data);
        displayIssues(data);
      });
      //if request was not successful (failed!)
    } else {
      alert("There was a problem with your request!");
    }
  });
};
getRepoIssues("gsaaad/gsaaad");
