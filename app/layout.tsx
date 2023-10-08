import './styles.css';
import StyledComponentsRegistry from './styled-registry';
import { LanguageProvider } from './LangProvider';
import Header from './[locale]/modules/Header';
import HeaderSticky from './[locale]/modules/HeaderSticky';
import Footer from './[locale]/modules/Footer';

export const metadata = {
	title: 'Games Store',
	description: 'Games Store',
};

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	return (
		<html lang='en'>
			<body>
				<LanguageProvider locale={locale}>
					<StyledComponentsRegistry>
						<Header />
						<HeaderSticky />
						{children}
						<Footer />
					</StyledComponentsRegistry>
				</LanguageProvider>
			</body>
		</html>
	);
}
