//you can getch URL
// var getUserRepos = function () {
//   console.log("function was called");
//you can attach a variable to response for the fetch
//   var response = fetch("https://api.github.com/users/octocat/repos").then(
//     function (response) {
//       console.log("inside", response);

//     }
//   );
//   console.log(response);
// };
// getUserRepos();

// var getUserRepos = function () {
//   fetch("https://api.github.com/users/octocat/repos").then(function (response) {
//     response.json().then(function (data) {
//       console.log(data);
//       console.log(data.length);
//   for (let i = 0; i < data.length; i++) {
//     var id = data[i].name;
//     console.log(id);
//   }
//   console.log(data[5].name);

//       console.log("DATA IS UPLOADED");
//     });
//   });
// };
// getUserRepos();
// getUserRepos("octocat"); // https://api.github.com/users/octocat/repos

//6.2.4 variables at top that is needed to select elements
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repos-search-term");

// 6.5.6 creating a variable for the language buttons
var languageButtonsEl = document.querySelector("#language-buttons");

//6.2.4 FormHandler

var formSubmitHandler = function (event) {
  event.preventDefault();
  // console.log(event);
  //get value from input element
  var username = nameInputEl.value.trim();

  //if someone typeed something, run get user repo, using the username they entered then reset space
  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a Github username");
  }
};

//6.2.3 how to fetch and display some data
var getUserRepos = function (user) {
  //format the github API url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  //   console.log(apiUrl);

  //make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // 6.2.6 Error Handling

      //if request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data, user);
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      //notice this '.catch()' getting chained onto the end of the ".then() method"
      alert("Unable to connect to Github");
    });
};
// getUserRepos("octocat");
//6.2.5 function to display REPOS
var displayRepos = function (repos, searchTerm) {
  //check if api returned any repos [empty or naw?]
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  //clearing old content BEFORE displaying new content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  repoSearchTerm.setAttribute("style", "color:goldenrod");

  //loop over repos (loop over piece of data from API)
  for (let i = 0; i < repos.length; i++) {
    //format repo name

    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container/link for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    //create a span element to hold repository name

    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    console.log(repos[i].open_issues_count);

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        "issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to container
    repoEl.appendChild(titleEl);
    //append to container
    repoEl.appendChild(statusEl);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
//6.5.5
var getFeaturedRepos = function (language) {
  var apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.items);
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: Github User Not Found!");
    }
  });
};
var buttonClickHandler = function (event) {
  console.log(event);
  //valid data we want to target (from data-language!)
  var language = event.target.getAttribute("data-language");
  console.log(language);
  //if there's a language property ===true
  if (language) {
    //get the featured repo!
    getFeaturedRepos(language);
    //this will come first because getFeaturedRepo's is asynchronous.
    //basically, first clear, then bring me new data from the new click! (of the 3 buttons for languages!)
    repoContainerEl.textContent = "";
  }
};
// console.log(repos, searchTerm);
// console.log("from display");

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
