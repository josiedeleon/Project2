// Load data from combined_height_avg.csv
d3.csv("./data/combined_height_avg.csv").then(function(hData) {

    console.log(hData);
  
    // log a list of years
    var years = hData.map(data => data.Year);
    console.log("Years", years);
  
    // Cast each heights value in hData as a number using the unary + operator
    hData.forEach(function(data) {
      data.Male_Height = +data.Male_Height;
      console.log("Year:", data.Year);
      console.log("Height:", data.Male_Height);
    });
  }).catch(function(error) {
    console.log(error);
  });