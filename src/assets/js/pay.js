export default function credit() {

    $('.radio-group .radio').on("click",function(){
        $('.radio').addClass('gray');
        $(this).removeClass('gray');
    });
    
    }