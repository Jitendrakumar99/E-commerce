import React from 'react'
import './About.css'
function About() {
return (
	<div className='div'>
		<h1>About Page</h1>
		<p>Welcome to our e-commerce website, similar to Flipkart!</p>
		<div className='reviews'>
			<h2>Customer Reviews</h2>
			<p>Excellent service and fast delivery!</p>
			<p>Great selection of products at affordable prices.</p>
			<p>Highly recommended!</p>
		</div>
		<footer>
			<p>Contact us at info@example.com</p>
			<p>Phone: 123-456-7890</p>
			<p>Email: info@example.com</p>
			<p>Address: 123 Main Street, City, State, Country</p>
		</footer>
	</div>
);
}

export default About
