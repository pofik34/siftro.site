import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ 
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 7.5C17.5 4.5 15 3 12 3C9 3 6.5 4.5 6.5 7.5C6.5 10.5 9 11.5 12 12C15 12.5 17.5 13.5 17.5 16.5C17.5 19.5 15 21 12 21C9 21 6.5 19.5 6.5 16.5"
            stroke="#2563EB"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
} 