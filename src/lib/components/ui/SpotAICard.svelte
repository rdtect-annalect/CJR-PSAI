<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let image = {
    src: '',
    alt: '',
    tipNumber: 1
  };
  export let title = '';
  export let subtitle = '';
  export let description = '';
  
  function handleClick() {
    dispatch('click');
  }
</script>

<div class="card spot-ai-card relative overflow-hidden rounded-3xl border-0 cursor-pointer" 
  role="button"
  tabindex="0"
  aria-label={`${title}: ${subtitle}`}
  onclick={handleClick}
  onkeydown={(e) => e.key === 'Enter' && handleClick()}
  data-bs-toggle="modal" 
  data-bs-target="#carouselModal"
>
  <!-- Image -->
  <img 
    src={image.src} 
    alt={image.alt}
    class="w-full h-full object-cover img-fluid" 
    draggable="false"
    ondragstart={(e) => e.preventDefault()}
  />
  
  <!-- Card body -->
  <div class="card-body">
    <h3 class="card-title">{title}</h3>
    
    <!-- Hidden content for modals -->
    <div class="sr-only">
      <h4>{@html subtitle}</h4>
      <p>{description}</p>
    </div>
  </div>
</div>

<style>
  .spot-ai-card {
    background-color: transparent;
    margin: 10px;
    border: 0;
    position: relative;
    height: 70vh;
    overflow: hidden;
    border-radius: 30px;
    cursor: pointer;
  }
  
  .spot-ai-card img {
    border-radius: 20px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.5s;
  }
  
  .spot-ai-card:hover img {
    transform: scale(1.1);
  }
  
  .card-body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    letter-spacing: 10px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-family: "tt-paplane", sans-serif;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #fff;
    padding: 4px 15px;
    text-align: center;
    display: inline-block;
    border: 2px solid #fff;
    border-radius: 20px;
  }
</style>
