import React from 'react';



function Friends(props){
	let first_name = props.userData.user.first_name;
	let last_name = props.userData.user.last_name;
	let userPic = props.userData.user.photo_200_orig;

	let friends = props.userData.friends.map((item)=>{return {first_name: item.first_name, last_name: item.last_name, userPic: item.photo_50, id: item.id }});
	console.log(friends)
	let friendElements = friends.map((item)=>{
		return(
			<li key={item.id} className="friend">
				<figure className="avatar"> <img src={item.userPic} alt={item.first_name}/> </figure>
				<div className="name">
					<span className="first_name">{item.first_name}</span>
					<span className="last_name">{item.last_name}</span>
				</div>
			</li>
			);
	});

		return(
			<div className="content">
				
				<div className="user">
					<figure className="avatar"> <img src={userPic} alt={first_name}/> </figure>
					<div className="name">
						<span className="first_name">{first_name}</span>
						<span className="last_name">{last_name}</span>
					</div>
				</div>

				<ul className="list">{friendElements}</ul>

			</div>
		);
		
	}

export default Friends;
