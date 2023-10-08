'use client';

import styled from 'styled-components';
import { FC } from 'react';

interface StyledButtonProps {
	$contained?: any;
}

const StyledButton = styled.button<StyledButtonProps>((props) => ({
	border: props.$contained ? 'none' : '1px solid #ffffff',
	borderRadius: '4px',
	height: '50px',
	width: '100%',
	background: props.$contained ? '#ffffff' : 'none',
	color: props.$contained ? 'black' : 'white',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: '#ffffff',
		opacity: '0.9',
		color: 'black',
	},
}));

interface ButtonProps {
	children: string;
	$contained?: any;
}

const Button: FC<ButtonProps> = ({ children, $contained }) => {
	return <StyledButton $contained={$contained}>{children}</StyledButton>;
};

export default Button;
