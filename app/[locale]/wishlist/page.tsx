// @ts-nocheck

'use client';

import { useAppSelector } from '@/app/store/hooks';
import { getUserWishlist, deleteFromWishlist } from '@/app/utils/firebaseDb';
import { useEffect, useState } from 'react';

const WishlistPage = () => {
	const userData = useAppSelector((state) => state.games.userData);

	const [wishlist, setWishlist] = useState<
		Record<
			string,
			{ id: string; namespace: string; price: string; thumbnail: string }
		>
	>({});

	useEffect(() => {
		/* let gamesArray: any[] = [];
		async function getWishlistData(
			id: string,
			namespace: string,
			index: number
		) {
			fetch(`/en/api/wishlist?id=${id}&namespace=${namespace}`)
				.then(function (serverPromise) {
					serverPromise.json().then((data) => {
						//gamesArray.push(data.data.Catalog.catalogOffer);
						//gamesArray[index] = data.data.Catalog.catalogOffer;
						setWishListData([...wishlistData, data.data.Catalog.catalogOffer]);
					});
				})
				.catch(function (e) {
					console.log(e);
				});
		} */
		getUserWishlist(userData.email).then((response) => {
			if (response) {
				setWishlist(response);
				//console.log(response);
				console.log(response);
				console.log(wishlist);
				/* Object.keys(response).map((item: string, index: number) => {
					getWishlistData(response[item].id, response[item].namespace, index);
				}); */
				//setWishListData(gamesArray);
			}
		});
	}, [userData]);

	return (
		<>
			<div></div>
		</>
	);
};

export default WishlistPage;
