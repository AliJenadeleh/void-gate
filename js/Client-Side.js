//const { error } = require("jquery");

function getInnerHeight() { iHeight = window.innerHeight; return iHeight; }
function handleGoTopAnchor() {

    try {
        var elmTriger = $('#GoTopTrigger');

        var curPos = scrollY;

        if (curPos >= window.innerHeight / 3) {
            elmTriger.fadeIn({ duration: 250 });
        }
        else {
            elmTriger.fadeOut({ duration: 250 });
        }
    }
    catch (ex) {
        //console.log(ex.message);
    }
}
function goTop() {
    event.preventDefault();
    $('html').animate({ scrollTop: 0 }, 500, 'swing', null);
}

//================================================
// Shopping Cart
//================================================
function _CallShoppingCart(endPoint) {

    let result = null;

    $.ajax({
        type: "POST",
        url: endPoint,
        data: {},
        contentType: "application/text; charset=utf-8",
        dataType: "text",
        async: false,
        success: function (response) {
            result = response;
            console.log('ok');
        },
        error: function (errorThrown) {
            console.log(errorThrown);
            result = errorThrown.responseText;
        }
    });

    return result;
}

async function addToShoppingCart(Slug) {

    const endPoint = '/api/cart/add/' + Slug;

    try {
        return _CallShoppingCart(endPoint);
    }
    catch (ex) {
        console.log(ex);
        return 'خطا رخ داده است.';
    }

}

async function deleteFromShoppingCart(Slug) {
    const endPoint = '/api/cart/delete/' + Slug;
    try {
        return _CallShoppingCart(endPoint);
    }
    catch (ex) {
        console.log(ex);
        return 'خطا رخ داده است.';
    }

}

async function removeFromShoppingCart(Slug) {
    const endPoint = '/api/cart/remove/' + Slug;
    try {
        return _CallShoppingCart(endPoint);
    }
    catch (ex) {
        console.log(ex);
        return 'خطا رخ داده است.';
    }

}

//================================================
// Messages
//================================================

function showSuccess(Msg) {

    Swal.fire({
        title: 'تائید',
        html: '<b>' + Msg + '</b>',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then((result) => {

        if (result.dismiss === Swal.DismissReason.timer) {
            //console.log('I was closed by the timer')
        }
    });

}

function showFailed(Msg) {
    Swal.fire({
        title: 'خطا',
        html: '<b>' + Msg + '</b>',
        timer: 2000,
        icon:'error',
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then((result) => {

        if (result.dismiss === Swal.DismissReason.timer) {
            //console.log('I was closed by the timer')
        }
    });
}

//================================================
// Initialize
//================================================

function Triggers() {

    //================================================
    // Handle Gotop
    //================================================
    handleGoTopAnchor();
    $(document).bind('scroll', handleGoTopAnchor);
    $('#GoTopTrigger').click(goTop);

    $('[data-trigger="focus"]').first().focus();
}


//================================================
// Register SW
//================================================

function registerSW() {

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('/sw.min.js')
            .then(function (tResult) {
                // SW Registered
            })
            .catch(function (cResult) {

                //console.error(cResult.message);

                // Try Again To Register
                navigator.serviceWorker.register('sw.min.js')
                    .then(function (tResult) {
                        // SW Registered
                    })
                    .catch(function (cResult) {
                        //console.error(cResult.message);
                    });

            });//First Catch

    } else {
        console.log('[SW] Not Supported');
    }//else

}//()

window.onload = function () {

    Triggers();

    registerSW();
};