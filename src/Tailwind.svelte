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

  @layer components {
    .bidtable td, .bidtable th {
      @apply px-2 py-1;
    }

    .bar {
      @apply inline-block text-center py-0.5;
    }
  }
</style>