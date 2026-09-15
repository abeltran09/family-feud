# Music files

Drop audio files here with these exact names and the game will pick them up
automatically — no code changes needed:

| File            | Used for                                  | Loops |
| ---------------- | ------------------------------------------ | ----- |
| `menu.mp3`        | Menu/lobby screen                          | Yes   |
| `gameplay.mp3`     | During rounds                              | Yes   |
| `victory.mp3`      | End screen, when the winner is announced   | No    |

MP3 is recommended for the broadest browser support. If you want a different
format or filenames, edit `lib/musicTracks.ts`.

Until you add files here, the game runs fine with no background music — the
player just silently fails to find a source.

## Where to find music

If you don't have tracks picked out yet, royalty-free/CC0 options are easy to
find on sites like Pixabay Audio, the YouTube Audio Library, or Free Music
Archive — search there for something upbeat for gameplay and a short fanfare
for the victory screen. Always check a track's specific license before using
it, even from a "free music" site.
