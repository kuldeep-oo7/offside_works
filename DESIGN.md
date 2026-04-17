# DESIGN SYSTEM SPECIFICATION: OFFSIDE WORKS

## 1. Overview & Creative North Star
### The Creative North Star: "The Machined Monolith"
This design system rejects the "softness" of the modern web. We are building for 'Offside Works'—a place where heavy industry meets surgical precision. The aesthetic is **Industrial Brutalism**: a celebration of raw materials, structural integrity, and the beauty of a high-power laser cut. 

We break the standard template by treating the viewport as a solid sheet of metal. We use intentional asymmetry to mimic blueprints, overlapping layers to suggest assembly, and high-contrast typography to demand authority. This is not "user-friendly" in the sense of being cuddly; it is "expert-friendly"—it is precise, efficient, and unyielding.

---

## 2. Colors & Surface Logic
The palette is rooted in the foundry: deep carbon, high-velocity sparks, and the cold glow of calibrated equipment.

### The Surface Hierarchy
Depth is not achieved through shadows, but through **Tonal Layering**. Imagine the UI as stacked plates of cold-rolled steel.
*   **Base:** `surface` (#131313) is your primary floor.
*   **Recess:** Use `surface_container_lowest` (#0e0e0e) for "etched" areas or background sections that should feel further away.
*   **Elevation:** Use `surface_container_high` (#2a2a2a) and `highest` (#353534) to represent plates stacked on top of the base.

### The Rules of Engagement
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined by the transition from `surface` to `surface_container_low`. We define space through mass, not outlines.
*   **The "Laser Glow" (Primary):** Use `primary_container` (#ff5719) for high-intensity calls to action. This represents the heat of the fabrication process.
*   **Signature Textures:** Apply a 3% film grain overlay across the entire UI. For hero sections, use a subtle linear gradient from `surface` to `surface_container_high` at a 45-degree angle to mimic the sheen of brushed aluminum.

---

## 3. Typography: Technical Authority
Typography is our primary architectural element. We lead with **Space Grotesk** for structural impact and **Inter** for technical clarity.

*   **Display & Headlines:** Use `display-lg` and `headline-lg` (Space Grotesk) in **all-caps** for primary messaging. Tracking should be tightened (-2% to -4%) to make the type feel as dense as a heavy casting.
*   **Body & Technicals:** Use `body-md` (Inter). This provides a "manual-style" readability that balances the aggressive headlines.
*   **Labeling:** Labels (`label-md`) should be used for metadata (e.g., "Milled in 6061 Aluminum"). These should be paired with `primary` (#ffb59e) to act as "safety markers" on the page.

---

## 4. Elevation & Depth: Tonal Precision
In Industrial Brutalism, "light" comes from the sparks, not a sun icon in the sky.

*   **The Layering Principle:** To highlight a card, do not use a shadow. Place a `surface_container_highest` plate over a `surface_dim` background. The contrast in value creates the "lift."
*   **The "Ghost Border" Fallback:** If a technical boundary is required (e.g., an input field), use `outline_variant` (#5c4037) at 20% opacity. It should look like a faint scribe mark on metal.
*   **Machined Glass:** For floating overlays or navigation, use `surface_bright` at 60% opacity with a heavy `backdrop-blur` (20px+). This mimics frosted industrial glass used in factory partitions.

---

## 5. Components
All components must adhere to the **0px Roundedness Scale**. If it’s not sharp, it’s not Offside Works.

### Buttons: The "Actuators"
*   **Primary:** Solid `primary_container` (#ff5719) with `on_primary_fixed` (#3a0b00) text. No rounded corners. On hover, the background should shift to `primary` (#ffb59e) with a "mechanical" instantaneous transition (GSAP `expo.out`).
*   **Secondary:** `surface_container_highest` background with a `primary` "Ghost Border" at 20% opacity.

### Interactive States (Mechanical Easing)
Avoid "bouncy" or "organic" animations. Interactions should feel like high-torque machinery.
*   **Easing:** Use `Power4.easeOut` or `Expo.easeOut` for all transitions.
*   **Timing:** Fast (200ms–300ms). The UI should react with the snap of a toggle switch.
