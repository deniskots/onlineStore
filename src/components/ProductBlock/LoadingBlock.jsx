import React from "react"
import ContentLoader from "react-content-loader"

const LoadingBlock = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="132" cy="128" r="126" />
        <rect x="158" y="306" rx="0" ry="0" width="1" height="1" />
        <rect x="-3" y="271" rx="3" ry="3" width="280" height="26" />
        <rect x="-3" y="317" rx="5" ry="5" width="280" height="84" />
        <rect x="1" y="425" rx="5" ry="5" width="83" height="29" />
        <rect x="150" y="411" rx="21" ry="21" width="125" height="45" />
    </ContentLoader>
)

export default LoadingBlock;
