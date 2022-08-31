function reverseStr(str){
    var listOfChars = str.split(''); // {'h', 'e', 'l', 'l', 'o'}
    var reverseListOfChars = listOfChars.reverse();
    var reverseStr = reverseListOfChars.join('');
    return reverseStr;
    // return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date){
    var dateStr = { day:'', month:'', year:''};
    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date){
    var listOfPalindromes = getAllDateFormats(date);

    var palindromeFlag = false;
    for(let i =0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            palindromeFlag  = true;
            break;
        }
    }
    return palindromeFlag;
}

//check for leap year
function isLeapYear(year){
    if(year%400 === 0){
        return true
    }
    if(year%100 ===0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

// gets next day
function getNextDate(date){
    var day = date.day + 1; //increase the day
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]; // 0-11
    if(month === 2){ // check for februray
        if(isLeapYear(year)){
            //check for leap year
            if(day > 29){
                day = 1;
                month++; // increment the month 
            }
        }else{
            // not leap year
            if(day > 28){
                day = 1;
                month++; // increment month 
            }
        }
    }
    // check for other months 
    else{ 
        // check if the day exceeds the max day in month
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    // increment the year if month is greater than 12
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

// get next palindrome date
function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormat(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

// gets previous day
function getPreviousDate(date){
    var day = date.day - 1; //increase the day
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]; // 0-11

    if(day === 0){
        month--;
        if(month === 0){
            month = 12;
            day = 31;
            year--;
        }else if(month === 2){
            if(isLeapYear(year)){
                //check for leap year
                day = 29
            }else{
                // not leap year
                day =28
            }
        }else{
            day = daysInMonth[month -1];
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

// get previous palindrome date
function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);
    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormat(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [ctr, previousDate];
}


var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler(){
    
    var bdayStr = dateInputRef.value;

    if(bdayStr != ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day : Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
    }else{
        resultRef.innerText = "Please enter the Date!! ✍️✍️"
    }
    var isPalindrome = checkPalindromeForAllDateFormat(date);
    if(isPalindrome){
        resultRef.innerText = "Yay! Your Birthday is palindrome!! 🥳🥳"
    }else{
        var [ctr1, nextDate] = getNextPalindromeDate(date);
        var [ctr2, prevDate] = getPreviousPalindromeDate(date);
        if(ctr1 > ctr2){
            resultRef.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days. 😔😔`;
        }else{
            resultRef.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days. 😔😔`;
        }
        
    }
}

showBtnRef.addEventListener('click', clickHandler);