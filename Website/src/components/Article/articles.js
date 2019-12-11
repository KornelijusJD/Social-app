import React, { Component } from 'react';
import './article.css';

class Articles extends Component {

    render() {
        const dataObj = this.props.data;
        var data = [];
        for(var key in dataObj) {
            data.push(dataObj[key]);
        }
        if(!!data&&data.length>0) {
            return(
                data.map((data, i) =>
                <div key={i}>
                    <h2>{data.title}</h2>
                    <img src={data.base64} alt="" className={"image_limit"}></img>
                    <p className={"article_text"}>{data.body}</p>
                </div>
                )
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }
}

export default Articles;