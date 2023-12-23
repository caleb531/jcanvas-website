<script lang="ts">
  import { page } from '$app/stores';
  import '../styles/index.scss';
  import Header from './Header.svelte';
</script>

<svelte:head>
  <title
    >{$page.data.id === 'home'
      ? `${$page.data.title} | ${$page.data.subtitle}`
      : `${$page.data.title} | jCanvas`}</title
  >
  <meta name="description" content={$page.data.description} />
</svelte:head>

<Header />

<main>
  <article class="page-{$page.data.id}">
    <h1>{$page.data.title}</h1>
    <span class="subtitle">{$page.data.subtitle}</span>
    <slot />
  </article>
</main>
