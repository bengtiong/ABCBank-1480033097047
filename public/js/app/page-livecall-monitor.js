function displayLiveCall(t){
    id = t.rowIndex-1;
    showpanel('page-livecall-monitor-details');
    $("#livecall-details").empty();
    $("#livecall-details-tmpl").tmpl(dataLiveCall[id]).appendTo("#livecall-details");
    $("#livecall-transcript").html("Loading ...").load(dataLiveCall[id].CallTranscript);
    $("#livecall-transcript-analysis").html('<div style="text-align:center; vertical-align:middle"><i class="fa fa-spinner fa-pulse fa-4x fa-fw"></i><span class="sr-only">Loading...</span></div>');
    getAgentCustomerSentiment(dataLiveCall[id].CallTranscript);
    console.log(dataLiveCall[id].CallTranscript);
}

audiojs.events.ready(function() {
    var as = audiojs.createAll();
});

function getAgentCustomerSentiment(transcriptFile){
    $.get(transcriptFile, function(transcript) {    
        $.ajax({
            url: watsonAlchemy.url + '/text/TextGetTargetedEmotion?apikey=' + watsonAlchemy.apikey + '&outputMode=json&targets=Agent|Customer&text="' + transcript + '"',
            success: function(result){
                $("#livecall-transcript-analysis").empty();
                for (i=0; i<result.results.length; i++){
                    for (e in result.results[i].emotions){
                        result.results[i].emotions[e] = Math.round(result.results[i].emotions[e]*100)/100;
                    } $("#livecall-transcript-analysis-tmpl").tmpl(result.results[i]).appendTo("#livecall-transcript-analysis");
                }
            }, // END success
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error ");
                console.log('jqXHR:' + jqXHR);
                console.log('textStatus: ' + textStatus);
                console.log('errorThrown: ' + errorThrown);
            },
         });
    });
}
