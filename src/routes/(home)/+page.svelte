<script lang="ts">
  import HomeAbout from './HomeAbout.svelte';
  import HomeExample from './HomeExample.svelte';
  import HomeFeatures from './HomeFeatures.svelte';
  import HomeIntro from './HomeIntro.svelte';
  import HomeMore from './HomeMore.svelte';
</script>

<div id="home-intro" class="home-section box">
  <HomeIntro />
</div>

<div id="home-features" class="home-section box column-left">
  <HomeFeatures />
</div>

<div id="home-example" class="home-section box column-right">
  <HomeExample />
</div>

<div class="clearfix"></div>

<div id="home-about" class="home-section box">
  <HomeAbout />
</div>

<div id="home-more">
  <HomeMore />
</div>
