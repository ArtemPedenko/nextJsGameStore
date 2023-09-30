'use client';

import { FC, useEffect, useState, useRef } from 'react';

interface gameInfoProps {
	data: any;
	offerData: any;
	productImageData: any;
}

const Logger: FC<gameInfoProps> = ({ data, offerData, productImageData }) => {
	console.log('data');

	console.log(data);

	console.log('offerData');
	console.log(offerData);
	console.log('productImageData');

	console.log(productImageData);
	//console.log(offerData);
	//
	return (
		<>
			{/* {data.data.Catalog.catalogOffer.keyImages.map((item, index) => {
				return (
					<img alt='' key={index} src={item.url} style={{ width: '200px' }} />
				);
			})}
			{data.data.Catalog.catalogOffer.description} */}
		</>
	);
};

export default Logger;
//data.Catalog.catalogOffer.keyImages
