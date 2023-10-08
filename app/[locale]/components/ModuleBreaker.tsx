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
	margin: 15px auto;
	border: 1px solid red;
	justify-content: space-between;
	@media (max-width: 1540px) {
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
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
					<div
						key={uuid()}
						style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
					>
						<img
							alt=''
							src={item.image.src}
							style={{
								height: '350px',
								width: `${
									(1427 - data.modules.length * 20) / data.modules.length + 'px'
								}`,
								objectFit: 'cover',
							}}
						/>
						{item.title}
					</div>
				);
			})}
		</Wrapper>
	);
};

export default ModuleBreaker;
