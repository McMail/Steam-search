 document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById("table-body");
  const searchInputplayer = document.getElementById("search-input-player");
  const searchBtnplayer = document.getElementById("search-btn-player");
  let gamesData = [];

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


  if (searchBtnplayer) {
    searchBtnplayer.addEventListener('click', function() {
      const url = fetch("https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamApps/GetAppList/v0002/")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          const appList = data.applist.apps;
          const app = appList.find(function(item) {
            return item.appid == appId;
          });
          if (app) {
            const resultTable = document.getElementById('resultTable');
            const row = resultTable.insertRow(-1);
            const nameCell = row.insertCell(0);
            const appidCell = row.insertCell(1);
            const linkCell = row.insertCell(2);
            nameCell.innerHTML = app.name;
            appidCell.innerHTML = app.appid;
            linkCell.innerHTML = `<a href='https://store.steampowered.com/app/${app.appid}' target='_blank'>View on Steam</a>`;
          } else {
            alert(`No app found with ID ${appId}`);
          }
        })
        .catch(function(error) {
          alert(`Error: ${error}`);
        });
    });
  }

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
  

function redirectToSteam() {
  let searchInputplayer = document.getElementById("searchInputplayer").value;
  let steamUrl = "https://steamcommunity.com/search/users/#text" + encodeURIComponent(searchInputplayer);
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
})

  // Handle search button click event
  // searchBtn.addEventListener("click", () => {
  //   const id = searchInput.value.trim();
  //   if (id) {
  //     searchGameById(id)