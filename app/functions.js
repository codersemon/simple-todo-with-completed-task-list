// send data to localStorage 
function sendDataToLS(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

// get data from localStorage 
function getDataFromLS(key){
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else{
        return [];
    }
}