const scroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
});

// heading animations
function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("nav", {
        y: -10,
        opacity: 0,
        duration: 1.3,
        ease: Expo.easeInOut,
    });

    tl.to(".boundingelem", {
        y: 0,
        duration: 1.7,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: 0.2,
    });
    tl.from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.3,
        delay: -1.1,
        ease: Expo.easeInOut,
    });
}

function circlechapta() {
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    var timeout;
    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        // calculating diff value
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        // assigning final value 
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);

        xprev = dets.clientX;
        yprev = dets.clientY;
        // console.log(xscale, yscale);

        circleMouseFollower(xscale, yscale)
        timeout = setTimeout(() => {
            document.querySelector(
                "#minicircle"
            ).style.transform = `translate(${dets.clientX-5}px, ${dets.clientY-20}px) scale(${1},${1})`;
        }, 100);


    });
}
circlechapta();
// get data and move circle
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        // follow pointer
        // console.log(dets.clientX,dets.clientY);

        document.querySelector("#minicircle").style.display = "block";
        document.querySelector(
            "#minicircle"
        ).style.transform = `translate(${(dets.clientX)}px, ${(dets.clientY)}px) scale(${xscale},${yscale})`;
        
    });
}

firstPageAnim();

circleMouseFollower();

//teeno element ko choose karo ,uske baad teeno par ek mousemove lagao,jab mousemove ho to ye pata karo ki mouse kaha par hey. mouse ki x and y position pata karo,ab mouse ki x y position ke badle us image ko show karo and us image ko move karo,move karte waqt rotate karo,and jaise jaise mouse tez chale waise rotate karo,and jaise mouse tez chale waise waise rotation tez ho jaye


document.querySelectorAll(".elem").forEach(function (elem) {



    var rotate = 0;
    var diffrotate = 0;

    elem.addEventListener("mouseleave", function (dets) {
        
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power4,
            // duration:0.5
            
        })

            gsap.to(document.querySelector("#minicircle"),{
                height:"0.5px",
                width:"0.5px",
                opacity:1,
                padding:0.8
            })
            document.querySelector("#minicircle").innerHTML=""

    });

    elem.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").innerHTML="View"
        gsap.to(document.querySelector("#minicircle"),{
            height:"5vw",
            width:"5vw",
            opacity:0.7,
            padding:"1vw"
            
        })

        var diff = (dets.clientY - elem.getBoundingClientRect().top)
        diffrotate = dets.clientX - rotate;
        rotate = dets.clientX;


        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power4,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrotate * 0.5)
        })
    });
});


var clock=document.querySelector("#left h5")
setInterval(function(){
    const date =new Date()
    clock.innerHTML=date.toLocaleTimeString()
}, 1000)
