import './global.css';

export const metadata = {
  title: 'Nextgen Vendor | Intelligence Dashboard',
  description: 'Manage your futuristic e-commerce operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
