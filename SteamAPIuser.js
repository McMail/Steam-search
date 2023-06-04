// Steam API Key
const steamApiKey = "7479F75666B66D5E5D1DB8525C3938B6";

// DOM elements
const steamLoginBtn = document.getElementById("steam-login-btn");

// Steam authentication handler
steamLoginBtn.addEventListener("click", () => {
  // Redirect the user to the Steam login page
  SteamOpenID.login(steamApiKey, window.location.href + "verify");
});

// Function to handle the authentication response
function verifyCallback(response) {
  if (response.status === "success") {
    // Authentication successful, retrieve user information
    const steamId = response.steamid;
    const steamProfileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;

    fetch(steamProfileUrl)
      .then((response) => response.json())
      .then((data) => {
        // Extract the profile data from the response
        const profileData = data.response.players[0];

        // Display the Steam profile information
        console.log("Steam ID:", profileData.steamid);
        console.log("Display Name:", profileData.personaname);
        console.log("Profile URL:", profileData.profileurl);
      })
      .catch((error) => {
        console.error(error);
        console.log("Failed to fetch Steam profile.");
      });
  } else {
    // Authentication failed or cancelled by the user
    console.log("Steam authentication failed.");
  }
}
