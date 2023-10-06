'use client';

import styled from 'styled-components';

const FooterWrapper = styled.div`
	width: 100%;
	height: 50px;
	background-color: #2a2a2a;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 50px 0 0 0;
`;

export default function Footer() {
	return <FooterWrapper>© Все права защищены</FooterWrapper>;
}
