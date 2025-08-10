export const config = { amp: true };

export default function AmpPage() {
  return (
    <>
      <head>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </head>
      <body>
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-3810051236937370"
        ></amp-auto-ads>
      </body>
    </>
  );
}
