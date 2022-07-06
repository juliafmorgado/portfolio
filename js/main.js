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