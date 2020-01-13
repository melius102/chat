const viewportParams2 = ", initial-scale=1.0, user-scalable=no";
let metaViewport;
let cur_w, cur_h, new_w, new_h, start_angle;
let cht_input_plus_flag;

// function getWinInner() {
//     let win_inner_ = [window.innerWidth, window.innerHeight];
//     let jquerywin_ = [$(window).width(), $(window).height()];
// }

function getViewport() {
    new_w = $(window).width();
    new_h = $(window).height();
}

function updateViewport(new_w, new_h, css_flg) {
    cur_w = new_w;
    cur_h = new_h;

    let viewportParams = "width=" + cur_w + ", height=" + cur_h + viewportParams2;
    metaViewport.setAttribute("content", viewportParams);

    if (css_flg) {
        // document.documentElement.style.setProperty('--varw', `${cur_w}px`);
        document.documentElement.style.setProperty('--varh', `${cur_h / 100}px`);
    }
}

window.onload = function () {
    metaViewport = document.querySelector("meta[name=viewport]");
    document.documentElement.style.setProperty('--intro_time', `10s`);
    document.documentElement.style.setProperty('--input_height', `50px`);

    // alert(screen.orientation.type);
    // portrait-primary, landscape-primary, landscape-secondary
    // alert(screen.orientation.angle);
    // 0, 90, 270, (number)
    start_angle = screen.orientation.angle;

    initialization_log();
    initialization_cht();
    //log_btn_enter.onclick();
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

function hideViewport(flag) {
    if (flag) {
        log_wrap.style.visibility = "hidden";
    } else {
        log_wrap.style.visibility = "visible";
    }
}

function initialization_log() {
    if (start_angle == 0) { // all for desktop & portrait for mobile
        hideViewport(false);
        getViewport();
        updateViewport(new_w, new_h, true);
    } else { // landscape
        hideViewport(true);
    }

    log_btn_enter.onclick = function () {
        log_wrap.style.display = "none";
        cht_wrap.style.display = "block";
        updateViewport("device-width", "device-height", false);
        // for focusing added msg
    };
}

function initialization_cht() {
    cht_input_plus_flag = 0;
    cht_room_no.onclick = function () {
        log_wrap.style.display = "block";
        cht_wrap.style.display = "none";
    };

    cht_input_plus.onclick = function () {
        if (cht_input_plus_flag = !cht_input_plus_flag) {
            this.src = "img/Icon awesome-minus-square.svg";
        } else {
            this.src = "img/Icon awesome-plus-square.svg";
        }
        // alert($('#cht_input_textarea').height());
    };

    let cnt = 0;
    cht_input_send.onclick = function () {
        let msg = cht_input_textarea.value.replace(/\n/g, "<br/>");
        cht_input_textarea.value = "test_msg";
        if (msg != "") {
            cnt++;
            $('#msg_last').removeAttr('id');
            // plz check security for msg
            $('#cht_msg_win').append($(`<p id="msg_last">(${cnt})${msg}</p>`));
        }
        updateTextarea();
        location.href = "#msg_last";
        cht_input_textarea.focus();
    };

    function updateTextarea() {
        let line_num = cht_input_textarea.value.split('\n').length;
        let line_height;
        let textarea_height;
        if (line_num < 2) {
            textarea_height = 20;
            line_height = textarea_height + 30;
        } else if (line_num < 4) {
            textarea_height = 20 * line_num;
            line_height = textarea_height + 30;
        } else {
            textarea_height = 20 * 4;
            line_height = textarea_height + 30;
        }
        cht_input_textarea.style.height = `${textarea_height}px`;
        document.documentElement.style.setProperty('--input_height', `${line_height}px`);
        // cht_room_no.innerHTML = cht_input_textarea.value;
        return true;
    }

    // $('#cht_input_textarea').on("propertychange change keyup paste input", function() {
    // input, keyup, paste
    $('#cht_input_textarea').on("input", updateTextarea);
};
