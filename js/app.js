// 1. APPLICATION STATE
let state = {
  todos: [],
  filteredWord: "",
  nextId: 2,
}


// 2. STATE ACCESSORS/MUTATORS FN'S

const storedState = localStorage.getItem('todo-app');
if (storedState)
{
  state = JSON.parse(storedState);
}

function storeState()
{
  localStorage.setItem('todo-app', JSON.stringify(state));
}

function getFilteredTodos()
{
  const filterWord = state.filteredWord.toLowerCase();
  const filteredTodos = [];
  for (const todo of state.todos)
  {
    const text = todo.text.toLowerCase();
    const startMatch = text.indexOf(filterWord);
    if (startMatch !== -1)
    {
      const endMatch = startMatch + filterWord.length;
      filteredTodos.push({...todo, startMatch, endMatch});
    }
  }
  return filteredTodos;
}

function setFilterWord(filterWord)
{
  state.filteredWord = filterWord;
}

function addTodo(text)
{
  state.todos.push({id: state.nextId, text: text, completed: false});
  state.nextId++;
}

function removeTodo(id)
{
  let index = state.todos.findIndex(todo => todo.id === id);
  state.todos.splice(index, 1);
}

function toggleTodoCompleted(id)
{
  const todo = state.todos.find(todo => todo.id === id);
  todo.completed = !todo.completed;
}


// 3. DOM Node Refs

const todoAdd$ = document.querySelector("#shopping-add");
const todoInput$ = document.querySelector("#shopping-input");
const todoList$ = document.querySelector("#shopping-list");
const todoFilter$ = document.querySelector("#shopping-filter");


// 4. DOM Node Creation Fn's

function createTodoItem(todo)
{
  const {id, text, completed, startMatch, endMatch} = todo;
  const highlightedText = highlightMatch(text, startMatch, endMatch);
  return `
    <li class="${completed ? 'completed' : ''}">
      ${highlightedText}
      ${createTodoCheckBox(id, completed)}
      ${createTodoRemoveButton(id)}
    </li>
    `;
}

function highlightMatch(text, startMatch, endMatch)
{
  const beforeMatch = text.slice(0, startMatch);
  const matchText = text.slice(startMatch, endMatch);
  const afterMatch = text.slice(endMatch);
  return `${beforeMatch}<mark>${matchText}</mark>${afterMatch}`;
}

function createTodoCheckBox(id, completed)
{
  return `
    <input type="checkbox" ${completed ? 'checked' : ''}
      onclick="onToggleTodoCompleted(${id})">
    `;
}

function createTodoRemoveButton(id)
{
  return `
    <button onclick="onRemoveTodo(${id})">
      Remove
    </button>
    `;
}


// 5. RENDER FN

function render()
{
  todoList$.innerHTML =
    getFilteredTodos().map(createTodoItem).join('');

  storeState();
}


// 6. EVENT HANDLERS

function onAddTodo()
{
  const text = todoInput$.value;
  if (text.trim() !== '')
  {
    todoInput$.value = '';
    addTodo(text);
    render();
    console.log('state', state);
  }
}

function onRemoveTodo(id)
{
  removeTodo(id);
  render();
  console.log('state', state);
}

function onToggleTodoCompleted(id)
{
  toggleTodoCompleted(id);
  render();
  console.log('state', state);
}

function onFilterTodos()
{
  setFilterWord(todoFilter$.value);
  render();
  console.log('state', state);
}


// 7. INIT BINDINGS

todoAdd$.addEventListener('click', (event) => onAddTodo());

todoInput$.addEventListener('keyup', function (event)
{
  if (event.key === 'Enter')
  {
    onAddTodo();
  }
});

todoFilter$.addEventListener('keyup', function (event)
{
  onFilterTodos();
});


// 8. INITIAL RENDER

render();
console.log('state', state);
