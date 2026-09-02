// Docusaurus owns the production precache and fetch routing. Custom service
// worker code must only extend that worker; creating another precache controller
// here would compete with Docusaurus' revisioned snapshot.
export default function swCustom() {
  // When pull-to-refresh activates a waiting worker, claim the current WebView
  // immediately so controllerchange can be observed before the page reloads.
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });
}
