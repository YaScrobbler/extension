<script lang="ts">
  interface Props {
    messages: string[][];
  }

  const { messages }: Props = $props();

  let messagesContainer: HTMLDivElement;

  $effect(() => {
    messages;

    const timer = setTimeout(() => {
      messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
    }, 40)

    return () => clearTimeout(timer);
  });
</script>

<div bind:this={messagesContainer}>
  {#each messages as messagesPart, i}
    {@const isLeft = i % 2 === 0}
    {#each messagesPart as message}
      <div class="chat {isLeft ? 'chat-start' : 'chat-end'}">
        <div class="chat-bubble">{@html message}</div>
      </div>
    {/each}
  {/each}
</div>
