/**
 * Base path configuration for GitHub Pages deployment
 *
 * This handles the difference between:
 * - Local development: served from root (/)
 * - GitHub Pages subdirectory: served from /bengreene.dev
 * - Custom domain: served from root (/)
 *
 * Set NEXT_PUBLIC_BASE_PATH in your environment to configure:
 * - Local: leave unset (defaults to "")
 * - GitHub Pages: set to "/bengreene.dev"
 * - Custom domain: leave unset or set to ""
 */

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Get the full path for a public asset, accounting for basePath
 *
 * @param path - The path to the asset (e.g., "/images/photo.png")
 * @returns The full path with basePath prefix if configured
 *
 * @example
 * // Local development (no basePath)
 * getAssetPath("/images/photo.png") // returns "/images/photo.png"
 *
 * // GitHub Pages (basePath = "/bengreene.dev")
 * getAssetPath("/images/photo.png") // returns "/bengreene.dev/images/photo.png"
 */
export function getAssetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // If no basePath, return the path as-is
  if (!basePath) {
    return normalizedPath;
  }

  // Combine basePath with the asset path
  return `${basePath}${normalizedPath}`;
}
