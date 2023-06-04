document.addEventListener('DOMContentLoaded', function() {
// Fetch exchange rates from an API
fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response => response.json())
  .then(data => {
    const exchangeRates = data.rates;

    // Get the table body element
    const tableBody = document.querySelector('#exchange-table tbody');

    // Iterate over the exchange rates and populate the table
    for (const currency in exchangeRates) {
      if (exchangeRates.hasOwnProperty(currency)) {
        const rate = exchangeRates[currency];

        // Create a new row in the table
        const row = document.createElement('tr');

        // Create currency cell
        const currencyCell = document.createElement('td');
        currencyCell.textContent = currency;

        // Create price cell
        const priceCell = document.createElement('td');
        priceCell.textContent = (1 / rate).toFixed(2); // Price of 1 USD in the currency

        // Append cells to the row
        row.appendChild(currencyCell);
        row.appendChild(priceCell);

        // Append the row to the table body
        tableBody.appendChild(row);
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  })

$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('body,html').animate({
      scrollTop: $(hash).offset().top
      }, 1200, function(){
      window.location.hash = hash;
     });
     } 
    });
});

var width = $(window).width(); 

window.onscroll = function(){
if ((width >= 900)){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#middle").css("background-size","150% auto");
    }else{
        $("#middle").css("background-size","100% auto");        
    }
}
};

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},1450)});