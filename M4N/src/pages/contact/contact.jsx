import React from "react";
import "./Contact.css";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has been sent!");
    };

    return (
        <div className="contact-container">
            <h1>Let's Get in Touch</h1>
                <p>Have a question or just want to say hi? Fill the form below 👋</p>
            <div className="contact-content">
                <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="send-btn">
                            Send Message
                        </button>
                    </form>
                    <div className="contact-info">
                        <h2>Contact Info</h2>
                        <p>Email: mohd.sabour9@gmail.com</p>
                        <p>Phone: +967 778875450</p>
                        <p>Location: Yemen, Sana’a</p>
                    </div>
                </div>
        </div>
    );
};