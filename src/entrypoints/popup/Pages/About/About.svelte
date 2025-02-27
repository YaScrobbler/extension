<script lang="ts">
  import Header from "./Header.svelte";
  import Messages from "./Messages.svelte";
  import { story, type StoryOption, type StoryPaths } from "./story";

  let messages: string[][] = $state([story.greetings.story]);
  let currentOptions = $state<StoryOption[]>(story.greetings.options)

  function handleButton(option: StoryOption) {
    const storyPart = story[option.arc];
    currentOptions = storyPart.options;
    messages.push([option.text]);
    messages.push(storyPart.story);
  }
</script>

<Header />
<Messages {messages} />

<div class="flex flex-col px-3 py-2 gap-y-2">
  {#each currentOptions as option}
    <button class="btn w-full" onclick={handleButton.bind(null, option)}>{option.text}</button>
  {/each}
</div>