document.addEventListener('DOMContentLoaded', function(){
    let prev = document.querySelector('.slider-prev'),
        next = document.querySelector('.slider-next');
    let slides = document.querySelectorAll('.slider-img'),
        slider_track = document.querySelector('.slider-track'),
        slider = document.querySelector('.slider'),
        thumbSlider = document.querySelector('.slider-thumb'),
        thumbImg = document.querySelectorAll('.slider-thumb-img'),
        thumbTrack = document.querySelector('.slider-thumb-track');
    let sliderArr = [
                        'img/slide1.jpg',
                        'img/slide2.jpg',
                        'img/slide3.jpg',
                        'img/slide5.jpg',
                        'img/slide6.jpg'
                    ],
        items = [],
        slideW = slides[0].clientWidth,
        thumbW = slideW / 3,
        startX = 0,
        isDown = false,
        isUp = false,
        index = 0,
        elemX = Math.floor(slider_track.getBoundingClientRect().left),
        scrollToLeft = 0,
        direct = -1,
        x = 0,
        offset = 0;
    init();
    function init(){
        slides.forEach(elem => {
            items.push(elem);
        });
        console.log(slider.clientWidth)
        thumbSlider.style.width = `${slider.clientWidth}px`;
        thumbTrack.style.width = `${thumbW * (thumbImg.length )}px`
        thumbImg.forEach((el, i) => {
            el.style.width = `${thumbW}px`;
        });
        console.log(thumbTrack.clientWidth)
    }
    slider_track.addEventListener('transitionend', function(){
        if(direct === -1){
            slider_track.appendChild(slider_track.firstElementChild);
        }else if(direct === 1){
            slider_track.prepend(slider_track.lastElementChild);
        }
        slider_track.style.transition = 'none';
        slider_track.style.transform = `translateX(0)`;
        setTimeout(()=>{
            slider_track.style.transition = 'transform 0.3s ease-out';
        }, 0)
    });
    thumbTrack.addEventListener('transitionend', function(){
        if(direct === -1){
            thumbTrack.appendChild(thumbTrack.firstElementChild);
            thumbTrack.style.transition = 'none';
            thumbTrack.style.transform = `translateX(0)`;
        }
    });
    function left(){
        if(direct === 1){
            slider_track.prepend(slider_track.lastElementChild);
        }
        direct = -1;
        slider.style.justifyContent = 'flex-start';
        slider_track.style.transform = `translateX(-${slideW}px)`;
        index++;
        thumbTrack.style.transition = 'transform 0.3s ease-out';
        thumbTrack.style.transform = `translateX(-${thumbW}px)`;
    }
    function right(){
        if(direct === -1){
            slider_track.appendChild(slider_track.firstElementChild);
        }
        direct = 1;
        slider.style.justifyContent = 'flex-end';
        index--;
        slider_track.style.transform = `translateX(${slideW}px)`;
        thumbTrack.prepend(thumbTrack.lastElementChild);
        thumbTrack.style.transition = 'none';
        thumbTrack.style.transform = `translateX(-${slideW/3}px)`;
        setTimeout(()=>{
            thumbTrack.style.transition = 'transform 0.3s ease-out';
            thumbTrack.style.transform = `translateX(0)`;
        });
    }
    prev.addEventListener('click', left);
    next.addEventListener('click', right);
    // Touch events
    // slider_track.addEventListener('touchstart', (e) => {
    //     isDown = true;
    //     isUp = false;
    //     startX = e.changedTouches[0].pageX;
    //     slider_track.style.transition = 'none';
    // });
    // slider_track.addEventListener('touchend', () => {
    //     isUp = true;
    //     isDown = false;
    //     if(offset < 0){
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         left();
    //     }else{
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         right();
    //     }
    // });
    // slider_track.addEventListener('touchleave', (e) => {
    //     isDown = false;
    //     if(!isUp){
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         if(offset < 0){
    //             slider_track.style.transform = `translateX(-${slideW}px)`;
    //         }else{
    //             slider_track.style.transform = `translateX(${slideW}px)`;
    //         }
    //     }
    // });
    // slider_track.addEventListener('touchmove', (e) => {
    //     if(!isDown) return;
    //     e.preventDefault();
    //     offset = e.changedTouches[0].pageX - startX;
    //     offset < 0 ? left() : right();
    //     slider_track.style.transform = `translateX(${offset}px)`;
    // });

    // Mouse Events
    // slider_track.addEventListener('mousedown', (e) => {
    //     isDown = true;
    //     isUp = false;
    //     startX = e.pageX;
    //     slider_track.style.transition = 'none';
    //     thumbTrack.style.transition = 'none';
    // });
    // slider_track.addEventListener('mouseup', () => {
    //     isUp = true;
    //     isDown = false;
    //     if(offset < 0){
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         thumbTrack.style.transition = 'transform 0.3s ease-out';
    //         left();
    //     }else{
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         thumbTrack.style.transition = 'transform 0.3s ease-out';
    //         right();
    //     }
    // });
    // slider_track.addEventListener('mouseleave', (e) => {
    //     isDown = false;
    //     if(!isUp){
    //         isUp = true;
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         thumbTrack.style.transition = 'transform 0.3s ease-out';
    //         if(offset < 0){
    //             slider_track.style.transform = `translateX(-${slideW}px)`;
    //             thumbTrack.style.transform = `translateX(-${slideW}px)`;
    //         }else{
    //             slider_track.style.transform = `translateX(${slideW}px)`;
    //             thumbTrack.style.transform = `translateX(${slideW}px)`;
    //         }
    //     }
    // });
    // slider_track.addEventListener('mousemove', (e) => {
    //     if(!isDown) return;
    //     e.preventDefault();
    //     offset = e.pageX - startX;
    //     offset < 0 ? left() : right();
    //     slider_track.style.transform = `translateX(${offset}px)`;
    //     thumbTrack.style.transform = `translateX(${offset/3}px)`;
    // });
    //
    // thumbTrack.addEventListener('mousedown', (e) => {
    //     isDown = true;
    //     isUp = false;
    //     startX = e.pageX;
    //     slider_track.style.transition = 'none';
    //     thumbTrack.style.transition = 'none';
    // });
    // thumbTrack.addEventListener('mouseup', () => {
    //     isUp = true;
    //     isDown = false;
    //     if(offset < 0){
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         thumbTrack.style.transition = 'transform 0.3s ease-out';
    //         left();
    //     }else{
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         thumbTrack.style.transition = 'transform 0.3s ease-out';
    //         right();
    //     }
    // });
    // thumbTrack.addEventListener('mouseleave', (e) => {
    //     isDown = false;
    //     if(!isUp){
    //         isUp = true;
    //         slider_track.style.transition = 'transform 0.3s ease-out';
    //         thumbTrack.style.transition = 'transform 0.3s ease-out';
    //         if(offset < 0){
    //             slider_track.style.transform = `translateX(-${slideW}px)`;
    //             thumbTrack.style.transform = `translateX(-${slideW}px)`;
    //         }else{
    //             slider_track.style.transform = `translateX(${slideW}px)`;
    //             thumbTrack.style.transform = `translateX(${slideW}px)`;
    //         }
    //     }
    // });
    // thumbTrack.addEventListener('mousemove', (e) => {
    //     if(!isDown) return;
    //     e.preventDefault();
    //     offset = e.pageX - startX;
    //     offset < 0 ? left() : right();
    //     slider_track.style.transform = `translateX(${offset}px)`;
    //     thumbTrack.style.transform = `translateX(${offset/3}px)`;
    // });

});
