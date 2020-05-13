import React from "react"

import ViewAreaTop from "./ViewAreaTop"
import ViewAreaBottom from "./ViewAreaBottom"

class ViewArea extends React.Component{
    render(){
        return (
            <div className="view-area">
                <ViewAreaTop selectedContact={this.props.selectedContact} />
                <ViewAreaBottom />
            </div>
        )
    }
}

export default ViewArea