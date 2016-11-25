function displayCustomer(t){
    id = t.rowIndex-1;
    getWatsonFaceDetection(dataCustomer[id].Picture);
    showpanel('page-branch-customer-details');
    $("#branch-customer-details").empty();
    $("#branch-customer-face-analysis").html('<div style="text-align:center; vertical-align:middle"><i class="fa fa-spinner fa-pulse fa-4x fa-fw"></i><span class="sr-only">Loading...</span></div>');
    $("#branch-customer-details-tmpl").tmpl(dataCustomer[id]).appendTo("#branch-customer-details");
    if (dataCustomer[id].Name == "Unknown"){
        
    }
}

function getWatsonFaceDetection( img ){
    console.log(img);
    $.ajax({
        url: watsonVisualRecog.url + "/v3/detect_faces?api_key=" + watsonVisualRecog.api_key + "&url=" +img + "&version=" + watsonVisualRecog.version,
        success: function(result){
            dataCustomer[id].Age = "Between " + result.images[0].faces[0].age.min + " - " + result.images[0].faces[0].age.max;
            dataCustomer[id].Gender = result.images[0].faces[0].gender.gender;
            dataCustomer[id].IdentityName = result.images[0].faces[0].identity.name;
            $("#branch-customer-face-analysis").empty();
            $("#branch-customer-face-analysis-tmpl").tmpl(dataCustomer[id]).appendTo("#branch-customer-face-analysis");
        }, // END success
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error ");
            console.log('jqXHR:' + jqXHR);
            console.log('textStatus: ' + textStatus);
            console.log('errorThrown: ' + errorThrown);
        },
    });
}