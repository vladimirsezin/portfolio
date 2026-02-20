$(document).ready(function () {
    $('.slide-one').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
});

$(document).ready(function () {
    $('.slide-two').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: false
    });
});

function openContactModal(imageUrl) {
    var modal = document.getElementById('contactModal');
    var modalImage = modal.querySelector('.modal__image');
    modalImage.src = imageUrl;
    modal.style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}