import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome to Dogs Page</h1>
            <Link to = '/Home'>
                <button>Go Home</button>
            </Link>
        </div>
    )
}