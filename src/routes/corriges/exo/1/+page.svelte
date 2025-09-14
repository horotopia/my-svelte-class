<script>
  let tasks = [
    {task:'Syntaxe de base', isDone:false},
    {task:'Réactivité', isDone:false},
    {task:'Événements', isDone:false},
    {task:'Conditions et boucles', isDone:false},
    {task:'Bindings', isDone:false},
  ];

  let newTask = '';

  const addTask = () => {
    newTask = newTask.trim() === '' ? 'none' : newTask.trim();
    tasks = [...tasks, { task: newTask.trim(), isDone: false }];
    newTask = '';
  }

  const handleToggle = (i) => {
    tasks = tasks.map((task, index) => 
      index === i 
      ? { ...task, isDone: !task.isDone }
      : task
    );
  }

  const remove = (i) => {
  tasks = tasks.filter((_, index) => index !== i);
}
  
</script>

<h2><strong>Demo 01:</strong>TodoList</h2>

<input 
  type="text" 
  placeholder="Nouvelle tâche" 
  class="border p-2 rounded w-64 mt-8"
  bind:value={newTask} 
  on:keydown={(e) => e.key === 'Enter' && addTask()}
/>
<button 
  on:click={addTask} 
  class="border px-2 rounded cursor-pointer"
>Ajouter</button>





<h3 class="mt-8 text-xl font-semibold">To-Do List:</h3>
{#if tasks.filter(task => !task.isDone).length > 0}
  <ul class="space-y-2">
    {#each tasks as task, i}
      {#if !task.isDone}
        <li>
            <input 
              type="checkbox" 
              checked={task.isDone}
              on:change={handleToggle(i)}
              class="w-4 h-4 rounded cursor-pointer" 
            />
            <span>{task.task}</span>
            <button 
              on:click={() => remove(i)}
              class="ml-4 text-red-500 cursor-pointer"
            >✕</button>
        </li>
      {/if}
    {/each}
  </ul>
{:else}
  <p class="text-gray-500 italic text-center py-4">Aucune tâche en cours</p>
{/if}





<h3 class="mt-8 text-xl font-semibold">Completed Tasks:</h3>
{#if tasks.filter(task => task.isDone).length > 0}
  <ul class="space-y-2">
    {#each tasks as task, i}
      {#if task.isDone}
        <li>
            <input 
              type="checkbox" 
              checked={task.isDone}
              on:change={() => handleToggle(i)}
              class="w-4 h-4 rounded cursor-pointer" 
            />
            <span>{task.task}</span>
            <button 
              on:click={() => remove(i)}
              class="ml-4 text-red-500 cursor-pointer"
            >✕</button>
        </li>
      {/if}
    {/each}
  </ul>
{:else}
  <p class="text-gray-500 italic text-center py-4">Aucune tâche terminée</p>
{/if}

