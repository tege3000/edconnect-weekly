const programsUri = "/api/programs/";
const graduationYearsUri = "/api/graduationYears/";
const registerUri = "/api/register/";
const loginUri = "/api/login/";
const projectsUri = "/api/projects/";
const usersUri = "/api/users/";

var body = document.getElementsByTagName("body")[0];

body.onload = () => {
    if(document.cookie) {
        // console.log(document.cookie);
        const uidCookie = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];
        var usersUriOnLogin = usersUri + uidCookie;

        fetch(usersUriOnLogin)
            .then((response) => {        
                return response.json(); 
            })
            .then((data) => {
                // console.log(data);

                let navRight = document.getElementsByClassName("navbar-nav float-right")[0];
                navRight.childNodes[1].style.display = "none";
                navRight.childNodes[3].style.display = "none";

                let l1 = document.createElement("li");
                l1.className = "nav-item";

                let l2 = document.createElement("li");
                l2.className = "nav-item";

                let a1 = document.createElement("a");
                a1.className = "nav-link";
                a1.id = "logout";
                a1.href = "#";
                a1.innerHTML = "Logout";

                let a2 = document.createElement("a");
                a2.className = "nav-link";
                a2.id = "username";
                a2.innerHTML = "Hi, " + data.firstname;

                l1.appendChild(a1);
                l2.appendChild(a2);

                navRight.appendChild(l1);
                navRight.appendChild(l2);

                let logoutBtn = document.getElementById("logout");
                
                logoutBtn.addEventListener("click", () => {
                    document.cookie += "; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;"; 

                    window.location.href = window.location.origin + "/project-explorer/index.html";
                });
            })
            .catch((error) => {
                // handling errors
                console.log(error);
            })

    }    
};
    
fetch(programsUri)
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {
        // console.log(data);

        let programs = document.getElementById("inputProgram");

        for(let i = 0; i < data.length; i++) {
            programs[i].value = data[i];
            programs[i].innerHTML = data[i];
        }

    })
    .catch((error) => {
        // handling errors
        console.log("ERROR:", error);
    });

fetch(graduationYearsUri)
    .then((response) => {        
        return response.json(); 
    })
    .then((data) => {
        // console.log(data);

        let graduationYears = document.getElementById("inputGraduationYear");
        if(data.length != graduationYears.length) {
            graduationYears.length = data.length;
        }

        for(let i = 0; i < data.length; i++) {
            graduationYears[i].value = data[i];
            graduationYears[i].innerHTML = data[i];
    
            graduationYears.append(data[i]);
        
        }

    })
    .catch((error)=> {
        // handling errors
        console.log("ERROR:", error);
    });


var signUpForm = document.getElementById("signupForm");
if(signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger"; 
    
        let firstName = document.getElementById("inputFirstName").value;
        let lastName = document.getElementById("inputLastName").value;
        let email = document.getElementById("inputEmailAddress").value;
        let password = document.getElementById("inputPassword").value;
        let matricNumber = document.getElementById("inputMatricNumber").value;
        let program = document.getElementById("inputProgram").value;
        let graduationYear = document.getElementById("inputGraduationYear").value;
    
        let signUpDetails = { 
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "password": password,
            "matricNumber": matricNumber,
            "program": program,
            "graduationYear": graduationYear 
        };
    
        console.log(signUpDetails);
    
        fetch(registerUri, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(signUpDetails)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if(data.status == "ok") {
                    let key = "uid";
                    let value = data.data.id;
                    document.cookie = `${key}= ${value}; path=/`;
                    window.location.href = window.location.origin + "/project-explorer/index.html";
                }
                else {
                    let n = data.errors.length;
                    for(let i = 0; i < n; i++) {
                        let alertBody = document.createElement("p");
    
                        alertBody.textContent = data.errors[i];
                        alertDiv.appendChild(alertBody);
                        
                    }
                    signUpForm.prepend(alertDiv);
                }
                
            })
            .catch((error) => {
                    // handling errors
                console.log("ERROR:", error);
            });
        
    });
}


var loginForm = document.getElementById("loginForm");
if(loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger"; 
    
        let email = document.getElementById("exampleInputEmail1").value;
        let password = document.getElementById("exampleInputPassword1").value;
    
        let loginDetails = { 
            "email": email,
            "password": password
        };
    
        console.log(loginDetails);
        fetch(loginUri, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(loginDetails)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(data);
    
                if(data.status == "ok") {
                    let key = "uid";
                    let value = data.data.id;
                    document.cookie = `${key}= ${value}; path=/`;
                    window.location.href = window.location.origin + "/project-explorer/index.html";
                }
                else {
                    let alertBody = document.createElement("p");
    
                    alertBody.textContent = "Invalid email/password";
                    alertDiv.appendChild(alertBody);
                    loginForm.prepend(alertDiv);
                }
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    });  
}

var createProjectForm = document.getElementById("createProjectForm");
if(createProjectForm) {
    createProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger"; 

        let projectName = document.getElementById("project-name").value;
        let projectAbstract = document.getElementById("project-abstract").value;

        let authors = document.getElementById("authors").value.split(', ');
        let tags = document.getElementById("tags").value.split(', ');
        
        var createProjectDetails = {
            "name" : projectName,
            "abstract" : projectAbstract,
            "authors" : authors,
            "tags" : tags
        };

        // console.log(createProjectDetails);

        fetch(projectsUri, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(createProjectDetails)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            
                if(data.status == "ok") {
                    window.location.href = window.location.origin + "/project-explorer/index.html";
                }
                else {
                    if(Array.isArray(data.errors)) {
                        let n = data.errors.length;
                        for(let i = 0; i < n; i++) {
                            let alertBody = document.createElement("p");
        
                            alertBody.textContent = data.errors[i];
                            alertDiv.appendChild(alertBody);
                            
                        }
                    }
                    else {
                        let alertBody = document.createElement("p");
        
                        alertBody.textContent = data.errors;
                        alertDiv.appendChild(alertBody);
                    }
                    
                    createProjectForm.prepend(alertDiv);
                }

            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    });
}

var createProjectPage = document.getElementById("createProjectForm");

if(createProjectForm) {
    if(!document.cookie) {
        window.location.href = window.location.origin + "/project-explorer/login.html";
    } 
}

fetch(projectsUri)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        let showcaseDiv = document.getElementsByClassName("showcase")[0];
        // console.log(showcaseDiv);
        showcaseDiv.childNodes[1].style.display = "none";
        showcaseDiv.childNodes[3].style.display = "none";
        showcaseDiv.childNodes[5].style.display = "none";

        let maxProjectsShown = 4;
        for(let i = 0; i < maxProjectsShown; i++) {
            let cardOuterDiv = document.createElement("div");
            cardOuterDiv.className = "col-md-3";

            let cardInnerDiv = document.createElement("div");
            cardInnerDiv.className = "card mb-3 box-shadow";

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";

            let projectHeader = document.createElement("h4");

            let projectHeaderLink = document.createElement("a");
            projectHeaderLink.href = window.location.origin + `/project-explorer/viewProject.html?id=${data[i].id}`;
            projectHeaderLink.textContent = data[i].name;

            projectHeader.appendChild(projectHeaderLink);

            let projectAuthors = document.createElement("small");
            projectAuthors.className = "text-muted";

            for(let j = 0; j < data[i].authors.length; j++) {
                if(j != data[i].authors.length-1) {
                    projectAuthors.textContent += data[i].authors[j] + ", ";
                }
                else {
                    projectAuthors.textContent += data[i].authors[j];
                }
            }

            let projectDescription = document.createElement("p");
            projectDescription.claaName = "card-text";
            projectDescription.textContent = data[i].abstract;

            let tagOuterDiv = document.createElement("div");
            tagOuterDiv.className = "d-flex justify-content-between align-items-center";

            let tageInnerDiv = document.createElement("div");

            for(let j = 0; j < data[i].tags.length; j++) {
                let tagSpan = document.createElement("span");
                tagSpan.className = "text-primary";
                if(j != data[i].tags.length-1) {
                    tagSpan.textContent += data[i].tags[j] + ", ";
                }
                else {
                    tagSpan.textContent += data[i].tags[j];
                }

                tageInnerDiv.appendChild(tagSpan);
            }

            tagOuterDiv.appendChild(tageInnerDiv);

            cardBody.appendChild(projectHeader);
            cardBody.appendChild(projectAuthors);
            cardBody.appendChild(projectDescription);
            cardBody.appendChild(tagOuterDiv);

            cardInnerDiv.appendChild(cardBody);
            cardOuterDiv.appendChild(cardInnerDiv);

            showcaseDiv.appendChild(cardOuterDiv);
        }
        
    })
    .catch((error) => {
        console.log("ERROR", error);
    });



// TODO: FINISH UP STEP 10     
if(window.location.href.includes("?")) {
    const projectId = window.location.href.split('=')[1];
    var viewProjectUri = projectsUri + projectId;

    fetch(viewProjectUri)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let projectName = document.getElementById("project_name");
            let projectAbstract = document.getElementById("project_abstract");
            let projectAuthors = document.getElementById("project_authors");
            let projectTags = document.getElementById("project_tags");

            projectName.textContent = data.name;
            projectAbstract.textContent = data.abstract;

            projectAuthors.childNodes[1].style.display = "none";
            projectAuthors.childNodes[3].style.display = "none";
            for(let i = 0; i < data.authors.length; i++) {
                let author = document.createElement("div");
                author.className = "list-group-item";

                author.textContent = data.authors[i];
                projectAuthors.appendChild(author);
            }

            projectTags.childNodes[1].style.display = "none";
            projectTags.childNodes[3].style.display = "none";
            for(let i = 0; i < data.tags.length; i++) {
                let tag = document.createElement("span");
                tag.className = "text-primary";

                if(i != data.tags.length-1) {
                    tag.textContent = data.tags[i] + ", ";
                }
                else {
                    tag.textContent = data.tags[i];
                }

                projectTags.appendChild(tag);
            }


            // console.log(data);

            fetch(usersUri+data.createdBy)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let projectAuthor = document.getElementById("project_author");
                    projectAuthor.textContent = data.firstname + " " + data.lastname;

                    // console.log(data);
                })
                .catch((error) => {
                    console.log("ERROR", error);
                });
        })
        .catch((error) => {
            console.log("ERROR", error);
        });

    
}