// src/components/thoughts/thought_box.js

import React from 'react';

class MovementScript extends React.Component {

    findMouse() {
        console.log("looking ...");
        document.addEventListener('mouseover', (e) => {
            let x = e.target;
            x.classList.add("movement", true);
            if (!x.classList.contains("movement")) {
                x.classList.toggle("movement", true);
            }
            setTimeout(() => {
                console.log("removed movement");
                console.log(x.classList);
                x.classList.toggle("movement", false);
            }, 5000)
        });

        console.log("found the mouse");
    }

    componentDidMount() {
        console.log("script loaded");
        this.findMouse();
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default MovementScript;