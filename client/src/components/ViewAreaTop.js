import React from "react"

import Button from "./Button"

class ViewAreaTop extends React.Component{

    render(){

        

        return (
            <div className="view-area-top">
               <div className="profile-picture-box"> <img src="https://via.placeholder.com/256"/> </div>
               <div className="profile-contents-box">
                   <div className="headline-1">Alex Albon</div> 
                   <div className="headline-2">alex.albon@redbullracing.com</div>
                   <div>Last seen 2h back</div>
                   <Button act="video-call" />
                   <Button act="audio-call" />
                   <Button act="chat" />
                   <div><a>remove connection</a></div>
                   </div>
               <div className="top-right-box"> <a href="#">Settings</a>  <a href="#">Logout</a> </div>
            </div>
        )
    }
}

export default ViewAreaTop