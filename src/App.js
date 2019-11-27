import React from 'react';
import Reg from './components/reg/reg.js'
import Friends from './components/friends/friends.js'



function App(props) {

	if(props.userData){
		return <Friends userData={props.userData}/>
	}else{
		return <Reg/>
	}
}

export default App;


