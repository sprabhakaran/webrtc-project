import React from "react"

import ViewAreaTop from "./ViewAreaTop"
import ViewAreaBottom from "./ViewAreaBottom"

class ViewArea extends React.Component{
    render(){
        return (
            <div className="view-area">
                <ViewAreaTop />
                <ViewAreaBottom />
            </div>
        )
    }
}

export default ViewArea