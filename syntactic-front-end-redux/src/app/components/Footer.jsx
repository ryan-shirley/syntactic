import React from "react"
import { Image } from "react-bootstrap"

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
    return (
        <footer>
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/syntactic-iadt-year-4-fb.appspot.com/o/assets%2Flogo-dark.png?alt=media"
                alt="Syntactic"
                className="logo"
            />
            <p>
                <FontAwesomeIcon icon={faCopyright} className="mr-1" />{" "}
                Copyright {new Date().getFullYear()}. Built by{" "}
                <a
                    href="https://ryanshirley.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ryan Shirley
                </a>
            </p>
        </footer>
    )
}

export default Footer
