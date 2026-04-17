
The user wants the Lucas image in the Hero enlarged to match the reference mockup, where he occupies roughly the right half of the viewport and extends from near the top of the hero down to the bottom — much larger than the current `max-h-[600px]`.

Looking at current `Hero.tsx`:
- Image container: `md:w-[55%] lg:w-[58%]` with `items-end`
- Image: `max-h-[600px] object-contain object-bottom`
- Text column: `md:w-[50%] md:pb-[80px]`

In the reference, the figure is bold and tall, roughly full-height of the hero section, anchored bottom-right, slightly overlapping the text column's right edge.

## Plan

**File:** `src/components/Hero.tsx`

1. **Enlarge the image** — replace `max-h-[600px]` with a viewport-based height so it scales with the hero:
   - `h-[85vh] max-h-[780px]` (or similar) instead of `max-h-[600px]`
   - Keep `object-contain object-bottom` so it stays anchored to the floor

2. **Widen the right column** slightly and allow overflow toward the text side:
   - Change `md:w-[55%] lg:w-[58%]` → `md:w-[60%] lg:w-[62%]`
   - Adjust flex alignment so image sits flush right: keep `justify-end items-end`

3. **Adjust left column** so the bigger figure doesn't crowd the headline:
   - Keep `md:w-[50%]` but add `relative z-10` to ensure text stays above any image overlap

4. **Reposition the floating glass cards** if needed so they still frame the (now larger) figure — keep positions since they're already relative to the viewport right edge.

No changes needed in mobile (image remains hidden below `md`).

This is a small, single-file CSS-class-only change.
