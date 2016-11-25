var avgSentiment = 0;
var sumSentiment = 0;
var msgCount = 0;

// Get Twitter text
function getTweetText(){
    // Extract all the html that twitter has sent back
    doc = $('#twitter-widget-0').contents()[0]

    // Identify the individual paragraphs that contain the text for each tweet
    texts = $(doc).find("p.timeline-Tweet-text")

    // Iterate over each paragraph to grab the text
    var rawText = []
    for (var p=0; p < texts.length; p++){
        rawText.push( $(texts[p]).text() )
    }

    return rawText;
}

// Watson Get Sentiment

function getWatsonSentiment(text){
    $.ajax({
        //watson/alchemy api endpoint:
        url: watsonAlchemy.url + "/text/TextGetTextSentiment?apikey="+ watsonAlchemy.apikey + "&outputMode=json&text=" + text.replace("#","").replace("@",""),
        success: function(result){
            if (result.status == "OK"){
                console.log("Success Result: " + result.docSentiment.score);
                msgCount++;
                if (result.docSentiment.type != "neutral"){
                    sumSentiment += parseFloat(result.docSentiment.score);
                }
            }
            return true;
        }, // END success
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error ");
            console.log('jqXHR:' + jqXHR);
            console.log('textStatus: ' + textStatus);
            console.log('errorThrown: ' + errorThrown);
            return false;
        },
        
    }); // END ajax 
    return false;
}



// PAGE : Display Twitter Sentiments

function displayTwitterSentiment(){
    var mxmsg = 20;
    avgSentiment = 0;
    sumSentiment = 0;
    msgCount = 0;
    
    $("#sentiment").html('<div style="text-align:center; vertical-align:middle"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i><span class="sr-only">Loading...</span></div>');

    //For the first few tweets, get the sentiment for each
    var twitter_text = getTweetText();
    for (i=0; i<mxmsg; i++){
        getWatsonSentiment(twitter_text[i]);
    }

    $(document).ajaxStop(function(){
        console.log("calculate ...");
        if (msgCount != 0){
            avgSentiment = sumSentiment / msgCount;
        }
        console.log("Average: " + avgSentiment);

        if (avgSentiment < -0.1){ // sad
            face = "sad";
            face_colour = "red";
            sentiment = "Negative"
        }else if (avgSentiment < 0.1){ //neutral
            face = "meh";
            face_colour = "gold";
            sentiment = "Neutral";
        }else{ //happy
            face = "smile";
            face_colour = "green";
            sentiment = "Positive";
        }

        $("#sentiment").html(" <i class='fa-2x fa fa-" + face + "-o' style='color:" + face_colour + "'></i>" + "<br>" + sentiment + " " + Math.round(avgSentiment*100)/100);
        
    });
}
