"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { onDuckRequest } from "@/lib/musicBus";
import { musicTracks, type MusicTrackKey } from "@/lib/musicTracks";

const VOLUME_KEY = "family-feud:music-volume";
const MUTED_KEY = "family-feud:music-muted";
const DUCK_FACTOR = 0.35;
const DUCK_MS = 450;

function readNumber(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : Number(raw);
  } catch {
    return fallback;
  }
}

function readBool(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : raw === "true";
  } catch {
    return fallback;
  }
}

export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentKeyRef = useRef<MusicTrackKey | null>(null);
  const pendingKeyRef = useRef<MusicTrackKey | null>(null);
  const duckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted, setMuted] = useState(() => readBool(MUTED_KEY, false));
  const [volume, setVolumeState] = useState(() => readNumber(VOLUME_KEY, 0.5));

  // Create the shared <audio> element once.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Keep the element's volume in sync, and persist the user's preference.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
    try {
      window.localStorage.setItem(VOLUME_KEY, String(volume));
      window.localStorage.setItem(MUTED_KEY, String(muted));
    } catch {
      // Private browsing or storage disabled — non-fatal, just don't persist.
    }
  }, [muted, volume]);

  // Browsers block autoplay-with-sound until a user gesture. If play() was
  // rejected, retry on the first click/keypress anywhere on the page.
  useEffect(() => {
    function retry() {
      if (pendingKeyRef.current) {
        audioRef.current?.play().catch(() => {});
      }
    }
    window.addEventListener("pointerdown", retry);
    window.addEventListener("keydown", retry);
    return () => {
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
    };
  }, []);

  // Briefly lower music volume when a sound effect (ding/buzz/award) fires.
  useEffect(() => {
    return onDuckRequest(() => {
      const audio = audioRef.current;
      if (!audio) return;
      if (duckTimeoutRef.current) clearTimeout(duckTimeoutRef.current);
      audio.volume = muted ? 0 : volume * DUCK_FACTOR;
      duckTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
      }, DUCK_MS);
    });
  }, [muted, volume]);

  const play = useCallback(
    (key: MusicTrackKey) => {
      const audio = audioRef.current;
      if (!audio) return;
      const track = musicTracks[key];
      if (currentKeyRef.current !== key) {
        audio.src = track.src;
        audio.loop = track.loop;
        currentKeyRef.current = key;
      }
      audio.volume = muted ? 0 : volume;
      pendingKeyRef.current = key;
      audio.play().catch(() => {
        // Autoplay blocked, or the file doesn't exist yet — retried on the
        // next user gesture; otherwise silently does nothing.
      });
    },
    [muted, volume],
  );

  const stop = useCallback(() => {
    audioRef.current?.pause();
    pendingKeyRef.current = null;
  }, []);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);
  const setVolume = useCallback(
    (v: number) => setVolumeState(Math.min(1, Math.max(0, v))),
    [],
  );

  return { play, stop, muted, volume, toggleMute, setVolume };
}

export type UseMusicReturn = ReturnType<typeof useMusic>;
