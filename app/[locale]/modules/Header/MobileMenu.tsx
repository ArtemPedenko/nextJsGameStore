import { FC } from 'react';
import styled from 'styled-components';
import HeaderButton from './HeaderButton';
import { useI18n } from '@/locales/client';
import IconWrapper from '../../components/IconWrapper';
import LanguageLogo from '@/images/LanguageLogo';
import Divider from '../../components/Divider';
import ProfileLogo from '@/images/ProfileLogo';

const MobileMenuWrapper = styled.div`
	position: absolute;
	right: 0px;
	width: 80vw;
	background-color: #2a2a2a;
	height: 90vh;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: space-between;
	justify-content: space-between;
`;

const MobileMenuTop = styled.div`
	display: flex;
	flex-direction: column;
	height: 180px;
	margin: 0 0 0 10px;
`;

const MobileMenuBottom = styled.div`
	display: flex;
	flex-direction: row;
	height: 50px;
	align-items: center;
`;
const MobileMenuBottomLeft = styled.div`
	width: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MobileMenuBottomRight = styled.div`
	width: 70%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface MobileMenuProps {
	mobiLanguageMenuSwithcer: Function;
}

const MobileMenu: FC<MobileMenuProps> = ({ mobiLanguageMenuSwithcer }) => {
	const t = useI18n();
	return (
		<MobileMenuWrapper>
			<MobileMenuTop>
				<HeaderButton href='/'>{t(`store`)}</HeaderButton>
				<HeaderButton href='/'>{t(`distribution`)}</HeaderButton>
				<HeaderButton href='/'>{t(`support`)}</HeaderButton>
				<HeaderButton href='https://www.unrealengine.com/en-US'>
					UNREAL ENGINE
				</HeaderButton>
			</MobileMenuTop>
			<MobileMenuBottom>
				<MobileMenuBottomLeft onClick={() => mobiLanguageMenuSwithcer()}>
					<IconWrapper
						icon={<LanguageLogo />}
						height='30px'
						width='30px'
						margin='0'
					/>
				</MobileMenuBottomLeft>
				<Divider />
				<MobileMenuBottomRight>
					<IconWrapper
						icon={<ProfileLogo />}
						height='30px'
						width='30px'
						margin='0'
					/>
					<HeaderButton href='./'>{t(`sign_in`)}</HeaderButton>
				</MobileMenuBottomRight>
			</MobileMenuBottom>
		</MobileMenuWrapper>
	);
};

export default MobileMenu;
