# Fame

Recipe collection website built with [Docusaurus](https://docusaurus.io/).

## Web App

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Android App

The project includes an Android app built with [Capacitor](https://capacitorjs.com/).

### Requirements

- Node.js 16+
- Android Studio with Android SDK
- Java 17+

### Build Android App

```bash
# Build the web app
yarn build

# Sync with Capacitor
yarn cap:sync

# Open in Android Studio (for development)
yarn cap:android

# Or build APK directly
cd android && ./gradlew assembleDebug
```

The APK will be available at `android/app/build/outputs/apk/debug/app-debug.apk`.

### Automated Builds

Android APKs are automatically built via GitHub Actions when a new version tag is pushed:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow creates a GitHub Release with the APK attached.

### Offline Support

The Android app includes offline support via a service worker:

- **Automatic caching**: All recipes and assets are cached on first load
- **Offline access**: View cached recipes when offline
- **Pull-to-refresh**: Pull down on the recipe list to check for updates
- **Update notification**: Get notified when new content is available

The service worker caches:
- Navigation pages (with network-first strategy)
- Images (cached for 30 days)
- Static resources (CSS, JS - stale-while-revalidate)
- Fonts (cached for 1 year)
