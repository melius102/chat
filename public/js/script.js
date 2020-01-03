window.onload = function () {
    icon_door.onclick = function () {
        frm.room_no.classList.toggle('bng_test');
    }

    icon_id.onclick = function () {
        frm.user_no.classList.toggle('bng_test');
    }

    icon_key.onclick = function () {
        frm.key_no.classList.toggle('bng_test');
    }

    btn_enter.onclick = function () {
        return false;
    }

    btn_join.onclick = function () {
        return false;
    }
}