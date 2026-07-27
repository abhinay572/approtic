# FaceForm color system

## Brand palette

| Token | Hex | Role |
|---|---:|---|
| Bone background | `#F1EEE8` | Default screen background |
| Surface | `#FFFFFF` | Cards, chips, sheets |
| Ink | `#12151B` | Primary text and matte-black CTA |
| Body gray | `#6E7480` | Supporting copy |
| Subtle line | `#E4E0D8` | Chip borders and dividers |
| Azure accent | `#2F80FF` | One highlighted word, active states, progress |
| Chat glow | `#DCEBFF` | Lower-half radial glow on coach screens |

Azure should remain below roughly 10% of any screen. Functional success, danger, ranking-gold, and skin-data colors are reserved for meaning and should never become decorative brand accents.

## Recommended combinations and contrast

| Combination | Foreground | Background | WCAG contrast |
|---|---:|---:|---:|
| Ink on bone | `#12151B` | `#F1EEE8` | 15.79:1 |
| Body gray on bone | `#6E7480` | `#F1EEE8` | 4.05:1 |
| White on ink | `#FFFFFF` | `#12151B` | 18.28:1 |
| Azure on white | `#2F80FF` | `#FFFFFF` | 3.72:1 |
| White on azure | `#FFFFFF` | `#2F80FF` | 3.72:1 |
| Ink on azure pale | `#12151B` | `#EAF2FF` | 16.23:1 |

`#2F80FF` on white is best for large or semibold text, icons, progress, and borders. Keep small body copy in ink or body gray.
