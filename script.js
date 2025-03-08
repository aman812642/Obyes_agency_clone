function locomotiveScroll(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}


function loaderAnimation() {
  let tl = gsap.timeline();

  tl.from("#loader .line h1", {
    y: 100,
    // opacity: 0,
    duration: 1,
    delay: 1,
    stagger: 0.3,
  });

  tl.from(".line-part-1 , .line-part-2", {
    opacity: 0,
    duration: 1,
    onStart: function () {
      let counter = document.querySelector(".counter");
      let count = 0;

      let countIntervel = setInterval(() => {
        if (count < 100) {
          count = count + 1;
          if (count < 10) {
            counter.textContent = "0" + count;
          } else if (count > 9) {
            counter.textContent = count;
          }
        } else {
          clearInterval(countIntervel);
        }
      }, 38);
    },
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.4,
    delay: 5,
  });

  tl.from("#page1", {
    y: 900,
    duration: 1,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from(".hero h1" , {
    y:200,
    duration:0.5,
    stagger:0.1
  })
}

function flagAnimation(){
  document.addEventListener("mousemove" , function(dets){
    gsap.to("#flag",{
      x: dets.x,
      y: dets.y,
    })
  })
  document.querySelector("#hero3").addEventListener("mouseenter" , function(){
    gsap.to("#flag" , {
      opacity:1
    })
  })
  document.querySelector("#hero3").addEventListener("mouseleave" , function(){
    gsap.to("#flag" , {
      opacity:0
    })
  })
}

function magnets() {
  Shery.makeMagnet(".nav-part-3 h3", {});
  Shery.makeMagnet("#nav svg", {});
  Shery.makeMagnet(".nav-part-2 h3", {});
  
  gsap.from(".nav-part-3 h3" , {
    y:-300,
    duration:1,
    delay:10,
    stagger:0.2
  })

  gsap.from(".nav-part-2 h3" , {
    y:300,
    duration:1,
    delay:9.5,
    stagger:0.2
  })
  gsap.from("#nav svg" , {
    y:-300,
    duration:1,
    delay:9.5,
    stagger:0.2
  })
}

function sheryAnimation(){
  Shery.imageEffect(".image-div", {
    style: 5,
    config: {"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.5278026680377126},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":1.22,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.37,"range":[0,2]},"noise_scale":{"value":16.03,"range":[0,100]}},
    gooey:true,
  });
}

function mouseAnimation(){
  Shery.mouseFollower({
    skew:true ,
    ease : "cubic-bezier(0.23 , 1 , 0.320, 1)",
    duration:1
  })

  let videoContainer = document.querySelector(".video-container");
  videoContainer.addEventListener("mouseenter" , function(){
    videoContainer.addEventListener("mousemove" , function(dets){
      gsap.to(".mousefollower" , {
        display : "none"
      })
      gsap.to(".video-crsr" , {
        x : dets.x - 500,
        y: dets.y - 360
      })
    })
  })
  videoContainer.addEventListener("mouseleave" , function(){
    gsap.to(".mousefollower" , {
      display : "intitial"
    })
    gsap.to(".video-crsr" , {
      top : "20%",
      left : "-3%"
    })
  })
}

function videoAnitmation(){
  let count = 1;
  let videoContainer = document.querySelector(".video-container")
  videoContainer.addEventListener("click" , function () {
    count++
    console.log(count)
    let img = document.querySelector(".video-container img")
    if(count % 2 === 0){
      img.style.display = "none"
    }
    else{
      img.style.display = "initial"
    }
  })
}


locomotiveScroll();
loaderAnimation();
magnets();
flagAnimation();
mouseAnimation();
videoAnitmation();
sheryAnimation();