// @ts-nocheck

'use client';

import { useAppSelector } from '@/app/store/hooks';
import { getUserWishlist, deleteFromWishlist } from '@/app/utils/firebaseDb';
import { useEffect, useState } from 'react';

const WishlistPage = () => {
	const userData = useAppSelector((state) => state.games.userData);

	/* const [wishlist, setWishlist] = useState<
		Record<
			string,
			{ id: string; namespace: string; price: string; thumbnail: string }
		>
	>({}); */
	const [wishlist, setWishlist] = useState({});

	useEffect(() => {
		if (userData) {
			async function getData() {
				getUserWishlist(userData.email).then((response) => {
					return response;
				});
			}
			const data = getData();
			setWishlist(data);
			console.log(wishlist);
		}
	}, [userData]);

	return (
		<>
			{Object.keys(wishlist).map((item) => {
				console.log('sad');
				return <div key={wishlist[item].id}>{wishlist[item].title}a</div>;
			})}
		</>
	);
};

export default WishlistPage;
