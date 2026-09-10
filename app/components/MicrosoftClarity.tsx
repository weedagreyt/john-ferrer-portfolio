import Script from "next/script";

const clarityProjectId = (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "yg2zcjt0u8")
  .trim()
  .replace(/[^a-zA-Z0-9_-]/g, "");

export default function MicrosoftClarity() {
  if (!clarityProjectId) return null;

  return (
    <Script id="microsoft-clarity-loader" strategy="beforeInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityProjectId}");
      `}
    </Script>
  );
}
