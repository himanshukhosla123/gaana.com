//$(window).ready(function(){
var audioPlayer;        
var queue_up=false;
var prev="",prevImage="";
var currentPlaylist =[];
var currentSongObj={};
var ul="",isVisibleSearchBox=true;
var defaultImage="assests/images/defaultImage.gif";
function addListenters(){
//    jsonLoad();
    audioPlayer=document.getElementById("audio_player");
    ul=document.getElementById("queueUl");
    ul.innerHTML='<a  class="open_queue" id="queue_list" onclick="toggleQueueMenu">Open Queue<i class="fa fa-angle-double-up" aria-hidden="true"></i></a><li id="queuelist_options"><div class="thumb left"><img src="assests/images/album.png" class="img-responsive" alt=""></div><div id="queueName">Queue</div><div class="right queue_buttons"><button id="saveAsPlaylist" class="btn btn-default" onClick="saveAsPlaylist();">SAVE AS PLAYLIST</button><button id="clearQueue" class="btn btn-default" onClick="clearQueue();">CLEAR QUEUE</button></div></li><div id="playlist_box"></div>';
    document.getElementById("queue_list").addEventListener("click",toggleQueueMenu);
    
    $(".description").click(function(){
        manageDescription($(this));});
    
    $(".play_icon").click(function(){
//        console.log();
        obj=JSON.parse($(this)[0].parentNode.parentNode.children[0].innerHTML);
        managePlayer(obj);
    });
    
    $(window).scroll(manageSearchBox);
    $(window).resize(function(event){
    if(queue_up===true){
       toggleQueueMenu();
       }
        manageResponsiveElements();
    });
    manageResponsiveElements();
    
   $("#search_box").click(function(){
       if($(window).width()<463&&!isVisibleSearchBox){
            isVisibleSearchBox=false;
       }
       
       if(isVisibleSearchBox){
       $("#search_music").hide();
       isVisibleSearchBox=false;}
       else
        {    isVisibleSearchBox=true;
               $("#search_music").show(500);
           }
   });
    document.getElementById("audio_player").addEventListener("timeupdate",updatePlayerTime);
    
    audioPlayer.oncanplay=function(){
        $("#playorpause").html('<i class="fa fa-pause" aria-hidden="true"></i>');
    };

}


function updatePlayerTime(){
    console.log($("#music_slider")[0].value+" "+audioPlayer.duration);
    $("#current_time").html(getTimeString(audioPlayer.currentTime));
    $("#music_slider")[0].value=isNaN(audioPlayer.duration)?0:parseInt((audioPlayer.currentTime/audioPlayer.duration)*100);
    $("#end_time").html(getTimeString(audioPlayer.duration));
}


function saveAsPlaylist(){
    //local storage
}

function manageAudioForwarding(value){
    audioPlayer.currentTime=((value*audioPlayer.duration)/100);
    $("#playorpause").html('<img src="assests/images/loader.gif" alt="loading" class="img-loading img-responsive">');
}

function manageSearchBox(){
 if($(window).scrollTop()>70||$(window).width()<464){
     $("#search_box").show();
     $("#search_music").hide();
 }
    else{
        $("#search_box").hide();
        $("#search_music").show();
    }
    
}

function manageResponsiveElements(){
    
         var temp=$(window).height()-70;
      if($(window).width()<=463&&$(window).height()>=$(window).width()||
        $(window).height()<=463&&$(window).height()<=$(window).width())
        { $(".footer .queue").css({"top":"-30px",
//                                      "left":"0px",
//                                      "width":"100%",
                           "height":""+temp+"px"});
             $("#playlist_box").height(temp-80);}
    else
    {$(".footer .queue").css({"top":"-30px",
//                             "left":"19%",
//                             "width":"65%",
                             "height":"450px"});
             $("#playlist_box").height(370);}
         
          
              
        if($("body").width()<=767){
            $("#login a").html('<i class="fa fa-user" area-hidden="true"></i>');
            $("#volume_box").hide();
        }
        else{
            $("#login a").html("Login/Sign up");
            $("#volume_box").show();
        }
    

    if($("body").width()<=463){
            $("#search_music .search").html('<i class="fa fa-search" area-hidden="true"></i>');
        $("#search_box").show();
             $("#playnext , #playprev").hide();
        }
        else{
            $("#search_music .search").html('<i class="fa fa-search"></i>Search');
             $("#search_box").hide();
             $("#playnext , #playprev").show();
        }
         
    
    
//          var queuelist_margin=$("#queue").width();
//    console.log(queuelist_margin);
//         queuelist_margin=queuelist_margin-$("#queue_list").innerWidth();
//        console.log(queuelist_margin);
//          $("#queue").css("left",""+(queue_margin/2)+"px");
//          $("#queue_list").css("margin-left",""+(queuelist_margin)/2+"px");  
     
}
function manageDescription(obj){
    obj=JSON.parse(obj[0].parentNode.children[0].innerHTML);
    managePlayer(obj);    
    }

function managePlayer(obj){
    if(obj.playlist_type===false){
     obj=[obj];}
    else{
        obj=obj.playlist;
    }
    player_manager(obj[0]);
    addToQueue(obj);
    $("#playorpause").html('<img src="assests/images/loader.gif" alt="loading" class="img-loading img-responsive">');
    $("#player").show(1000);             
}

function manageQueueLi(obj){
//    console.log("clicked li");
        console.log(obj);
        obj=JSON.parse(obj[0].children[0].innerHTML);
        var songName=obj.song_name;
        var imageName=obj.image_source;

        var albumName=obj.album_name;
        if(obj.id!=currentSongObj.id)
             {player_manager(obj);
//             currentSongObj=obj;
             }
            managePrevLi();
}

function toggleQueueMenu(){
    console.log("in toggle")
    var queueList=document.getElementById("queue_list");
    var queue=document.getElementById("queue");
//    queue.classList.toggle("toggle_queuelist");
    var temp=$("#queue").height()-20;
    if(queue_up===false)
    { $("#queue").css("transform","translateY(-"+temp+"px)");
    queueList.innerHTML='Close Queue<i class="fa fa-angle-double-down" aria-hidden="true"></i>';
    queue_up=true;
    }
    else{    $("#queue").css("transform","translateY(0px)");
        queueList.innerHTML='Open Queue<i class="fa fa-angle-double-up" aria-hidden="true"></i>';
        queue_up=false;
    }
}

function clearQueue(){
    $("#playlist_box").html("");
    currentPlaylist=[];
}

function player_manager(obj){
    currentSongObj=obj;
    audioPlayer.pause();
    audioPlayer.currentTime=0;
    audioPlayer.src=obj.quality.low;
    audioPlayer.play();
    var song_playing=document.getElementById("player_song_name");
    song_playing.innerHTML=obj.song_name;
    var playing_image=document.getElementById("player_song_image");
    playing_image.src=obj.image_source;
  document.getElementById("player_album_name").innerHTML=obj.album_name;
}

function manageShuffle(){
//    $("#loop").value;
}


function manageRepeat(){
var t=Math.random();
player_manager(currentPlaylist[t]);    
managePrevLi();    
}


function getTimeString(time){
     return isNaN(audioPlayer.duration)?"0:00":Math.floor(time/60)+":"+parseInt((((time/60)%1)*100).toPrecision(2));
}

function addToQueue(arr){
    
    var div=document.getElementById("playlist_box");
    var li;
//    console.log(div)
    for(var i=0;i<arr.length;i++){
        li=generateLi(arr[i]);
        div.appendChild(li);
    }
    managePrevLi();
}


function managePrevLi(){
     console.log($("#playlist_box")[0].children);
//    var t=currentPlaylist==[]?0:[($("#playlist_box")[0].children)].findIndex(function(varObj){return JSON.parse(varObj.children[0].innerHTML).id===currentSongObj.id;});
    
    var t=currentPlaylist==[]?0:currentPlaylist.findIndex(function(varObj){return varObj.id===currentSongObj.id;});
    console.log(t);
    current=document.getElementById("playlist_box").children[t];
//    console.log(current);
    currentImage=current.children[1].children[0].src;
    if(!(prev==""&&prevImage=="")){   
        prev.style.backgroundColor="#36383d"; 
        prev.children[1].children[0].src=prevImage;
    }
    current.style.backgroundColor="#232429";
    current.children[1].children[0].src=defaultImage;
    prev=current;
    prevImage=currentImage;
    console.log(prev);
}

function generateLi(obj){
       var li=document.createElement("li");
    
        var t=currentPlaylist.filter(function(itemobj){return itemobj.id===obj.id;});
            currentPlaylist.findIndex(function(varObj){return varObj.id===currentSongObj.id;});
        if(t.length==0)
            {currentPlaylist.push(obj);
//            generateCurrentPlaylist();
            }
        else{ li.style.display="none";
            return li;}
        li.innerHTML='<span class="song_obj">'+JSON.stringify(obj)+'</span><div class="thumb left"><img src="'+obj.image_source+'" class="img-responsive" alt=""> </div><div class="songs_details left"> <span class="song_name">'+obj.song_name+'</span></div> <div class="album_details left"><span class="album_name">'+obj.album_name+'</span></div><div class="dropup"> <button class="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">...</button> <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">    <li>Add to playlist</li><li>favourite</li> <li>share</li> <li>remove from queue</li> <li>get songs info</li></ul></div>';
    li.addEventListener("click",function(){
        var x=$(this);
        manageQueueLi(x);
    });
    li.classList="ui-widget-content";
//    addClass("ui-widget-content");
//    console.log(li);
    return li;
}

function defaultImage(){
  playing_image.src=defaultImage;
}

function generateCurrentPlaylist(){
    var ul =document.getElementById("playlist_box");
    ul.innerHTML="";
    for(var i=0;i<currentPlaylist.length;i++){
        var li=generateLi(currentPlaylist[i]);
        ul.appendChild(li);
    }
}

function getPath(source){
    return source.substring(source.indexOf("assests"),source.length)+"";
}
function play_music(){
    var value= $(this).text;
//    console.log(value);
    
}

function playOrPause(){
    if(audioPlayer.paused)
    {
        audioPlayer.play();
        $("#playorpause").html('<i class="fa fa-pause" aria-hidden="true"></i>');
        
    }
    else{
        audioPlayer.pause();
        $("#playorpause").html('<i class="fa fa-play" aria-hidden="true"></i>');
    }
    console.dir(audioPlayer);
    
}

function playNext(){
var index=currentPlaylist.findIndex(function(varObj){
    return varObj.id===currentSongObj.id;
});
if(index<currentPlaylist.length-1){   
currentSongObj=currentPlaylist[index+1];    
player_manager(currentSongObj);
$("#playorpause").html('<i class="fa fa-pause" aria-hidden="true"></i>');
        }
else{
        alert("No next song in the playlist");
}
//console.log(index);    
}

function playPrev(){
var index=currentPlaylist.findIndex(function(varObj){
    return varObj.id===currentSongObj.id;
});
if(index>0){   
currentSongObj=currentPlaylist[index-1];    
player_manager(currentSongObj);
$("#playorpause").html('<i class="fa fa-pause" aria-hidden="true"></i>');
        }
else{
        alert("No previous song in the playlist");
}
//console.log(index);    
}

function volume(value){
   audioPlayer.volume=value/100; 
    console.log(value);
}

function toggleVolumeBox(){
//    console.log("toggle none");
    $("#volume_manager").toggleClass("none");
//    console.log($("#volume_manager"));
    
}
    
