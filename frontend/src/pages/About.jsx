import React from "react";
import "../styles/About.css";
import BackButton from "../components/BackArrow";
import "../styles/BackButton.css";

const About = () => {
    return (
        <div className="about-container container-fluid">
            <BackButton />
            <img src="/about-pic.webp" alt="multiple sneakers" />
            <h1> About Stride Select</h1> <br />
            <h2>Mission Statement</h2>
            <p>At Stride Select, our mission is to bring sneaker lovers the best of all worlds — authentic kicks from top brands, all in one seamless, stylish platform.</p>
            <p>We were tired of jumping from store to store trying to find the perfect pair. So we built a space where sneakerheads and brands could meet, showcase, and shop with ease.</p>

            <h2>What Makes Us Different?</h2>
            <p>We're a small but passionate team of sneaker lovers, developers, and brand storytellers who believe style should be accessible and authentic.</p>
            <p>Unlike traditional stores, Stride Select empowers brands with tools to manage their drops, while giving customers a front-row seat to exclusive kicks, all in one hub.</p>
            <p>As we grow, our goal is to continue partnering with bold brands and elevating the sneaker experience for every user. One pair at a time.</p>
        </div>
    )
}

export default About;