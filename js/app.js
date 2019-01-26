
 /*
  Create a list that holds all of your cards
 */
let list=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-cube","fa fa-bolt","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
let shuffleCards=[];
let openCard=[];
let flipCards=0;
let numOfmoves=0;
let credits=0;
let sec=0;
let minutes=0;
let duration;
let rating;
let third = document.querySelector('.third-star');
let second = document.querySelector('.second-star');
document.onload=reset();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) 
{
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


 $('.deck ,.card').on('click','.card',function(event)// if  we click the cards the following code will be executed//
{   

     if($(this).attr('class')==='card' && openCard.length<2)// if openCard array length is lessthan 2 then the below code will be executed//
        {
           if(openCard.length===0)
           {
                    
                    $(this).addClass('open  show card');// here we add the two classes open and show card for open and show the cards//
                    openCard.push($(this).children().attr('class'));// here we push the open cards into openCard array//

            }
                    else if(openCard.length===1) 
                    {
                            $(this).addClass('open show card');
                            openCard.push($(this).children().attr('class'));
                                if(openCard[0]===openCard[1])//if  the two opencards are match //
                                {
                                    $('.card').filter($('.open')).toggleClass('open match');// then we filter the cards which is open and that are matched//
                                    flipCards=flipCards + 2;// we increment the flipcards with 2//
                                    numOfmoves=numOfmoves+1;// we increment the moves with 1//
                                    $('.moves').text(numOfmoves);
                                    console.log(numOfmoves);
                                    openCard=[];
                                    credits+=1;// credits means matching cards ,we increment credits with 1//
                                    $('.score').text(credits);
                                    
                                }
                                else
                                {
                                    function flipBack () // if the two cards are unmatch then the below code will be executed //
                                    {
                                        $('.card').filter($('.open')).attr('class',"card");// then hide the symbol of the  card//
                                        openCard = [];// empty the openCard array//
                                        numOfmoves=numOfmoves+1;
                                        $('.moves').text(numOfmoves);
                                        console.log(numOfmoves);
                                    }
                                    setTimeout(flipBack, 600);// set time for flipback the cards//
                                }
                    }
                    if(numOfmoves===0){
                        clearInterval(duration);
                        sec=0;
                        minutes=0;
                        timer();
                        
                    }
                if (numOfmoves === 11 ) // moves equal to 11,first star colour is change to white//
                {   
                    third.style.visibility='hidden';
                    rating=2;
                    }else if(numOfmoves === 16) {
                       second.style.visibility='hidden';
                       rating=1;
                       }

                   if(credits===8) { 
                       start();                      
                                        
                     swal(
                {
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    title: 'Congratulations! You Won!',
                    text: 'With ' + numOfmoves + ' moves.\n' + minutes + '  minutes.\n' + sec + '   Seconds.\n'+ rating+'   star.\n Woooooo!',
                    type: 'success',
                    button:{
                        text:'PlayAgain!',
                        click:reset()
                    }
                    
                });
                } }
        
        });
      function start()
      {
        clearInterval(duration);
      }  



    $('.restart').on('click',function() {
        reset();
        });
    //code for reset the game//
function reset(){
    openCard=[];
     
     var shuffleCards=shuffle(list);
      $(".card i").each(function(index){
        $(this).attr('class',shuffleCards[index]);
        $('.deck li').attr("class","card");
        numOfmoves=0;
        $('.moves').text(numOfmoves);
        credits=0; 
         }); 
    // clearInterval(duration);
    minutes=0;
    sec=0;
    $("#timer").text(sec);
    $("#min").text(minutes);
    third.style.visibility='visible';
    second.style.visibility='visible';
     

   
}
function timer(){
    duration = setInterval(function(){
    $("#timer").text(sec);
    sec++;
    if(sec==60){
      sec=0;
      minutes++;
      $("#min").text(minutes);
    }
  },1000);
  }  
            // openCard=[];
            // minutes=0;
            // sec=0;
            // $("#timer").text(sec);
            // $("#min").text(minutes);
            // third.style.visibility='visible';
            // second.style.visibility='visible';
            // credits=0;  
            // numOfmoves=0;
             
            

                
    


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */