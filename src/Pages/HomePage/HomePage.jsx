import React from 'react';
import { Card } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterestSquare, FaYoutube } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const HomePage = () => {
	return (
		<Card>
			<Card.Body>
				<Card>
					<FaInstagram /> <FaFacebook /> <BsTwitterX /> <FaLinkedin /> <FaPinterestSquare /> <FaYoutube />
				</Card>
				<Card>
					<Card.Title>PIPILOL</Card.Title>
					<Card.Body>

						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam natus aut provident quod laborum repudiandae totam id eos aliquam, soluta culpa! Nisi velit eaque et ad, doloremque facilis temporibus architecto.
					</Card.Body>
				</Card>
				<img
					src="https://blog.millionero.com/wp-content/uploads/2023/08/millionero_uptrending_crypto_market_btc_usd_bullish_signs.jpg"
					className="card-img"
					alt="Main Image"
				/>
			</Card.Body>
		</Card>
	);
};

export default HomePage;
