import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        this.loadData()
    }

    componentDidUpdate () {
        this.loadData()
    }

    deletePostHandler = () => {
        axios.delete("/posts/" + this.props.match.params.id)
            .then(response => {
                console.log("[DeletePost]  ", response)
            });
    }

    loadData () {
        console.log("[FullPost]", this.props);
        const id = this.props.match.params.id;
        if(id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +id)) {
                axios.get("/posts/"+id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                        console.log("[FullPost] Received ", response)
                    });
            }
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id ) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;