<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    a {
      @apply text-blue-700;
    }

    a:hover {
        @apply underline;
    }

    input {
      @apply border-2 rounded p-1;
    }
  }
</style>