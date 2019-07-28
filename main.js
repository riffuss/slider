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
        slideW = slider.clientWidth,
        thumbW = slideW / 3,
        startPos = 0,
        rightRemoved = 0,
        leftRemoved = 0,
        thumbArray,
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
        slider_track.style.width = `${slideW * slides.length}px`;
        slides.forEach(item => item.style.width = `${slideW}px`);
        thumbSlider.style.width = `${slider.clientWidth}px`;
        thumbTrack.style.width = `${thumbW * (thumbImg.length )}px`
        thumbTrack.prepend(thumbTrack.lastElementChild);
        thumbImg.forEach((el) => {
            el.style.width = `${thumbW}px`;
        });
    }
    slider_track.addEventListener('transitionend', function(){
        if(direct === -1){
            slider_track.appendChild(slider_track.firstElementChild);
            thumbTrack.appendChild(thumbTrack.firstElementChild);
        }else if(direct === 1){
            slider_track.prepend(slider_track.lastElementChild);
            thumbTrack.prepend(thumbTrack.lastElementChild);
        }
        slider_track.style.transition = 'none';
        slider_track.style.transform = `translateX(0)`;
        thumbTrack.style.transition = 'none';
        thumbTrack.style.transform = `translateX(0)`;
    });
    function left(){
        index >= thumbTrack.children.length - 1 ? index = 0 : index++;
        if(direct === 1){
            let arrSlider=[];
            for(let i = 0; i < slider_track.children.length-1 ; i++){
                arrSlider.push(slider_track.children[i]);
            }

            for(let i = 0; i < slider_track.children.length; i++){
                slider_track.removeChild(slider_track.children[0]);
            }
            slider.style.justifyContent = 'flex-start';
            slider_track.style.justifyContent = 'flex-start';
            slider_track.append(...arrSlider);

            let arrThumb=[];
            for(let i = 0; i < thumbTrack.children.length - 3 ; i++){
                arrThumb.push(thumbTrack.children[i]);
            }

            for(let i = 0; i <= thumbTrack.length - 3 ; i++){
                thumbTrack.removeChild(thumbTrack.children[0]);
            }
            thumbSlider.style.justifyContent = 'flex-start';
            thumbTrack.append(...arrThumb);
        }
        direct = -1;
        slider_track.style.transition = 'transform 0.3s ease-out';
        slider_track.style.transform = `translateX(-${slideW}px)`;
        thumbTrack.style.transition = 'transform 0.3s ease-out';
        thumbTrack.style.transform = `translateX(-${thumbW}px)`;
    }
    function right(){
        index <= 0 ? index = thumbTrack.children.length - 1 : index--;
        if(direct === -1){
            let arrSlider=[];
            for(let i = slider_track.children.length-1; i > 0 ; i--){
                arrSlider.unshift(slider_track.children[slider_track.children.length - 1]);
                slider_track.removeChild(slider_track.children[slider_track.children.length - 1]);
            }
            slider.style.justifyContent = 'flex-end';
            slider_track.style.justifyContent = 'flex-end';
            slider_track.prepend(...arrSlider);

            let arrThumb=[];
            for(let i = thumbTrack.children.length; i > 3 ; i--){
                arrThumb.unshift(thumbTrack.children[thumbTrack.children.length - 1]);
                thumbTrack.removeChild(thumbTrack.children[thumbTrack.children.length - 1]);
            }
            thumbSlider.style.justifyContent = 'flex-end';
            thumbTrack.prepend(...arrThumb);
        }
        direct = 1;
        slider_track.style.transition = 'transform 0.3s ease-out';
        slider_track.style.transform = `translateX(${slideW}px)`;


        thumbTrack.style.transition = 'transform 0.3s ease-out';
        thumbTrack.style.transform = `translateX(${thumbW}px)`;
    }
    thumbTrack.addEventListener('click', (e) => {
        if(index === 0 && +e.target.dataset.id === thumbTrack.children.length - 1) next.click();
        if(+e.target.dataset.id !== index){
            +e.target.dataset.id >= index || (+e.target.dataset.id === 0 && index === thumbTrack.children.length - 1) ? prev.click() : next.click();
        }
    });
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
