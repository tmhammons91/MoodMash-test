//Global variables =====================================================
var topics=["happy", "sad", "chilled out", "angry"]; 

//Functions===============================================

// Function for displaying topic buttons 
    function renderButtons() {   
        $("#itemButtons").empty();
		//loop for adding buttons modeled after in class example on movie topics
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topicItem");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#itemButtons").append(a);
        }
     }; //end of renderButtons function

// Function to add new topic button
    $("#addItem").on("click", function(event) {

        event.preventDefault();
        var newTopic = $("#search-input").val().trim();
        $("#search-input").val(""); 
        //if statement to prevent duplicate items from being added
        if (topics.indexOf(newTopic)=== -1) {
        topics.push(newTopic);
        renderButtons();
    	} else {return}
      });

//onclick function to get still gifs
    $("#itemButtons").on("click", ".topicItem", function() { 
      $("#playlistItems").empty(); 
      topic = $(this).attr("data-name"); 

      var queryUrl="https://api.spotify.com/v1/search?q=" + topic +"&type=playlist" ; 



         $.ajax({
          url: queryUrl, 
          //headers: { "Authorization": "Bearer " + "BQDOMuIdXX-23N87SMIr_U14pSrFnZHNyM8L-HGhv3MT03w_1bqa2tbhAg9nLAC_VVYRXHhxAXFG75t4U-6vEIO8M6CIvNov7JzNDXPTl03ADLscqGS8tQpu24fWS0zEXYLg4odx_B8jmt3NG1krzVepNTOYJzT4UFkk"}, 
          method: "GET"
          }).done(function(response) {
          
           results=response.playlists.items; 

           console.log(results); 

            for (var i=0; i<results.length; i++) {
              playlistDiv=$("<div>")
              pName=$("<p>"); 
              pName.text("Playlist Name: " + results[i].name);
              pHref=$("<p>"); 
              pHref.text("External Href from Object: " + results[i].external_urls.spotify)
                    
              playlistDiv.append(pName); 
              playlistDiv.append(pHref); 
              
              playlistDiv.addClass("playlistDiv"); 
              $("#playlistItems").append(playlistDiv); 
            } // end of for loop
          });  // end of done function response           
    }); // end of topicItem on click function

  

//Main process to render initial buttons===============================================
renderButtons()