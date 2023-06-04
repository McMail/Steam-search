document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const tableBody = document.getElementById("table-body");
  let gamesData = [];
  let timer;

  // Fetch games data from the Steam API
  fetch("https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamApps/GetAppList/v0002/")
    .then((response) => response.json())
    .then((data) => {
      gamesData = data.applist.apps;
      displayGamesData(gamesData);
    })
    .catch((error) => {
      console.error(error);
    });

  // Handle search button click event
  searchBtn.addEventListener('click', function() {
    const appId = searchInput.value.trim();
    const app = gamesData.find(function(item) {
      return item.appid == appId;
    });
    if (app) {
      const row = tableBody.insertRow(-1);
      const nameCell = row.insertCell(0);
      const appidCell = row.insertCell(1);
      const linkCell = row.insertCell(2);
      nameCell.innerHTML = app.name;
      appidCell.innerHTML = app.appid;
      linkCell.innerHTML = `<a href='https://store.steampowered.com/app/${app.appid}' target='_blank'>View on Steam</a>`;
    } else {
      alert(`No app found with ID ${appId}`);
    }
  });

  // Handle search input event with debounce
  searchBtn.addEventListener('click', function() {
  searchInput.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      const searchValue = searchInput.value.trim().toLowerCase();
      const filteredData = gamesData.filter(function(item) {
        return item.name.toLowerCase().includes(searchValue);
      });
      displayGamesData(filteredData);
    }, 500);
  })
});

  // Display games data in the table
  function displayGamesData(games) {
    var tableBody = document.querySelector("#appTable tbody");
    
    if (!tableBody) {
      console.log("Table body not found.");
      return;
    }
    
    tableBody.innerHTML = "";
  
    games.forEach(function(game) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + game.appid + "</td><td>" + game.name + "</td>";
      tableBody.appendChild(row);
    });
  }
  
  // redirect to steam
  function redirectToSteam() {
    let searchInput = document.getElementById("searchInput").value;
    let steamUrl = "https://store.steampowered.com/search/?term=" + encodeURIComponent(searchInput);
    window.location.href = steamUrl;
  }
  
  // Search for a game by app ID
  function searchGameById(id) {
    const game = gamesData.find((game) => game.appid === id);
    if (game) {
      const tableHtml = `
        <tr>
          <td>${game.appid}</td>
          <td>${game.name}</td>
        </tr>
      `;
      tableBody.innerHTML = tableHtml;
    } else {
      tableBody.innerHTML = "<tr><td colspan='2'>No game found</td></tr>";
    }
  }
});
