<script lang="ts">
  import type { GalleryEntry } from '$src/types';
  const entries: GalleryEntry[] = Object.values(
    import.meta.glob('$src/gallery-entries/*.md', { eager: true })
  );
</script>

{#each entries as entry}
  {@const metadata = entry.metadata}
  {@const Entry = entry.default}
  <article class="entry box">
    <h3 class="entry-title"><a href={metadata.direct_url}>{metadata.title}</a></h3>
    {#if metadata.github_url}
      <a href={metadata.github_url}
        ><img
          src="/jcanvas/images/github.svg"
          alt="{metadata.title} on GitHub"
          class="entry-github"
        /></a
      >
    {/if}
    <span class="entry-author">by {metadata.author}</span>
    <div class="entry-desc">
      <Entry />
    </div>
  </article>
{/each}
