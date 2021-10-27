import React, { Component } from 'react'
import './email.scss'
import '../../image/cloud1.png'

export default class email extends Component {

    hello = () => {
        console.log("hahaha")
        console.log(this.props.history)
        this.props.history.push('/dashboard')
    }

    routeChange = () =>{ 
        
    }


    render() {
        return (
                <div className="email">
                    <div className="left_email">
                        <h1>
                            Enron Email
                        </h1>
                        <p>
                            About This website is designed to summarize Enron's email dataset with approximately 150 users, most of which are Enron's senior users, with a total of approximately 0.5 million messages. We have made this website available for those who are interested in having convenient access to information including being able to study various information in its entirety
                            This website is intended for educational use only.
                            Thank you for information from
                        </p>
                        <p>
                            BY Patinya Soundok & Prawit Janprathak
                        </p>
                        <button className="change_page" onClick={this.hello}>Go to website</button>
                    </div>
                    <div className="right_email">
                        <div className="circle1">
                            <div className="circle2">
                                <div className="circle3">
                                </div>
                            </div>
                        </div>
                        <div className="cloudss">
                            <div className="clouds r">
                                <div className="text2"></div>
                            </div>
                            <div className="clouds t">
                                <div className="text1">
                                </div>                
                            </div>
                            
                        </div>
                    </div>
                </div>
        )
    }
}
