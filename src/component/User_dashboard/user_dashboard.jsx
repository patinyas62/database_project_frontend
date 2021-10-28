import React, { Component } from 'react'
import './user_dashboard.scss'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer } from 'recharts';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

export default class user_dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            data_most: [],
            data_search: [],
            Number: 'Year',
            Most: 'Year',
            sort: 'Hight to Low',
            to_check: 'total_to',
            total: []
        }
    }

    async componentDidMount(){
        console.log(localStorage.getItem('user'))
        this.setState({
            user: localStorage.getItem('user')
        })
        await axios.post(`http://34.87.164.128/api/to_inbox_user_year`,{user: localStorage.getItem('user')}).then(async res => {
            const dat = res
            var i = []
            console.log(dat.data)
            i.push(dat.data[3].total_from)
            i.push(dat.data[3].total_to)
            this.setState({
                data: dat.data,
                total: i
            })
        })

        document.getElementById('father_loader').hidden = true
    }

    year =  async () => {
        this.setState({
            Number: 'Year',
            data: []
        })
        await axios.post(`http://34.87.164.128/api/to_inbox_user_year`,{user: localStorage.getItem('user')}).then(async res => {
            const dat = res
            // console.log(dat)
            this.setState({
                data: dat.data,
            })
        })
    }

    month = async () => {
        this.setState({
            Number: 'Month of 2001',
            data: []
        })
        await axios.post(`http://34.87.164.128/api/month_inbox_user`,{user: this.state.user}).then(async res => {
            const dat = res
            console.log(dat)
            this.setState({
                data: dat.data,
            })
        })
    }  

    render() {
        return (
            <div>
            <Navbar />
            <div id="father_loader" className="father_loader">
                <div class="loader"></div>
            </div>
            
            <div className="back">
                <div className="circle1 das">
                    <div className="circle2 das">
                        <div className="circle3 das">

                        </div>
                    </div>
                </div>
                <div className="circle1 das two">
                    <div className="circle2 das two">
                        <div className="circle3 das two">

                        </div>
                    </div>
                </div>
                {/* <div>
                    <h1 className="h1">Dashboard of Enron Email</h1>
                </div> */}
                <div className="bg">
                    <div className="left user">
                        <div className="NameUser">
                            <p>{this.state.user}</p>
                        </div>
                        <div className="Number_of_email">
                            <div className="top_number_email">
                                <p>Number of Email sent and inbox</p>
                            </div>
                            <div className="center_chart">
                                <div style={{display: 'flex',width: '5vw',justifyContent: "space-between"}}>
                                    <p className="bon">BY: </p>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.Number}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" onClick={this.year}>Year</a>
                                            <a class="dropdown-item" onClick={this.month}>Month</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chart_dashboard">
                                <ResponsiveContainer>
                                    <LineChart data={this.state.data} margin={{ top: 10, right: 0, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="sent" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="inbox" stroke="#82ca9d" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                    </div>
                    <div className="right">
                        <div className="NameUser bot">
                            <p>{this.state.user}</p>
                        </div>
                        <div className="to_from_user">
                                <div className="top_user">
                                    <p>Total_TO</p>
                                    <p>{this.state.total[0]}</p>
                                </div>
                                <div className="bot_user">
                                    <p>Total_FROM</p>
                                    <p>{this.state.total[1]}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
