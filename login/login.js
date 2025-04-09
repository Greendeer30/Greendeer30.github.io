
  
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
        const userCred = await auth.createUserWithEmailAndPassword(email, password);
  
        localStorage.setItem("userName", username);

        await db.collection("users").doc(userCred.user.uid).set({
            username,
            uid: userCred.user.uid,
          });
  
        message.textContent = "Account created successfully!";
      } else {
        await auth.signInWithEmailAndPassword(email, password);
        message.textContent = "Logged in successfully!";
        sessionStorage.setItem("userName", userCred.user.uid);
      }
    } catch (err) {
      console.error(err);
      message.textContent = err.message;
    }
  });
  
  