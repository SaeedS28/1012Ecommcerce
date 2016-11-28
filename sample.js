var bought=19.99;
var total=0;

function updateCallBack(json)
{
  alert(JSON.stringify(json));

}

function purchaseCallBack(json)
{
  alert(JSON.stringify(json));
  if(json[0].number < 1)
  {
    alert("out of stock");
  }
  else
  {
      alert("going to charge $"+json[0].price +" for "+json[0].album);
      access("update collection set number=number-1 where id=" + json[0].id,
            updateCallBack);
  }
}

function purchase(id)
{
//select price,album,number,id from collection where id=" +id, purchaseCallback

    total+=bought;
//    times++;
    alert(total);
    access("select price, album, number, id from collection where id=" + id,
        purchaseCallBack);
}


function selectCallBack(json)
{
    var resultDiv = document.getElementById("result");
    clearChildNodes(resultDiv);
    for(i=0; i<json.length; i++)
    {
      var imgTag = document.createElement("IMG");
      imgTag.setAttribute("height", "100px");
      imgTag.setAttribute("width", "100px");
      imgTag.setAttribute("src", json[i].cover);
      resultDiv.appendChild(imgTag);

      var spanTag = document.createElement("SPAN");
      spanTag.innerHTML = json[i].album + " " + json[i].price + " ";
      resultDiv.appendChild(spanTag);

      var purchaseButton = document.createElement("button")
      purchaseButton.setAttribute("id", json[i].id);
      purchaseButton.setAttribute("onclick", "purchase("+json[i].id+")");
      purchaseButton.innerHTML = "purchase";
      resultDiv.appendChild(purchaseButton);
      resultDiv.appendChild(document.createElement("p"));

     alert (json[i].id);
    }
    alert(JSON.stringify(json));

}

function clearChildNodes(tag)
{
  while (tag.hasChildNodes())
  {
    clearChildNodes(tag.firstChild);
    tag.removeChild(tag.firstChild);
  }
}

function find()
{
  var yearSelection = document.getElementById("year");
  var yearIndex = yearSelection.selectedIndex;
  var artistSelection = document.getElementById("artist");
  var artistIndex = artistSelection.selectedIndex;
  var artistName = artistSelection[artistIndex].text;
  var yearNo = yearSelection[yearIndex].text;
  var query;
  if(yearIndex != 0 && artistIndex == 0)
  {
//select * from collection where artist="Davis, Miles" and year=1959
    query = "select * from collection where year=" + yearNo;
  }
  else if(artistIndex != 0 && yearIndex == 0)
  {
    query = "select * from collection where artist=\"" + artistName +"\"";
  }
  else if(artistIndex != 0 && yearIndex != 0)
  {
    query = "select * from collection where artist=\"" + artistName +
    "\" and year=" + yearNo;
  }
  else
  {
      query = "select * from collection";
  }
  alert ("query=" + query);
  access(query, selectCallBack);
}


function yearCallBack(json)
{
  var selectionDiv = document.getElementById("selection");
  var yearSelect = buildYearPullDown(json);
  selectionDiv.appendChild(yearSelect);
  var findButton = document.createElement("button");
  findButton.setAttribute("id", "find");
  findButton.innerHTML = "find";
  findButton.setAttribute("onclick", "find()");
  selectionDiv.appendChild(findButton);
}
function buildYearPullDown(json)
{
  var selectTag = document.createElement("select");
  selectTag.setAttribute("id", "year");
  var optionTag1 = document.createElement("option");
  optionTag1.innerHTML = "year";
  selectTag.appendChild(optionTag1);
  for(i=0; i<json.length; i++)
  {
    var yearNo = json[i].year;
    var optionTag = document.createElement("option");
    optionTag.setAttribute("id", "year");
    optionTag.innerHTML = yearNo;
    selectTag.appendChild(optionTag);
  }
  return selectTag;
}


function artistCallBack(json)
{
  var output = document.getElementById("output");
  var selectionDiv = document.createElement("div");
  selectionDiv.setAttribute("id", "selection");
  output.appendChild(selectionDiv);
  var artistSelect = buildArtistPullDown(json);
  selectionDiv.appendChild(artistSelect);
  access("select distinct year from collection order by year", yearCallBack);
}
function buildArtistPullDown(json)
{
  var selectTag = document.createElement("select");
  selectTag.setAttribute("id", "artist");
  var optionTag1 = document.createElement("option");
  optionTag1.innerHTML = "<b>Artist</b>";
  selectTag.appendChild(optionTag1);
  for (var i=0; i <json.length; i++)
  {
    var optionTag = document.createElement("option");
    var artistName = json[i].artist;
    optionTag.setAttribute("id", artistName);
    optionTag.innerHTML = artistName;
    selectTag.appendChild(optionTag);
  }
  return selectTag;
}


function go()
{
  access("select distinct artist from collection order by artist", artistCallBack);
}

var ajax;
var acallback=null;

function access(query, callback)
{
  acallback = callback;
  ajax = new XMLHttpRequest();
  ajax.onreadystatechange = ajaxProcess;
  ajax.open("GET", "http://192.168.1.101:8000/sql?query=" + query);//change to your ip
  ajax.send(null) //then go to this http://10.24.220.156:8000/serve/db2/
}

function ajaxProcess()
{
  if((ajax.readyState == 4)&&(ajax.status == 200))
  {
    ajaxCompleted(ajax.responseText)
  }
}

function ajaxCompleted(text)
{
  var output = document.getElementById("output");
  if(acallback != null)
  {
    var data = JSON.parse(text);
    acallback(data);
  }
}


function albums(json)
{
  var o = document.getElementById("output");
  for(var e=0;e<json.length;e++)
  {
    o.innerHTML += json[e].album + "<br>";
  }
}

onload=go;
