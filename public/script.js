console.log("Client side JS running");
async function makeURL(){
  console.log("Making URL...");
  let input = document.getElementById('enterField').value;
  if(input != ""){
    if(input.includes("http://")){
      console.log("Complete url");
      input = input.substring('http://'.length);
      console.log("New value: " + input);
    }
    else if(input.includes("https://")){
      console.log("Complete url");
      input = input.substring('http://'.length);
      console.log("New value: " + input);
    }
    let base64_input = btoa(input);
     console.log("Proceeding with " + input + ", " + base64_input); 
     const data = {base64_input};
     const options = {
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
         "Content-type": "application-json"
       }
     };
     const response = await fetch('/setCode/' + base64_input, options);
     const info = await response.json();
     console.log(info);
    let code = await info.code;
    console.log(code);
    document.getElementById('inputArea').style = "display: none";
    document.getElementById('outputArea').style = "display: visible";
    document.getElementById('outputArea').innerHTML = "<p>Your new url is <a href='http://better-url.glitch.me/" + code + "'>better-url.glitch.me/" + code + "</a></p>";
  }
  else{
    console.log("Please Enter a URL!");
  }
}