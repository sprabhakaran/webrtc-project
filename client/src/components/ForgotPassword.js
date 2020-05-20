import React from "react"

class SingupPage extends React.Component {

    render() {
        return (
            <div className="sign-up-page">
                    <div className="sign-up-box">
                        <form>
                            <h3>Reset Password</h3>
                            <div>
                                <input placeholder="Email Address"></input>
                            </div>
                            <div className="right-align">
                                <button>Reset</button>
                            </div>
                            <div className="right-align">
                                <a href="#">back to login</a>
                            </div>
                        </form>
                    </div>             
            </div>
        )
    }
}


export default SingupPage