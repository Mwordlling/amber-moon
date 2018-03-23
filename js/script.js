var ts = new TwoStep({
    elements: document.querySelectorAll('.parent .narrative-item'),
    onChange: function(event) {

    },
    stick: document.querySelector('.parent .sticky-outer'),
    narrative: [
        function(event) {
            $('.parent .chart').html('<video src="video/video4.mp4" autoplay="autoplay" loop="no-loop" controls="controls" poster="img/loading_icon.gif"></video>');
        }
    ],
    offset: {
        up: '100%',
        down: '100%'
    }
});




