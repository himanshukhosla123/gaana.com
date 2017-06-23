window.addEventListener("load",jsonLoad);
function jsonLoad(){
    var rawFile = new XMLHttpRequest();
//    rawFile.overrideMimeType("application/json");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            generateSongsLayout(this.responseText);
        }
        else if(rawFile.readyState==4 && rawFile.status=="404"){
            $("#songs .container").html('<h1 style="text-align:center;">Error 404 </h1><h2>Oops!Sorry <br/>File Not found</h2>');
        }
    }
    rawFile.open("GET","assests/js/ganna.json", true);
    rawFile.send(null);
    
}

function generateSongsLayout(json){
//    console.log(json);
    json=JSON.parse(json);
    var container=document.getElementById("songs_collection");
//    container.srcElement.addClass("abc");
    var div;
    for(var i=0;i<json.cardbox.length;i++){
        div=generateCardBox(json.cardbox[i]);
        container.appendChild(div);
    }
//    console.log(div);
    console.log(json)
    addListenters();
    
}

  
function generateCardBox(json){
    var div=document.createElement("div");
        var temp=json;
        var content='<div class="card_box"><div class="music_list_type clearfix"><div class="col-xs-6"><h4><a href="#">'+temp.songsbox+'</a></h4> </div>                    <div class="col-xs-6 text_right"> <h5><a href="#" class="viewall">View All<i class="fa fa-angle-right" aria-hidden="true"></i></a></h5></div></div><div class="songs_list">';
        for(var j=0;j<temp.songscards.length;j++)
        { var temp2=temp.songscards[j];
            content+='<div class="songs_box"><span class="song_obj">'+JSON.stringify(temp2)+'</span><div class="thumb clearfix song_image"><img src="'+temp2.image_source+'" class="img-responsive" alt=""><div class="play_icon song_image"> <i class="fa fa-play" aria-hidden="true"></i></div>  </div><div class="description"><span class="song_name">'+temp2.song_name+'</span><span class="album_name">'+temp2.album_name+'</span></div></div>';
        }    
        content+='</div><a href="#" class="left_scroll"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a><a href="#" class="right_scroll"> <i class="fa fa-angle-double-right" aria-hidden="true"></i> </a></div>';
        div.innerHTML=content;
    return div;
}