import React from 'react'

const Rectangle = () => {
  return (
        <svg className='glowing-shape' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
            <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="nnneon-grad">
                    <stop stop-color="rgb(37, 230, 204)" stop-opacity="1" offset="0%"></stop>
                    <stop stop-color="rgb(37, 230, 204)" stop-opacity="1" offset="100%"></stop>
                </linearGradient>
                <filter id="nnneon-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feGaussianBlur stdDeviation="17 8" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
                <filter id="nnneon-filter2" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feGaussianBlur stdDeviation="45 17" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
            </defs>
            <g stroke-width="21.5" stroke="url(#nnneon-grad)" fill="none">
                <rect width="412" height="412" x="194" y="194" filter="url(#nnneon-filter)" rx="0" ry="0"></rect>
                <rect width="412" height="412" x="206" y="194" filter="url(#nnneon-filter2)" opacity="0.25" rx="0" ry="0"></rect>
                <rect width="412" height="412" x="182" y="194" filter="url(#nnneon-filter2)" opacity="0.25" rx="0" ry="0"></rect>
                <rect width="412" height="412" x="194" y="194" rx="0" ry="0"></rect>
            </g>
        </svg>
  )
}

export default Rectangle