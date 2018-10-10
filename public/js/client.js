/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';


var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
  var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';


function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}


var onBtnClick = function (t, opts) {
  //console.log('Someone clicked the button');
  
  var data = null;
  var data2 = null;

  var xhr = new XMLHttpRequest();
  var xhr2 = new XMLHttpRequest();
  
  //https://developers.trello.com/reference
  //1d61fd06150c5231bbef8c48723c6089
  //992f55215ccd3eea2c9c9fcfbbbcb95870fb15447202cd6c6f4b5eb863d0d88d

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      data = this.responseText;
      
      var json = JSON.parse(data);
			
	    //alert(json.id);
      
      xhr2.open("POST", "https://api.trello.com/1/cards/"+json.id+"/checklists?name=Tasks&key=1d61fd06150c5231bbef8c48723c6089&token=992f55215ccd3eea2c9c9fcfbbbcb95870fb15447202cd6c6f4b5eb863d0d88d");
      
      xhr2.send(data2);
    }  
  });
  
  
  
  
  
  //makeRequest("POST", "https://api.trello.com/1/cards?due=2018-10-10&idList=5bbce666972d9525b3678b17&key=1d61fd06150c5231bbef8c48723c6089&token=992f55215ccd3eea2c9c9fcfbbbcb95870fb15447202cd6c6f4b5eb863d0d88d")//
//.then(function (datums) {
//  console.log(datums);
//})
//.catch(function (err) {
//  console.error('Augh, there was an error!', err.statusText);
//});
  
  //Today's date

  xhr.open("POST", "https://api.trello.com/1/cards?due=2018-10-10&idList=5bbce666972d9525b3678b17&key=1d61fd06150c5231bbef8c48723c6089&token=992f55215ccd3eea2c9c9fcfbbbcb95870fb15447202cd6c6f4b5eb863d0d88d");

  xhr.send(data)
  //.then(function(a) {console.log(a)});
  
  //xhr.open("POST", "https://api.trello.com/1/cards/???/checklists?name=Tasks&key=1d61fd06150c5231bbef8c48723c6089&token=992f55215ccd3eea2c9c9fcfbbbcb95870fb15447202cd6c6f4b5eb863d0d88d");

};

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	 'card-buttons': function(t, options) {
	 	return [{
     		icon: BLACK_ROCKET_ICON,
	 		  text: 'Estimate Size',
	      callback: function(t) {
	         return t.popup({
	           title: "Estimation",
	           url: 'estimate.html',
	         });
	      }
	 	}];
	 },
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
      return [{
        icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
        text: estimate
      }];  
    });
  },
  'board-buttons': function (t, opts) {
    return [{
      // we can either provide a button that has a callback function
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'Callback',
      callback: onBtnClick,
      condition: 'edit'
    }, {
      // or we can also have a button that is just a simple url
      // clicking it will open a new tab at the provided url
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'URL',
      condition: 'always',
      url: 'https://trello.com/inspiration',
      target: 'Inspiring Boards' // optional target for above url
    }];
  }
});
