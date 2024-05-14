// 1. APPLICATION STATE
let state =
{
  todos: [],
  filteredWord: "",
  nextId: 2,
}


// 2. STATE ACCESSORS/MUTATORS FN'S

function loadState()
{
  const storedState = localStorage.getItem('todo-app');
  if (storedState)
  {
    state = JSON.parse(storedState);
  }
}

function storeState()
{
  localStorage.setItem('todo-app', JSON.stringify(state));
}


function importTodos()
{
  fetch('https://dummyjson.com/todos/random')
    .then(res => res.json())
    .then(data =>
    {
      console.log(data);
      delete data.userId;
      data.text = data.todo;
      delete data.todo;
      state.todos.push(data);
      render();
    });
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

function editTodo(event, id)
{
  const todoIndex = state.todos.findIndex(todo => todo.id === id);
  const parentElement = event.target.parentElement;
  const inputField = document.createElement('input');

  inputField.value = state.todos[todoIndex].text;


  parentElement.childNodes.forEach(child =>
  {
    if (child.nodeType === Node.ELEMENT_NODE)
    {
      child.classList.add('filtered');
    }
  });

  parentElement.textContent = '';
  parentElement.appendChild(inputField);

  inputField.focus();
  inputField.select();

  inputField.addEventListener('keyup', (event) =>
  {
    if (event.key === 'Enter')
    {

      state.todos[todoIndex].text = inputField.value;


      parentElement.childNodes.forEach(child =>
      {
        if (child.nodeType === Node.ELEMENT_NODE)
        {
          child.classList.remove('filtered');
        }
      });

      render();
    }
  });
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
const todoCompletedHide$ = document.querySelector("#shopping-completed-hide");
const todoDeleteAll$ = document.querySelector("#shopping-delete-all");
const todoCompleteShow$ = document.querySelector("#shopping-completed-show");
const todoImport$ = document.querySelector("#shopping-import");


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
      ${createTodoEditButton(event, id)}
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
      🗑️
    </button>
    `;
}

function createTodoEditButton(event, id)
{
  return `
    <button onclick="editTodo(event, ${id})">
      ✏️
    </button>
    `;
}

// 5. RENDER FN

function render()
{
  todoList$.innerHTML = getFilteredTodos().map(createTodoItem).join('');

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

function onHideCompleted()
{
  state.filteredTodos = state.todos.filter(todo => todo.completed === true);
  state.todos = state.todos.filter(todo => !todo.completed);
  render();
  todoCompletedHide$.classList.add('filtered');
  todoCompleteShow$.classList.remove('filtered');
}

function onShowCompleted()
{
  state.todos = state.todos.concat(state.filteredTodos);
  state.filteredTodos = [];
  render();
  todoCompletedHide$.classList.remove('filtered');
  todoCompleteShow$.classList.add('filtered');
}

function onDeleteAllItems()
{
  state.todos = [];
  state.nextId = 1;
  render();
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

todoCompletedHide$.addEventListener('click', () => onHideCompleted());

todoCompleteShow$.addEventListener('click', () => onShowCompleted());

todoDeleteAll$.addEventListener('click', () => onDeleteAllItems());

todoImport$.addEventListener('click', () => importTodos());


// 8. INITIAL RENDER

loadState();
render();
console.log('state', state);
