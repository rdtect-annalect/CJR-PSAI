<script lang="ts">
  import Icon from './Icon.svelte';
  
  export let icon: string | null = null;
  export let text: string;
  export let color: string = "black";
  export let textColor: string = "white";
  export let rounded: string = "full";
  export let size: string = "normal";
  export let className: string = "";
  
  // Size classes mapping
  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    normal: "px-3 py-1 text-sm",
    large: "px-4 py-2 text-base"
  };
  
  // Get the appropriate size class
  const sizeClass = sizeClasses[size] || sizeClasses.normal;
</script>

<div class="flex items-center gap-2 bg-{color} text-{textColor} rounded-{rounded} {sizeClass} {className}">
  {#if icon}
    <Icon name={icon} size={size === 'small' ? '12' : size === 'large' ? '20' : '16'} />
  {/if}
  <span>{text}</span>
</div>
