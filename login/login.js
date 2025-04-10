
  
  let isSignup = false;
  
  const form = document.getElementById("auth-form");
  const toggle = document.getElementById("toggle");
  const title = document.getElementById("form-title");
  const submitBtn = document.getElementById("submit-btn");
  const message = document.getElementById("message");
  
  toggle.addEventListener("click", () => {
    isSignup = !isSignup;
    title.textContent = isSignup ? "Sign Up" : "Login";
    submitBtn.textContent = isSignup ? "Sign Up" : "Login";
    toggle.innerHTML = isSignup
      ? 'Already have an account? <a href="#">Login</a>'
      : `Don't have an account? <a href="#">Sign up</a>`;
  });
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
  
    message.textContent = "";
  
    try {
      if (isSignup) {
        await auth.createUserWithEmailAndPassword(email, password).then(userCred => {
          db.collection("users").add({
            username: username,
            email: email,
            uid: userCred.user.uid,
          });
          console.log("account created");
          message.textContent = "Account created successfully!";
          insertUsername(auth.currentUser.uid);
        });
      } else {
        await auth.signInWithEmailAndPassword(email, password);
        message.textContent = "Logged in successfully!";
        insertUsername(auth.currentUser.uid);
        window.location.href = '../index.html';
      }
    } catch (err) {
      console.error(err);
      message.textContent = err.message;
    }
  });
  
  