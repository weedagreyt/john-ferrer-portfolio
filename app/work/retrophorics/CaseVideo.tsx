"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "../../components/UiIcons";
import local from "./retrophorics.module.css";

type Props = {
  src: string;
  alt: string;
  className?: string;
  videoSrc?: string;
  label?: string;
};

export default function CaseVideo({ src, alt, className = "", videoSrc, label }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => {});
  }, [playing]);

  if (playing && videoSrc) {
    return (
      <div className={`${local.videoStill} ${local.noLabel} ${className}`}>
        <video ref={videoRef} src={videoSrc} controls playsInline aria-label={alt} />
      </div>
    );
  }

  if (videoSrc) {
    return (
      <button
        type="button"
        className={`${local.videoStill} ${local.noLabel} ${local.playable} ${className}`}
        onClick={() => setPlaying(true)}
        aria-label={`Play ${alt}`}
      >
        <img src={src} alt="" />
        <span className={local.play} aria-hidden="true"><PlayIcon size={21} /></span>
      </button>
    );
  }

  return (
    <div className={`${local.videoStill} ${className}`}>
      <img src={src} alt={alt} />
      <span className={local.play} aria-hidden="true"><PlayIcon size={21} /></span>
      {label && (
        <div className={local.videoLabel}><b>{label}</b><small>Video will replace this preview</small></div>
      )}
    </div>
  );
}
