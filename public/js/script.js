const viewportParams2 = ", initial-scale=1.0, user-scalable=no";
let metaViewport;
let cur_w, cur_h, new_w, new_h, start_angle;

// function getWinInner() {
//     let win_inner_ = [window.innerWidth, window.innerHeight];
//     let jquerywin_ = [$(window).width(), $(window).height()];
// }

function getViewport() {
    new_w = $(window).width();
    new_h = $(window).height();
}

function updateViewport(new_w, new_h) {
    cur_w = new_w;
    cur_h = new_h;

    let viewportParams = "width=" + cur_w + ", height=" + cur_h + viewportParams2;
    metaViewport.setAttribute("content", viewportParams);

    // document.documentElement.style.setProperty('--varw', `${cur_w}px`);
    // document.documentElement.style.setProperty('--varh', `${cur_h}px`);
}

function hideViewport(flag) {
    if (flag) {
        wrap.style.visibility = "hidden";
    } else {
        wrap.style.visibility = "visible";
    }
}

window.onload = function () {
    // alert(screen.orientation.type);
    // portrait-primary, landscape-primary, landscape-secondary
    // alert(screen.orientation.angle);
    // 0, 90, 270, (number)

    metaViewport = document.querySelector("meta[name=viewport]");
    start_angle = screen.orientation.angle;
    if (start_angle == 0) { // all for desktop & portrait for mobile
        hideViewport(false);
        getViewport();
        updateViewport(new_w, new_h);
    } else { // landscape
        hideViewport(true);
    }
};

window.onresize = function () {
    if (start_angle == 0) {
        if (screen.orientation.angle == 0) {
            hideViewport(false);
        } else {
            hideViewport(true);
        }
    } else {
        if (screen.orientation.angle == 0) {
            window.onload();
        }
    }
};
