const filter_btns=document.querySelectorAll(".filter-btn");
const hamburger_menu=document.querySelector(".hamburger-menu");
const navbar=document.querySelector("header nav");const links=document.querySelectorAll(".links a");

function closeMenu(){navbar.classList.remove("open");document.body.classList.remove("stop-scrolling");}
hamburger_menu.addEventListener("click",()=>{if(!navbar.classList.contains("open")){navbar.classList.add("open");document.body.classList.add("stop-scrolling");}else{closeMenu();}});links.forEach((link)=>link.addEventListener("click",()=>closeMenu()));filter_btns.forEach((btn)=>{btn.addEventListener("click",()=>{filter_btns.forEach((button)=>button.classList.remove("active"));btn.classList.add("active");

let filterValue=btn.dataset.filter;$(".grid").isotope({filter:filterValue});});});$(".grid").isotope({itemSelector:".grid-item",layoutMode:"fitRows",transitionDuration:"0.6s",});var slideIndex=1;showSlides(slideIndex);

function plusSlides(n){showSlides(slideIndex+=n);}

function currentSlide(n){showSlides(slideIndex=n);}

function showSlides(n){var i;var slides=document.getElementsByClassName("mySlides");var dots=document.getElementsByClassName("dot");if(n>slides.length){slideIndex=1}
if(n<1){slideIndex=slides.length}
for(i=0;i<slides.length;i++){slides[i].style.display="none";}
for(i=0;i<dots.length;i++){dots[i].className=dots[i].className.replace(" active","");}
slides[slideIndex-1].style.display="block";dots[slideIndex-1].className+=" active";}

// Position to show data
const blogPos = document.querySelector('#blog')

// Dev.to username and api
const username = 'juliafmorgado'
const api = 'https://dev.to/api/articles?'

// Helper function
// Create elements
function createNode(element){
    return document.createElement(element)
}

// function append element
function append(parentEl, childEl){
    return parentEl.appendChild(childEl)
}

const ul = createNode('ul')
ul.classList.add('blog-feed')

const finalURL = buildURL(username)
fetch(finalURL)
    .then((res) => res.json())
    .then(posts => {
        //limiting number posts
        posts.length = 3
        console.log(posts);
        posts.forEach((post) => {
            //creating node elements
            let li = createNode('li'), a = createNode('a');
            let h2 = createNode('h2'), p = createNode('p');
            let small = createNode('small')
            let img = document.createElement('img')

            //specifying value, attributes and className
          a.target = "_blank";
          p.classList.add("w-info");
          a.href = post.url;
          a.innerText = post.title;
        //   p.innerText = post.description;
          img.src = post.cover_image
          //appending 
          append(h2, a);
          append(li, h2);
          append(li, p);
          append(li, img)
          append(li, small);
          append(ul, li);
          
        })
        //appending blog post to feed
        append(blogPos, ul);
    })

    //build URL
    function buildURL(username){
        return `${api}username=${username}`
    }


    //gallery

    $(document).ready(function(){
        $("img").click(function(){
        let t = $(this).attr("src");
        $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
        $("#myModal").modal();
      });
      
      $("video").click(function(){
        let v = $("video > source");
        let t = v.attr("src");
        $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
        $("#myModal").modal();  
      });
      });//EOF Document.ready
    
    
      //Auto Embed Latest Videos from Youtube Channel
      var channelID = "UC_un3YZXBtAlCyApGu4_eSQ";
      var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");

      function loadVideo(iframe) {
        $.getJSON(reqURL + channelID,
          function(data) {
            var videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
            console.log(videoNumber);
            var link = data.items[videoNumber].link;
            id = link.substr(link.indexOf("=") + 1);
            iframe.setAttribute("src", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1");
            // iframe.parentElement.querySelector("#video-title").innerText = title;
          }
        );
      }
      
      var iframes = document.getElementsByClassName('latestVideoEmbed');
      for (var i = 0, len = iframes.length; i < len; i++) {
        loadVideo(iframes[i]);
      }
      