import type { CSSProperties } from "react";

type IconProps = {
  className?: string;
  size?: number;
  style?: CSSProperties;
};

export function ArrowIcon({
  className,
  size = 18,
  style,
  diagonal = false,
}: IconProps & { diagonal?: boolean }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      {diagonal ? (
        <>
          <path d="M5 15 15 5" />
          <path d="M8 5h7v7" />
        </>
      ) : (
        <>
          <path d="M3.5 10h12" />
          <path d="m11.5 6 4 4-4 4" />
        </>
      )}
      <style>{`path{stroke:currentColor;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round}`}</style>
    </svg>
  );
}

export function PlayIcon({ className, size = 20, style }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      <path d="M7 5.5 14.5 10 7 14.5Z" fill="currentColor" />
    </svg>
  );
}
