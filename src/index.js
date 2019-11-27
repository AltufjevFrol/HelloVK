import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let userData={};

window.setUser = function (result, data=userData){
	if(result.response){
		data.user=result.response[0];
		if(userData.friends){
			console.log(JSON.stringify(userData));
			ReactDOM.render(<App userData={userData}/>, document.getElementById('root'));
			
		}
	}else{
		console.log('Что то с данными user');
		ReactDOM.render(<App userData={null}/>, document.getElementById('root'));
		
	}
}

window.setFriends = function (result, data=userData){
	if(result.response){
		data.friends=result.response.items;
		if(userData.user){
			console.log(JSON.stringify(userData));
			ReactDOM.render(<App userData={userData}/>, document.getElementById('root'));
			
		}
	}else{
		console.log('Что то с данными friends')
		ReactDOM.render(<App userData={null}/>, document.getElementById('root'));
		
	}
}

function getAutorizationData(){
	let token;
	let userID;

	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	function setCookie(name, value, options = {}) {
		let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}
		document.cookie = updatedCookie;
	}/*setCookie('token', token, {path: '/', 'max-age': 604800})*/

	if(document.location.hash){
		token = document.location.hash.slice(document.location.hash.indexOf('=')+1, document.location.hash.indexOf('&'));
		userID = document.location.hash.slice(document.location.hash.indexOf('_id=')+4);
		setCookie('token', token, {path: '/', 'max-age': 604800});
		setCookie('userID', userID, {path: '/', 'max-age': 604800});
	}else if(document.cookie.includes('token')){
		token = getCookie('token');
		userID = getCookie('userID');
	}
	if(token && userID){
		return {token: token, userID: userID};
	}else return null;
	
}

function getUserData(autorizationData=getAutorizationData()){
	function getUserData(){
		let script = document.createElement('SCRIPT');
		script.src = `https://api.vk.com/method/users.get?v=5.52&fields=photo_200_orig&access_token=${autorizationData.token}&callback=setUser`;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	function getFriendsData(){
		let script = document.createElement('SCRIPT');
		script.src = `https://api.vk.com/method/friends.get?v=5.52&order=random&count=5&fields=photo_50&access_token=${autorizationData.token}&callback=setFriends`;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	if(autorizationData){
		getUserData();
		getFriendsData();
		console.log('запросили ВК')
	}else{
		console.log('Авторизаци нет надо бы авторизоваться');
		ReactDOM.render(<App userData={null}/>, document.getElementById('root'));
		
	}

}


getUserData();


/*ReactDOM.render(<App userData=''/>, document.getElementById('root'));
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
