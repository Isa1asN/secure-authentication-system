/* --------------- Login & Register Button Function --------------------- */
var log = document.getElementById("login");
var reg = document.getElementById("register");
var btn = document.getElementById("btn");
var box = document.querySelector(".form_box");
var loginToggleBtn = document.getElementById("login_toggle_btn");

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
function togglePasswordVisibility() {
        var passwordInput = document.getElementById("password_input");
        var showBtn = document.getElementById("showbtn");
    
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showBtn.classList.remove("fa-eye");
            showBtn.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            showBtn.classList.remove("fa-eye-slash");
            showBtn.classList.add("fa-eye");
        }
    }
function toggleLoginPasswordVisibility() {
        var loginPasswordInput = document.getElementById("login_password_input");
        var loginShowBtn = document.getElementById("login_showbtn");
    
        if (loginPasswordInput.type === "password") {
            loginPasswordInput.type = "text";
            loginShowBtn.classList.remove("fa-eye");
            loginShowBtn.classList.add("fa-eye-slash");
        } else {
            loginPasswordInput.type = "password";
            loginShowBtn.classList.remove("fa-eye-slash");
            loginShowBtn.classList.add("fa-eye");
        }
    }
    


// todo ###################################################################


// Login Form Submit
document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission
  // Get the form input values
  var userName = document.getElementById("userName").value;
  var password = document.getElementById("login_password_input").value;

  // Create an object with the form data
  var data = {
      userName: userName,
      password: password
  };

  // Send a POST request to the server
  fetch("http://localhost:3005/auth/sendcode", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(function(response) {
      if (response.ok) {
        console.log("Success:", response);
        
      } else {
        console.log("Error:", response);
      }
  })
  .catch(function(error) {
      console.log("Error:", error);
  });
});

// Register Form Submit
document.getElementById("register").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  var firstName = document.getElementById("first_name_input").value;
  var lastName = document.getElementById("last_name_input").value;
  var userName = document.getElementById("user_name_input").value;
  var email = document.getElementById("email_input").value;
  var password = document.getElementById("password_input").value;

  var data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password
  };

  // Send a POST request to the server
   fetch(`http://localhost:3005/auth/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(function(response) {
      if (response.ok) {
          console.log("Success:", response);
          loginToggleBtn.click();

      } else {
            console.log("Error:", response);
      }
  })
  .catch(function(error) {
      console.log("Error:", error);
  });
});
