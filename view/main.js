const LoginLinks = document.querySelectorAll('.login')
const LogoutLinks = document.querySelectorAll('.logout')
const accountDetails = document.querySelector('.acount-details')
// state change
auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('tweet').onSnapshot(doc => {
        render(doc.docs)
       
        if (user) {
            // account info
            db.collection('user').doc(user.uid).get().then(doc => {
                const html = `
                  <span class="card-title"> ${doc.data().username}</span>
                  <span>Logged in as ${user.email}</span>
                  <p>${doc.data().bio}</p>
                `;
               
                
                accountDetails.innerHTML = html;
              });
            // toggle user UI elements
            LoginLinks.forEach(item => item.style.display = 'block');
            LogoutLinks.forEach(item => item.style.display = 'none');
          } 
      }, err => console.log(err.message));
    } else {
        accountDetails.innerHTML = 'please Login or Signup';
        // toggle user elements
        LoginLinks.forEach(item => item.style.display = 'none');
        LogoutLinks.forEach(item => item.style.display = 'block');
      render([]);
    }
  });

  



// SignUp

const SignUp = document.querySelector('#signup-form')
SignUp.addEventListener("submit", (e)=>{
    e.preventDefault()
    const email = SignUp.email.value
    const password = SignUp.password.value
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        return db.collection('user').doc(cred.user.uid).set({
            username: SignUp.Username.value,
            bio: SignUp.bio.value
          });
       
    }).then(()=>{
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close();
        SignUp.reset();
    })
})



//login form

const Login = document.querySelector('#login-form')
Login.addEventListener("submit", (e)=>{
    e.preventDefault()
    const email = Login.email.value
    const password = Login.password.value
    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user)
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close();
        Login.reset();
    }).catch(err=>{
        console.error(err.message)
    })
})
//Logout
const Logout = document.querySelector('#logout');
Logout.addEventListener('click',(e)=>{
    e.preventDefault()
    auth.signOut();
})


//create tweet
const tweet = document.querySelector('#post_form')
tweet.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('tweet').add({
        name: tweet.name.value,
        userTweet: tweet.field.value
    }).then(()=>{
        const modal = document.querySelector('#modal-post')
        M.Modal.getInstance(modal).close();
        tweet.reset();
    })
})



//render functions


const render = (data)=>{
    const tweetList= document.querySelector('#list')
        if (data.length) {
          let html = '';
          data.forEach(doc => {
            
            const guide = doc.data();
            
            const li = `
              <div class="card  white">
              
                  <div class="card-content orange-text"  id="usersname">
                  
                  <span class="card-title" >${guide.name}</span>    
                  <p> ${guide.userTweet} </p>
                  </div>
              </div>
            `;
            html += li;
          
          
          })
      
          tweetList.innerHTML = html
        }else{
            tweetList.innerHTML="please login or signup"
        }
      
        

   
}

