declare global {
  interface Window {
    jQuery: typeof import('jquery');
    $: typeof import('jquery');
  }
}
export {};
