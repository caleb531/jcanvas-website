  <script>
  import { page } from '$app/stores';
  import Header from './Header.svelte';
  import jQuery from 'jquery';
  if (typeof window !== 'undefined') {
    window.jQuery = jQuery;
    window.$ = jQuery;
    import('jcanvas');
  }
  import '../styles/index.scss';
</script>

<Header />

<main>
  <article class="page-{$page.data.id}">
    <h1>{$page.data.title}</h1>
    <span class="subtitle">{$page.data.subtitle}</span>
    <slot />
  </article>
</main>
