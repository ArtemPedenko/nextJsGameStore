// @ts-nocheck
'use client';

//import { FC, useEffect, useState, useRef } from "react";
import { FC } from 'react';

interface gameInfoProps {
	data?: any;
	offerData?: any;
	productImageData?: any;
}

const Logger: FC<gameInfoProps> = ({ data }) => {
	console.log('data');
	console.log(data);

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
