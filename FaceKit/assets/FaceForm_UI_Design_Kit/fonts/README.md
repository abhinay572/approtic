# Font package note

This directory intentionally contains no font binaries.

Use Apple’s system typography on iOS:

```swift
Font.system(size: 34, weight: .bold)
```

For web or cross-platform prototypes, use the documented fallback stack:

```css
font-family: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
```

Obtain and license any non-system font directly from its publisher. Do not redistribute Apple font files.
