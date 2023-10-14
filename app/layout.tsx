import './styles.css';
import StyledComponentsRegistry from './styled-registry';

export const metadata = {
	title: 'Games Store',
	description: 'Games Store',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
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
