# Deployment Configuration

## Overview

This site uses an environment-based configuration to support multiple deployment scenarios:
- **Local development**: served from root (`/`)
- **GitHub Pages subdirectory**: served from `/bengreene.dev`
- **Custom domain**: served from root (`/`)

## How It Works

The `NEXT_PUBLIC_BASE_PATH` environment variable controls the base path for:
- Next.js routing (`basePath`)
- Static assets like CSS and JavaScript (`assetPrefix`)
- Public folder images (via `getAssetPath()` helper)

## Configuration by Environment

### Local Development

**No configuration needed!** The basePath defaults to empty string.

```bash
pnpm dev      # Runs at http://localhost:3000/
pnpm build    # Builds for local testing (no basePath)
```

### GitHub Pages (Subdirectory)

**Automatically configured in CI/CD.** The GitHub Actions workflow sets:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /bengreene.dev
```

This generates URLs like:
- Pages: `https://ben-edgar.github.io/bengreene.dev/`
- Images: `https://ben-edgar.github.io/bengreene.dev/images/...`
- Assets: `https://ben-edgar.github.io/bengreene.dev/_next/...`

### Custom Domain (Future)

When you configure a custom domain (e.g., `bengreene.dev`), update the GitHub Actions workflow:

**In `.github/workflows/deploy.yml`:**

```yaml
- name: Build with Next.js
  env:
    NEXT_PUBLIC_BASE_PATH: ""  # Empty string for custom domain
  run: ${{ steps.detect-package-manager.outputs.runner }} next build
```

Or remove the `NEXT_PUBLIC_BASE_PATH` line entirely (defaults to `""`).

## Testing Locally with basePath

To test the GitHub Pages build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/bengreene.dev pnpm build
pnpm start  # Serves from http://localhost:3000/bengreene.dev/
```

## Implementation Details

### Files Modified

1. **`src/lib/basePath.ts`** - Helper utility for asset paths
2. **`next.config.ts`** - Reads `NEXT_PUBLIC_BASE_PATH` env var
3. **`src/app/page.tsx`** - Wraps image paths with `getAssetPath()`
4. **`src/app/dadtrack/page.tsx`** - Wraps image paths with `getAssetPath()`
5. **`.github/workflows/deploy.yml`** - Sets basePath for GitHub Pages
6. **`.env.local`** - Documents local development setup

### Why This Approach?

Next.js does not automatically apply `basePath` to files in the `public/` folder during static export. By using `getAssetPath()` to manually prefix image paths, we ensure:
- ✅ Images work locally at `/images/...`
- ✅ Images work on GitHub Pages at `/bengreene.dev/images/...`
- ✅ Easy migration to custom domain (just update env var)
- ✅ Single source of truth for configuration

## Troubleshooting

### Images not loading on GitHub Pages?

1. Check the GitHub Actions workflow has `NEXT_PUBLIC_BASE_PATH: /bengreene.dev`
2. Verify the build succeeded in GitHub Actions
3. Check browser console for 404 errors to see what paths are being requested

### Images not loading locally?

1. Ensure `.env.local` doesn't set `NEXT_PUBLIC_BASE_PATH` (or sets it to `""`)
2. Run `pnpm build` without the environment variable
3. Images should be at `http://localhost:3000/images/...`

### Switching to custom domain?

1. Configure your custom domain in GitHub Pages settings
2. Update `.github/workflows/deploy.yml` to remove or empty `NEXT_PUBLIC_BASE_PATH`
3. Push changes and let GitHub Actions rebuild
