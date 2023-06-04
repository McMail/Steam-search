// Steam API Key
const steamApiKey = "7479F75666B66D5E5D1DB8525C3938B6";

// DOM elements
const steamLoginBtn = document.getElementById("steam-login-btn");
const profileContainer = document.getElementById("profile-container");

// Steam authentication URL
const steamAuthUrl = `https://steamcommunity.com/openid/login?` +
  `openid.ns=http://specs.openid.net/auth/2.0&` +
  `openid.mode=checkid_setup&` +
  `openid.return_to=${encodeURIComponent(window.location.href + "verify")}&` +
  `openid.realm=${encodeURIComponent(window.location.href)}`;

// Sign in with Steam button click event handler
steamLoginBtn.addEventListener("click", () => {
  window.location.href = steamAuthUrl;
});

// Function to get URL parameter value
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Check if the page has the authentication response
const openIdParams = getUrlParameter("openid.identity");
if (openIdParams) {
  // Verify authentication response on the server-side using your backend
  // Make a request to your backend server with the authentication response to validate it
  // Retrieve the user's Steam ID from the response and fetch the Steam profile data using the Steam Web API

  // Example implementation
  const steamId = openIdParams.replace("https://steamcommunity.com/openid/id/", "");
  const steamProfileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;

  fetch(steamProfileUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract the profile data from the response
      const profileData = data.response.players[0];

      // Display the Steam profile information
      const profileHtml = `
        <img src="${profileData.avatarfull}" alt="Profile Picture">
        <p>Steam ID: ${profileData.steamid}</p>
        <p>Display Name: ${profileData.personaname}</p>
        <p>Profile URL: <a href="${profileData.profileurl}" target="_blank">${profileData.profileurl}</a></p>
      `;
      profileContainer.innerHTML = profileHtml;
    })
    .catch((error) => {
      console.error(error);
      profileContainer.textContent = "Failed to fetch Steam profile.";
    });
}
