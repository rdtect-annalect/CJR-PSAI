<script lang="ts">
  import type { Article } from '$lib/data/furtherReading';
  export let article: Article;
</script>

<div class="article-card p-4 pt-8 pb-6 relative font-paplane">
  <div class="corner-accent corner-tl"></div>
  <div class="corner-accent corner-tr"></div>
  <div class="corner-accent corner-bl"></div>
  <div class="corner-accent corner-br"></div>

  <a href={article.href} aria-label={article.aria} class="absolute top-6 right-6">
    <span class="border border-color-primary text-[10px] uppercase tracking-wider text-color-primary py-[3px] px-[10px] rounded-2xl hover:bg-color-primary hover:text-white transition-colors">
      READ MORE
    </span>
  </a>

  <h3 class="text-black font-papplane text-[0.95rem] md:text-[1.15rem] mt-3 tracking-[0.08em] leading-[1.35] font-medium uppercase">
    {@html article.titleWithBreaks}
  </h3>

  <div class="mt-5">
    <p class="text-xs uppercase tracking-[0.08em] text-gray-800 font-medium font-papplane">
      BY {article.author}
    </p>
    <p class="text-xs tracking-[0.08em] text-gray-600 font-papplane">
      {article.date}
    </p>
  </div>
</div>

<style>
  /* Using regular CSS instead of @apply for compatibility */
  .article-card {
    background-color: white;
    position: relative;
  }
  .corner-accent {
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: 10;
  }
  .corner-tl {
    top: 0;
    left: 0;
    border-top: 2px solid #FF4F2A;
    border-left: 2px solid #FF4F2A;
  }
  .corner-tr {
    top: 0;
    right: 0;
    border-top: 2px solid #FF4F2A;
    border-right: 2px solid #FF4F2A;
  }
  .corner-bl {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #FF4F2A;
    border-left: 2px solid #FF4F2A;
  }
  .corner-br {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid #FF4F2A;
    border-right: 2px solid #FF4F2A;
  }
</style>
