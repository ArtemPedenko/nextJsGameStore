import "./styles.css";
import Link from "next/link";
import StyledComponentsRegistry from "./styled-registry";

export const metadata = {
  title: "Games Store",
  description: "Games Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
