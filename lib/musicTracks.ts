export type MusicTrackKey = "menu" | "gameplay" | "victory";

interface MusicTrack {
  /** Path under public/, e.g. public/audio/menu.mp3 -> "/audio/menu.mp3" */
  src: string;
  loop: boolean;
}

// EDIT ME: drop your own audio files into public/audio/ using these exact
// filenames (see public/audio/README.md), or change the paths here to point
// at whatever files you add. Until real files exist, playback silently no-ops.
export const musicTracks: Record<MusicTrackKey, MusicTrack> = {
  menu: { src: "/audio/menu.mp3", loop: true },
  gameplay: { src: "/audio/gameplay.mp3", loop: true },
  victory: { src: "/audio/victory.mp3", loop: false },
};
