import React from 'react';
import {Component} from "react"
import  Seagull from './about__pics/seagull.png'

class About extends Component{
    render(){
        return(
            <p><img className="responsive-img" src={Seagull} /> <br/> Lorem Ipsum and stuff...</p>
        )
    }

}

export default About