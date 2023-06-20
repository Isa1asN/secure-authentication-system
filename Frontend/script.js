/* --------------- Login & Register Button Function --------------------- */
var log = document.getElementById("login");
var reg = document.getElementById("register");
var btn = document.getElementById("btn");
var box = document.querySelector(".form_box");

function register(){
    log.style.left = "-40rem";
    reg.style.left = "5rem";
    btn.style.left = "11rem";
    box.style.height = "90rem";   
}

function login(){
    log.style.left = "5rem";
    reg.style.left = "45rem";
    btn.style.left = "0";
    box.style.height = "55rem";     
}
/* --------------- End Login & Register Button Function --------------------- */

/* --------------- Button Ripples Effect --------------------- */
const submitBtns = document.querySelectorAll('.submit_btn');
    submitBtns.forEach(submitBtn => {
    submitBtn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;

            let ripples = document.createElement('span');
            ripples.style.top = y + 'px';
            ripples.style.left = x + 'px';
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove()
            },1000);
        })
    })


//Submit
let regiterBtn = document.getElementById("submit_btn");

let Valpopup = document.getElementById("Valpopup");
let errorpopup = document.getElementById("errorpopup");

function showvalPopup(){
  Valpopup.classList.add("open_popup");
};
function showerrorPopup(){
  errorpopup.classList.add("open_popup");
};
function closevalPopup(){
  Valpopup.classList.remove("open_popup");
  window.location.reload();
};
function closeerrorPopup(){
  errorpopup.classList.remove("open_popup");
};

/* --------------- End Success & Error Popup --------------------- */  


// todo ###################################################################
// Login Form Submit
document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form input values
  var userName = document.getElementById("userName").value;
  var password = document.getElementById("password").value;

  // Create an object with the form data
  var data = {
      username: userName,
      password: password
  };

  // Send a POST request to the server
  fetch("/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(function(response) {
      if (response.ok) {
          // Handle successful login
          // Redirect or display success message
      } else {
          // Handle failed login
          // Display error message
      }
  })
  .catch(function(error) {
      // Handle network errors
      console.log("Error:", error);
  });
});

// Register Form Submit
document.getElementById("register").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form input values
  var firstName = document.getElementById("first_name_input").value;
  var lastName = document.getElementById("last_name_input").value;
  var userName = document.getElementById("user_name_input").value;
  var email = document.getElementById("email_input").value;
  var password = document.getElementById("password_input").value;

  // Create an object with the form data
  var data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password
  };

  // Send a POST request to the server
  fetch("/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(function(response) {
      if (response.ok) {
          // Handle successful registration
          // Redirect or display success message
      } else {
          // Handle failed registration
          // Display error message
      }
  })
  .catch(function(error) {
      // Handle network errors
      console.log("Error:", error);
  });
});
