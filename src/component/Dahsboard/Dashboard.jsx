import React, { Component } from 'react'
import './Dashboard.scss'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer } from 'recharts';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

export default class Dashboard extends Component {

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
            user: null
        }
    }

    async componentDidMount(){
        await axios.get(`http://localhost:80/api/year`).then(async res => {
            const dat = res
            // console.log(dat)
            this.setState({
                data: dat.data,
            })
        })
        document.getElementById("to").checked = true
        var post = {
            most: true,
            choose: 'total_to'
        }
        await axios.post(`http://localhost:80/api/most_sent`,post).then(async res => {
            const dat = res
            // console.log(dat)
            this.setState({
                data_most: dat.data,
            })
        })

        await axios.get(`http://localhost:80/api/sent_inbox`).then(async res => {
            const dat = res
            console.log(dat)
            this.setState({
                data_search: dat.data,
            })
        })

        document.getElementById('father_loader').hidden = true
    }

    year =  async () => {
        this.setState({
            Number: 'Year',
            data: []
        })
        await axios.get(`http://localhost:80/api/year`).then(async res => {
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
        await axios.get(`http://localhost:80/api/month`).then(async res => {
            const dat = res
            // console.log(dat)
            this.setState({
                data: dat.data,
            })
        })
    }

    sorthigh = async () => {
        this.setState({
            sort: 'Hight to Low',
            data_most: []
        })
        var post = {
            most: true,
            choose: this.state.to_check
        }
        await axios.post(`http://localhost:80/api/most_sent`,post).then(async res => {
            const dat = res
            console.log(dat)
            this.setState({
                data_most: dat.data,
            })
        })
    }

    sortlow = async () => {
        this.setState({
            sort: 'Low to Hight',
            data_most: []
        })
        var post = {
            most: false,
            choose: this.state.to_check
        }
        await axios.post(`http://localhost:80/api/most_sent`,post).then(async res => {
            const dat = res
            console.log(dat)
            this.setState({
                data_most: dat.data,
            })
        })
    }

    search = async () => {
        this.setState({
            data_search: []
        })
        var post = {
            userid: this.state.search_input
        }
        await axios.post(`http://localhost:80/api/most_sent_userid`,post).then(async res => {
            const dat = res
            console.log(dat)
            this.setState({
                data_search: dat.data,
            })
        })
    }

    searchinbox = (event) =>{
        this.setState({
            search_input: event.target.value
        })
    }

    radio_from = async (event) => {
            document.getElementById("from").checked = true
            document.getElementById("to").checked = false
            await this.setState({
                to_check: 'total_from',
                data_most: []
            })
            var x
            if (this.state.sort === "Hight to Low") {
                x = true
            }else{
                x = false
            }
            var post = {
                most: x,
                choose: this.state.to_check
            }
            await axios.post(`http://localhost:80/api/most_sent`,post).then(async res => {
                const dat = res
                console.log(dat)
                this.setState({
                    data_most: dat.data,
                })
            })
    }

    radio_to = async () => {
            document.getElementById("from").checked = false
            document.getElementById("to").checked = true
            await this.setState({
                to_check: 'total_to',
                data_most: []
            })
            var x
            if (this.state.sort === "Hight to Low") {
                x = true
            }else{
                x = false
            }
            var post = {
                most: x,
                choose: this.state.to_check
            }
            await axios.post(`http://localhost:80/api/most_sent`,post).then(async res => {
                const dat = res
                console.log(dat)
                this.setState({
                    data_most: dat.data,
                })
            })
    }

    onConfirmClick = (event) => {
        localStorage.setItem('user',event.target.value)
        if (event.target.value) {
            this.props.history.push('/user')
        }
        
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
                    <div className="left">
                        <div className="Number_of_email">
                            <div className="top_number_email">
                                <p>Number of Email</p>
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
                                        <Line type="monotone" dataKey="number" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="top_all">
                            <div className="top_number_email">
                                <p>Top 10 Email</p>
                            </div>
                            <div className="center_chart i">
                                <div className="joy">
                                    <div>
                                        <input type="radio" id="to" value="total_to" onClick={this.radio_to}/>
                                        <label style={{marginLeft: "2px"}} for="vehicle1">total_to</label>
                                    </div>
                                    <p>,</p>
                                    <div>
                                        <input type="radio" id="from" value="total_from" onClick={this.radio_from}/>
                                        <label style={{marginLeft: "2px"}} for="vehicle2">total_from</label>
                                    </div>
                                    
                                </div>
                                
                                <div className="hon">
                                    
                                    <p className="bon">SORT: </p>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.sort}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" onClick={this.sorthigh}>Hight to Low</a>
                                            <a class="dropdown-item" onClick={this.sortlow}>Low to hight</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="most_show i">
                                    <p >No.</p>
                                    <p>User_ID</p>
                                    <p style={{marginRight:"7%"}}>total_to</p>
                            </div>
                            <div className="line_top10">

                            </div>
                            <div className="chart_dashboard">
                                {this.state.data_most.map((item,index)=>{
                                    return <div className={index%2 === 0 ? "most_show black":"most_show white"}>
                                        <p className="left_hand">{index + 1}</p>
                                        <p>{item.User_ID}</p>
                                        <p>{item.total}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="se">
                            <input className="search_input" type="search" id="search_user" onChange={this.searchinbox} placeholder="Search Users" />
                            <button className="button_search" onClick={this.search}></button>
                        </div>
                        <div className="search">
                            <div className="sent_inbox">
                                <p>SENT & INBOX</p>
                            </div>
                            <div className="inbox">
                                <div className="little_inbox">
                                    <p style={{width: "33%"}}>User</p>
                                    <div className="lit_inbox">
                                        <p>Sentbox</p>
                                        <p>Inbox</p>
                                    </div>
                                    <div className="div_button_search_inbox i">
                                                <button className="button_search_inbox"></button>
                                    </div>
                                </div>
                                <div className="cha">
                                    {this.state.data_search.map((item,index)=>{
                                        return <div className={index%2 === 0 ? "most_show_o black":"most_show_o white"}>
                                            <p style={{width: "33%"}}>{item.User_ID}</p>
                                            <div className="lit_inbox_o">
                                                <p>{item.total_to}</p>
                                                <p>{item.total_from}</p>
                                                
                                            </div>
                                            <div className="div_button_search_inbox">
                                                <button className="button_search_inbox" value={item.User_ID} onClick={this.onConfirmClick}>more</button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
