var watsonAlchemy = {
  "url": "https://gateway-a.watsonplatform.net/calls",
  "note": "It may take up to 5 minutes for this key to become active",
  "apikey": "ff55d5016309826a60986561a2f1a49909672ab6"
}

var watsonVisualRecog = {
    "url": "https://gateway-a.watsonplatform.net/visual-recognition/api",
    "note": "It may take up to 5 minutes for this key to become active",
    "api_key": "38d7ef39c7149dda04297409e206c32fdca564fa",
    "version": "2016-05-20"
}

$(function () {
    $("#livecall-monitor-table-tmpl").tmpl(dataLiveCall).appendTo("#livecall-monitor-table-body");
    $("#branch-customer-table-tmpl").tmpl(dataCustomer).appendTo("#branch-customer-table-body");    
});
