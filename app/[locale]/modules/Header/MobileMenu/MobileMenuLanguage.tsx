import { FC } from 'react';
import styled from 'styled-components';
import { useI18n } from '@/locales/client';

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

const MobileLanguageMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 25px;
`;

const MobileLanguageMenuItem = styled.div`
	height: 35px;
	width: 100%;
	border-top: 1px solid #8e8e8e;
	border-bottom: 1px solid #8e8e8e;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface MobileMenuProps {
	mobiLanguageMenuSwithcer: Function;
	currentLocale: string;
	changeLocale: Function;
}

const MobileMenuLanguage: FC<MobileMenuProps> = ({
	mobiLanguageMenuSwithcer,
	currentLocale,
	changeLocale,
}) => {
	const t = useI18n();
	return (
		<MobileMenuWrapper>
			<div>
				{currentLocale === 'ru' ? (
					<MobileLanguageMenu>
						<MobileLanguageMenuItem onClick={() => mobiLanguageMenuSwithcer()}>
							РУССКИЙ
						</MobileLanguageMenuItem>
						<MobileLanguageMenuItem onClick={() => changeLocale('en')}>
							ENGLISH
						</MobileLanguageMenuItem>
					</MobileLanguageMenu>
				) : (
					<MobileLanguageMenu>
						<MobileLanguageMenuItem onClick={() => mobiLanguageMenuSwithcer()}>
							ENGLISH
						</MobileLanguageMenuItem>
						<MobileLanguageMenuItem onClick={() => changeLocale('ru')}>
							РУССКИЙ
						</MobileLanguageMenuItem>
					</MobileLanguageMenu>
				)}
			</div>
		</MobileMenuWrapper>
	);
};

export default MobileMenuLanguage;
