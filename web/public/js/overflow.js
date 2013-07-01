var correctTitleOverflow = function(element){
    while (isOverflowed(element)){
        var fontsize = element.css('font-size');
        var number = parseInt(fontsize.split('px')[0]);
        var newsize = number - 20;
        var newfontsize = "" + newsize + "px"
        element.css({'font-size': newfontsize});
    };
};

var correctOverflow = function(){
    $('.slides .n2e-slide-title h1').each(function(){
        correctTitleOverflow($(this));
    });
};

var isOverflowed = function(element){
    return element[0].scrollHeight > element.height() || element[0].scrollWidth > element.width();
};

