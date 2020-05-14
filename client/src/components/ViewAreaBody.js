import React from "react"

class ViewAreaBody extends React.Component{
    render(){
        return (
            <div className="view-area-body">
                 <div className="day-break">
                        16th January 2019
                </div>
                <div className="local-conv">
                    Hey?
                    <div className="conv-ts">9:16PM</div>
                </div>
                <div className="remote-conv">
                    Yes, What's up?
                    <div className="conv-ts">9:16PM</div>
                </div>
                <div className="local-conv">
                    How do i compile postgres from source?
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="remote-conv">
                    Download the source
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="remote-conv">
                   use configure and then make 
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="local-conv">
                    okay
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="remote-conv">
                   make sure you have the deps installed
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="local-conv">
                    alight
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="local-conv">
                    will ping if i have more quries
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="remote-conv">
                    sure
                    <div className="conv-ts">9:16PM</div>
                </div>
                <div className="day-break">
                        16th January 2019
                </div>

                <div className="local-conv">
                    It works buddy, Thanks, Is the process same for linux and mac
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="remote-conv">
                    You're welcome, yes. To make the build lighter, don't install extras
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="local-conv">
                   What extras?
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="remote-conv">
                    Manual and other docs, run make and not make world
                    <div className="conv-ts">9:16PM</div>
                </div>

                <div className="local-conv">
                  okay. Will do.
                    <div className="conv-ts">9:16PM</div>
                </div>
                
            </div>
        )
    }
}

export default ViewAreaBody