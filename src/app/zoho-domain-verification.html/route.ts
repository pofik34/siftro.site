import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
  <meta name="zohoverify" content="zoho-verification-code">
</head>
<body>
</body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
} 