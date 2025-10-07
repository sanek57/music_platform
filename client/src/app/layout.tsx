import StyledJsxRegistry from './registry'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <StyledJsxRegistry>
        <body>{children}</body>
      </StyledJsxRegistry>
    </html>
  )
}
