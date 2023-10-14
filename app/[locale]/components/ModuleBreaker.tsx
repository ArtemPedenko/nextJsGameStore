// @ts-nocheck
'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { FC, useEffect, useState, useRef } from 'react';
import { useI18n } from '@/locales/client';
import { v4 as uuid } from 'uuid';

const Wrapper = styled.div`
	max-width: 1427px;
	width: 90%;
	height: 450px;
	display: flex;
	flex-direction: row;
	margin: 30px auto;
	justify-content: space-between;
	@media (max-width: 1540px) {
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
`;

const ModuleBreakerItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-top: 15px;
`;

interface ModuleBreakerProps {
	data: any;
}

const ModuleBreaker: FC<ModuleBreakerProps> = ({ data }) => {
	const t = useI18n();
	return (
		<Wrapper>
			{data.modules.map((item, index) => {
				return (
					<ModuleBreakerItem key={uuid()}>
						<img
							alt=''
							src={item.image.src}
							style={{
								width: '100%',
								objectFit: 'cover',
							}}
						/>
						<div> {item.title}</div>
					</ModuleBreakerItem>
				);
			})}
		</Wrapper>
	);
};

export default ModuleBreaker;
