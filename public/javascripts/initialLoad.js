var firstTime = localStorage.getItem("first_time");

if (!firstTime) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
   
    localStorage.setItem("first_time", "1");
}


