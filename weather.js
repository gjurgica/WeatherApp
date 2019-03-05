let textBtn = document.getElementById("text");
let infoBtn = document.getElementById("info");
let firstLink = document.getElementById("first");
let secondLink = document.getElementById("second");
let main1 = document.getElementById("container1");
let main2 = document.getElementById("container2");
let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let avergeT = document.getElementById("avergeT");
let highestT = document.getElementById("highestT");
let lowestT = document.getElementById("lowestT");
let avergeH = document.getElementById("avergeH");
let highestH = document.getElementById("highestH");
let lowestH = document.getElementById("lowestH");
let coldestD = document.getElementById("coldestT");
let warmestD = document.getElementById("warmestT");
let tableB = document.getElementById("tableB");
let weather;
main1.style.display = "none";

function averge1(element,response){
    element.innerHTML = "";
    let temp = response.list.reduce((sum, el) => sum += el.main.temp, 0);
    temp = temp / response.list.length;

    element.innerHTML += "<h1>Temperature</h1>" + "Averge: " + temp;
}

function highest1(element,response){
    element.innerHTML = "";
    let high = response.list.map(elem => elem.main.temp_max)
    .sort(function(a,b){
        return b - a;
    });
    element.innerHTML += "Highest: " + high[0];
}

function lowest1(element,response){
    element.innerHTML = "";
    let low = response.list.map(elem => elem.main.temp_min)
    .sort(function(a,b){
        return a - b;
    });
    element.innerHTML += "Lowest: " + low[0];
}

function averge2(element,response){
    element.innerHTML = "";
    let hum = response.list.reduce((sum, el) => sum += el.main.humidity, 0);
    hum = hum / response.list.length;

    element.innerHTML += "<h1>Humidity</h1>" + "Averge: " + hum;
}

function highest2(element,response){
    element.innerHTML = "";
    let high = response.list.map(elem => elem.main.humidity)
    .sort(function(a,b){
        return b - a;
    });
    element.innerHTML += "Highest:" + high[0];
}

function lowest2(element,response){
    element.innerHTML = "";
    let low = response.list.map(elem => elem.main.humidity)
    .sort(function(a,b){
        return a - b;
    });
    element.innerHTML += "Lowest:" + low[0];
}

function warmest(element,response){
    element.innerHTML = "";
    let high = response.list
    .sort(function(a,b){
        return b.main.temp_max - a.main.temp_max;
    });
    element.innerHTML = "<h1>Warmest Time</h1>" +  high[0].dt_txt;
}

function coldest(element,response){
    element.innerHTML = "";
    let low = response.list
    .sort(function(a,b){
        return a.main.temp_max - b.main.temp_max;
    });
    element.innerHTML = "<h1>Coldest Time</h1>" +  low[0].dt_txt;
}

function oneRow(element,response){
    let weather1 = response.weather.map(list => list.description);
    let icon = response.weather.map(list => list.icon);
    element.innerHTML += `<tr>
    <td><img src="http://openweathermap.org/img/w/${icon}.png"/></td>
    <td>${weather1}</td>
    <td>${response.dt_txt}</td>
    <td>${response.main.temp}</td>
    <td>${response.main.humidity}</td>
    <td>${response.wind.speed}</td>
    </tr>`;
}

function generateTable(weather){
    for(let weth of weather.list){
         oneRow(tableB,weth);
    }
}

function getInfo(){
    let getData = new XMLHttpRequest();
    getData.onload = function(){
        if(getData.status>=200 && getData.status<300){
            weather = JSON.parse(getData.response);
            tableB.innerHTML = "";
            generateTable(weather);
            averge1(avergeT,weather);
            highest1(highestT,weather);
            lowest1(lowestT,weather);
            averge2(avergeH,weather);
            highest2(highestH,weather);
            lowest2(lowestH,weather);
            warmest(warmestD,weather);
            coldest(coldestD,weather);
            console.log(weather)
        }else{
            console.log(getData.responseText);

        }
    }
    getData.open("GET",`https://api.openweathermap.org/data/2.5/forecast?q=${textBtn.value}&units=metric&APPID=3283a1213917013dbf40922dd48c7e35`);
    getData.send();
}

infoBtn.addEventListener("click",function(){
    getInfo();
});

firstLink.addEventListener("click",function(){
    main1.style.display = "block";
    main2.style.display = "none";
});

secondLink.addEventListener("click",function(){
    main1.style.display = "none";
    main2.style.display = "block";
})