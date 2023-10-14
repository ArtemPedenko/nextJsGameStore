import './styles.css';
import StyledComponentsRegistry from './styled-registry';

export const metadata = {
	title: 'Games Store',
	description: 'Games Store',
	initialScale: '1',
	maximumScale: '1',
	content: 'device-width',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
