<script lang="ts">
  import { base } from '$app/paths';
  const entries = Object.values(import.meta.glob('$src/gallery-entries/*.md', { eager: true }));
</script>

This is a collection of sites and apps that use jCanvas. If you would like to submit your project to the gallery, please [follow the steps for doing so]({base}/support/#gallery).

{#each entries as entry}
  {@const { metadata } = entry}
  {@const Entry = entry.default}
  <article class="entry box">
    <h3 class="entry-title"><a href="{metadata.direct_url}">{metadata.title}</a></h3>
    {#if metadata.github_url}
      <a href="{metadata.github_url}"><img src="{base}/images/github.svg" alt="{metadata.title} on GitHub" class="entry-github" /></a>
    {/if}
    <span class="entry-author">by {metadata.author}</span>
    <div class="entry-desc">
      <Entry />
    </div>
  </article>
{/each}
