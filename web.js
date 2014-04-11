var express = require("express");
var app = express();


var mozFests = [{
    date: new Date("2013-10-25"),
    contributors: 958 // Volunteers: 144 + Speakers: 249 + Participants: 565
  }
];

app.get('/', function(req, res) {

  // Check date
  var date;
  if (req.query.date) {
    date = new Date(req.query.date);
    if ( Object.prototype.toString.call(date) === "[object Date]" ) {
      if ( isNaN( date.getTime() ) ) {
        date = null;// date is not valid
      }
    }
  }
  if (!date) {
    res.end('Invalid parameter: "date". Please format as YYYY-MM-DD.');
    return;
  }

  var weekPrior = new Date(date);
  weekPrior.setDate(date.getDate()-7);

  var yearPrior = new Date(date);
  yearPrior.setFullYear(yearPrior.getFullYear() - 1);

  var new_contributors_7_days = 0;
  var total_active_contributors = 0;

  for (var i = mozFests.length - 1; i >= 0; i--) {
    if ((mozFests[i].date > weekPrior) && (mozFests[i].date < date)) {
      new_contributors_7_days += mozFests[i].contributors;
    }
    if ((mozFests[i].date > yearPrior) && (mozFests[i].date < date)) {
      total_active_contributors += mozFests[i].contributors;
    }
  }

  var counts = {};
  counts.total_active_contributors = total_active_contributors;
  counts.new_contributors_7_days = new_contributors_7_days;
  res.json(counts);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
