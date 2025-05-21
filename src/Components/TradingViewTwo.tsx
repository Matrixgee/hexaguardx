import React, { useEffect, useRef, memo } from 'react';

const TradingViewForexCrossRates: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the script is already present
    if (container.current?.querySelector('script')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "currencies": [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "BTC", // Added BTC
        "ETH", // Added ETH
        "BNB", // Added BNB
        "XRP", // Added XRP
        "ADA", // Added ADA
        "DOGE" // Added DOGE
      ],
      "isTransparent": false,
      "colorTheme": "dark",
      "locale": "en",
      "backgroundColor": "#000000"
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    return () => {
      // Clean up the script when the component unmounts or re-renders
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        {/* <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a> */}
      </div>
    </div>
  );
}

export default memo(TradingViewForexCrossRates);
