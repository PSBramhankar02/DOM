// Global list of candidates
let candidates = [];
let showBulletPoints = false; // Default state for bullet points

function createContainer(body) {
  const container = document.createElement("div");
  container.classList.add("container");
  body.appendChild(container);
  return container;
}

function createHeader(container) {
  const header = document.createElement("h2");
  header.classList.add("header");
  header.textContent = "Candidate List Management";
  container.appendChild(header);
  return header;
}

function createTableRadioButton(layoutLabel) {
  const tableRadio = document.createElement("input");
  tableRadio.type = "radio";
  tableRadio.name = "layout";
  tableRadio.value = "table";
  tableRadio.checked = false;
  tableRadio.onclick = () => toggleLayout(tableRadio);
  layoutLabel.appendChild(tableRadio);
  layoutLabel.appendChild(document.createTextNode("Table Layout: "));
  return tableRadio;
}

function createDivRadioButton(layoutLabel) {
  const divRadio = document.createElement("input");
  divRadio.type = "radio";
  divRadio.name = "layout";
  divRadio.value = "div";
  divRadio.checked = false;
  divRadio.onclick = () => toggleLayout(divRadio);
  layoutLabel.appendChild(divRadio);
  layoutLabel.appendChild(document.createTextNode(" Div Layout: "));
  return divRadio;
}

function lineBreak(container) {
  container.appendChild(document.createElement("br"));
}

function createInputField(InputField) {
  const firstName = document.createElement("input");
  firstName.type = "text";
  firstName.id = "firstNameId";
  firstName.placeholder = "Enter first Name";
  InputField.appendChild(firstName);

  const lastName = document.createElement("input");
  lastName.type = "text";
  lastName.id = "lastNameId";
  lastName.placeholder = "Enter last name";
  InputField.appendChild(lastName);
}

function addUserButton(InputField) {
  const addButton = document.createElement("button");
  addButton.id = "addButtonId";
  addButton.textContent = "Add User";
  addButton.onclick = addUser;
  InputField.appendChild(addButton);
  return addButton;
}

function createJSONGenerateButton(container) {
  const generateButton = document.createElement("button");
  generateButton.id = "genetate-button";
  generateButton.textContent = "Generate JSON";
  generateButton.onclick = generateJSON;
  container.appendChild(generateButton);
}

function createToggleButton(container) {
  const toggleButton = document.createElement("button");
  toggleButton.id = "toggleButton";
  toggleButton.textContent = "Bullet Points: OFF"; // Default state is OFF
  toggleButton.onclick = toggleBulletPoints;
  container.appendChild(toggleButton);
}

function createDisplayContainer(container) {
  const displayContainer = document.createElement("div");
  displayContainer.classList.add("displaycontainer");
  container.appendChild(displayContainer);
  return displayContainer;
}

function createLoadJSONButton(container) {
    const loadJSON = document.createElement("button");
    loadJSON.id = "loadjson-button";
    loadJSON.textContent = "Load JSON";
    loadJSON.onclick = loadJSONFunction;
    console.log('Load JSON button created');  // Add this log
    container.appendChild(loadJSON);
  }

function createUI() {
  const body = document.body;
  const container = createContainer(body);
  const header = createHeader(container);

  const layoutLabel = document.createElement("label");
  layoutLabel.classList.add("radio-layout");
  const tableRadio = createTableRadioButton(layoutLabel);
  const divRadio = createDivRadioButton(layoutLabel);

  container.appendChild(layoutLabel);
  lineBreak(container);

  const InputField = document.createElement("div");
  createInputField(InputField);
  container.appendChild(InputField);

  addUserButton(InputField);
  lineBreak(container);

  const listContainer = document.createElement("div");
  listContainer.id = "listContainer";
  container.appendChild(listContainer);

  createJSONGenerateButton(container);



  lineBreak(container);

  // Create a new container for both JSON input and display areas
  const jsonContainer = document.createElement("div");
  jsonContainer.classList.add("json-container");
  container.appendChild(jsonContainer);

  // Create the display container (on the left side)
  const displayJSONContainer = createDisplayContainer(jsonContainer);

  const jsonOutput = document.createElement("pre");
  jsonOutput.id = "jsonOutput";
  displayJSONContainer.appendChild(jsonOutput);

  // Create the input container (on the right side)
  const jsonInputField = document.createElement("textarea");
  jsonInputField.id = "jsonInput";
  jsonInputField.rows = 5;
  jsonInputField.cols = 50;
  jsonInputField.placeholder = "Enter JSON here";
  jsonContainer.appendChild(jsonInputField);

  // Button to load the JSON data
   createLoadJSONButton(container);
   createToggleButton(container); 
}

var table;
// Function to toggle between Table and Div layout
function toggleLayout(radio) {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";
  if (radio.value === "table") {
    table = createTableLayout();
    setValueInTable(table);
  } else {
    createDivLayout();
  }
}

// Function to create the Table layout
function createTableLayout() {
  const container = document.getElementById("listContainer");
  const table = document.createElement("table");
  table.id = "canditate-table";
  table.setAttribute("border", "1");
  table.setAttribute("cellpadding", "5");
  const header = table.createTHead();
  const row = header.insertRow();
  row.insertCell(0).textContent = "#";
  row.insertCell(1).textContent = "First Name";
  row.insertCell(2).textContent = "Last Name";
  row.insertCell(3).textContent = "Action";
  container.appendChild(table);
  return table;
}

// Function to insert values in the table
function setValueInTable(table) {
  table.innerHTML = "";
  const header = table.createTHead();
  const row = header.insertRow();
  row.insertCell(0).textContent = "#";
  row.insertCell(1).textContent = "First Name";
  row.insertCell(2).textContent = "Last Name";
  row.insertCell(3).textContent = "Action";

  candidates.forEach((user, index) => {
    const row = table.insertRow();
    if (showBulletPoints) {
      row.insertCell(0).textContent = "•"; // Bullet point symbol when turned ON
    } else {
      row.insertCell(0).textContent = index + 1; // Index when turned OFF
    }
    row.insertCell(1).textContent = user.firstName;
    row.insertCell(2).textContent = user.lastName;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteUser(index);
    row.insertCell(3).appendChild(deleteBtn);

    // Apply alternating row colors (even / odd)
    if (index % 2 === 0) {
      row.classList.add("table-row-even");
    } else {
      row.classList.add("table-row-odd");
    }
  });
}

// Function to add a new user to the list
function addUser() {
  const firstName = document.getElementById("firstNameId").value;
  const lastName = document.getElementById("lastNameId").value;

  if (firstName && lastName) {
    const user = { firstName, lastName };
    candidates.push(user);

    const layout = document.querySelector('input[name="layout"]:checked').value;
    if (layout === "table") {
      setValueInTable(table);
    } else {
      createDivLayout();
    }
  } else {
    alert("Please enter both first and last names.");
  }
}

// Function to create the Div layout
function createDivLayout() {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";

  candidates.forEach((user, index) => {
    const div = document.createElement("div");
    div.classList.add("candidate");
    div.innerHTML = `
      <span class="username">${user.firstName} ${user.lastName}</span>
      <button class="delete" onclick="deleteUser(${index})">X</button>
    `;
    container.appendChild(div);
  });
}


// Function to delete a user from the list
function deleteUser(index) {
  candidates.splice(index, 1);
  const layout = document.querySelector('input[name="layout"]:checked').value;
  if (layout === "table") {
    setValueInTable(table);
  } else {
    createDivLayout();
  }
}

// Function to generate the JSON object of users
function generateJSON() {
  const json = JSON.stringify(candidates, null, 4);
  document.getElementById("jsonOutput").textContent = json;
}

// Function to load JSON data
function loadJSONFunction() {
    const jsonString = document.getElementById("jsonInput").value;
    console.log("Received JSON Input:", jsonString); // Add this line to debug the input
  
    // Check if the input is empty or not
    if (!jsonString.trim()) {
      alert("Input is empty. Please provide valid JSON data.");
      return;
    }
  
    try {
      candidates = JSON.parse(jsonString); // Try parsing the input
      console.log("Parsed candidates:", candidates); // Debug log
  
      // Check if the parsed object is an array (optional, but good practice)
      if (!Array.isArray(candidates)) {
        alert("The JSON input should be an array of objects.");
        return;
      }
  
      const layout = document.querySelector('input[name="layout"]:checked').value;
      if (layout === "table") {
        setValueInTable(table); // Update the table layout with new data
      } else {
        createDivLayout(); // Update the div layout with new data
      }
    } catch (e) {
      console.error("Error parsing JSON:", e); // Log the error
      alert("Invalid JSON format. Please check the syntax.");
    }
  }
  

// Function to toggle bullet points
function toggleBulletPoints() {
  showBulletPoints = !showBulletPoints;
  const button = document.getElementById("toggleButton");
  button.textContent = showBulletPoints
    ? "Bullet Points: ON"
    : "Bullet Points: OFF";
  const layout = document.querySelector('input[name="layout"]:checked').value;
  if (layout === "table") {
    setValueInTable(table);
  } else {
    createDivLayout();
  }
}



// Initialize the UI after the DOM is loaded
createUI();















/*
  // Global list of candidates
  let candidates = [];
  let showBulletPoints = false;  // Default state for bullet points
  let table;

  function createContainer(body) {
    const container = document.createElement("div");
    container.classList.add("container");
    body.appendChild(container);
    return container;
  }

  function createHeader(container) {
    const header = document.createElement("h2");
    header.classList.add("header");
    header.textContent = "Candidate List Management";
    container.appendChild(header);
    return header;
  }

  function createTableRadioButton(layoutLabel) {
    const tableRadio = document.createElement("input");
    tableRadio.type = "radio";
    tableRadio.name = "layout";
    tableRadio.value = "table";
    tableRadio.checked = false;
    tableRadio.onclick = () => toggleLayout(tableRadio);
    layoutLabel.appendChild(tableRadio);
    layoutLabel.appendChild(document.createTextNode("Table Layout: "));
    return tableRadio;
  }

  function createDivRadioButton(layoutLabel) {
    const divRadio = document.createElement("input");
    divRadio.type = "radio";
    divRadio.name = "layout";
    divRadio.value = "div";
    divRadio.checked = false;
    divRadio.onclick = () => toggleLayout(divRadio);
    layoutLabel.appendChild(divRadio);
    layoutLabel.appendChild(document.createTextNode(" Div Layout: "));
    return divRadio;
  }

  function lineBreak(container) {
    container.appendChild(document.createElement("br"));
  }

  function createInputField(InputField) {
    const firstName = document.createElement("input");
    firstName.type = "text";
    firstName.id = "firstNameId";
    firstName.placeholder = "Enter first Name";
    InputField.appendChild(firstName);

    const lastName = document.createElement("input");
    lastName.type = "text";
    lastName.id = "lastNameId";
    lastName.placeholder = "Enter last name";
    InputField.appendChild(lastName);
  }

  function addUserButton(InputField) {
    const addButton = document.createElement("button");
    addButton.id = "addButtonId";
    addButton.textContent = "Add User";
    addButton.onclick = addUser;
    InputField.appendChild(addButton);
    return addButton;
  }

  function createJSONGenerateButton(container) {
    const generateButton = document.createElement("button");
    generateButton.id = "genetate-button";
    generateButton.textContent = "Generate JSON";
    generateButton.onclick = generateJSON;
    container.appendChild(generateButton);
  }

  function createToggleButton(container) {
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleButton";
    toggleButton.textContent = "Bullet Points: OFF";  // Default state is OFF
    toggleButton.onclick = toggleBulletPoints;
    container.appendChild(toggleButton);
  }

  function createDisplayContainer(container) {
    const displayContainer = document.createElement("div");
    displayContainer.classList.add("displaycontainer");
    container.appendChild(displayContainer);
    return displayContainer;
  }

  function createUI() {
    const body = document.body;
    const container = createContainer(body);
    const header = createHeader(container);

    const layoutLabel = document.createElement("label");
    layoutLabel.classList.add("radio-layout");
    const tableRadio = createTableRadioButton(layoutLabel);
    const divRadio = createDivRadioButton(layoutLabel);

    container.appendChild(layoutLabel);
    lineBreak(container);

    const InputField = document.createElement("div");
    createInputField(InputField);
    container.appendChild(InputField);

    addUserButton(InputField);
    lineBreak(container);

    const listContainer = document.createElement("div");
    listContainer.id = "listContainer";
    container.appendChild(listContainer);

    createJSONGenerateButton(container);

    createToggleButton(container);  // Create the toggle button here

    lineBreak(container);

    const displayJSONContainer = createDisplayContainer(container);

    const jsonOutput = document.createElement("pre");
    jsonOutput.id = "jsonOutput";
    displayJSONContainer.appendChild(jsonOutput);

    // Create a text box for JSON input
    const jsonInputField = document.createElement("textarea");
    jsonInputField.id = "jsonInput";
    jsonInputField.rows = 5;
    jsonInputField.cols = 50;
    jsonInputField.placeholder = 'Enter JSON here';
    container.appendChild(jsonInputField);

    // Button to load JSON
    const loadJSON = document.createElement("button");
    loadJSON.id = "toggleButton";
    loadJSON.textContent = "Load JSON";
    loadJSON.onclick = loadJSONFunction;
    container.appendChild(loadJSON);
  }

  // Function to toggle between Table and Div layout
  function toggleLayout(radio) {
    const container = document.getElementById("listContainer");
    container.innerHTML = "";
    if (radio.value === "table") {
      table = createTableLayout();
      setValueInTable(table);
    } else {
      createDivLayout();
    }
  }

  // Function to create the Table layout
  function createTableLayout() {
    const container = document.getElementById("listContainer");
    const table = document.createElement("table");
    table.id = "canditate-table";
    table.setAttribute("border", "1");
    table.setAttribute("cellpadding", "5");
    const header = table.createTHead();
    const row = header.insertRow();
    row.insertCell(0).textContent = "#";
    row.insertCell(1).textContent = "First Name";
    row.insertCell(2).textContent = "Last Name";
    row.insertCell(3).textContent = "Action";
    container.appendChild(table);
    return table;
  }

  // Function to insert values in the table
  function setValueInTable(table) {
    table.innerHTML = "";
    const header = table.createTHead();
    const row = header.insertRow();
    row.insertCell(0).textContent = "#";
    row.insertCell(1).textContent = "First Name";
    row.insertCell(2).textContent = "Last Name";
    row.insertCell(3).textContent = "Action";

    candidates.forEach((user, index) => {
      const row = table.insertRow();
      if (showBulletPoints) {
        row.insertCell(0).textContent = "•";  // Bullet point symbol when turned ON
      } else {
        row.insertCell(0).textContent = index + 1;  // Index when turned OFF
      }
      row.insertCell(1).textContent = user.firstName;
      row.insertCell(2).textContent = user.lastName;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteUser(index);
      row.insertCell(3).appendChild(deleteBtn);

      // Apply alternating row colors (even / odd)
      if (index % 2 === 0) {
        row.classList.add("table-row-even");
      } else {
        row.classList.add("table-row-odd");
      }
    });
  }

  // Function to create the Div layout
  function createDivLayout() {
    const container = document.getElementById("listContainer");
    container.innerHTML = "";

    candidates.forEach((user, index) => {
      const div = document.createElement("div");
      div.classList.add("candidate");
      div.innerHTML = `
        <span class="username">${user.firstName} ${user.lastName}</span>
        <button class="delete" onclick="deleteUser(${index})">X</button>
      `;
      container.appendChild(div);
    });
  }

  // Function to delete a user from the list
  function deleteUser(index) {
    candidates.splice(index, 1);
    const layout = document.querySelector('input[name="layout"]:checked').value;
    if (layout === "table") {
      setValueInTable(table);
    } else {
      createDivLayout();
    }
  }

  // Function to generate the JSON object of users
  function generateJSON() {
    const json = JSON.stringify(candidates, null, 4);
    document.getElementById("jsonOutput").textContent = json;
  }

  // Function to toggle bullet points
  function toggleBulletPoints() {
    showBulletPoints = !showBulletPoints;
    const button = document.getElementById("toggleButton");
    button.textContent = showBulletPoints ? "Bullet Points: ON" : "Bullet Points: OFF";
    const layout = document.querySelector('input[name="layout"]:checked').value;
    if (layout === "table") {
      setValueInTable(table);
    } else {
      createDivLayout();
    }
  }

  // Function to load JSON data
  function loadJSONFunction() {
    const jsonString = document.getElementById("jsonInput").value;
    try {
      candidates = JSON.parse(jsonString);
      const layout = document.querySelector('input[name="layout"]:checked').value;
      if (layout === "table") {
        setValueInTable(table);
      } else {
        createDivLayout();
      }
    } catch (e) {
      alert("Invalid JSON format");
    }
  }

  // Initialize the UI after the DOM is loaded
  createUI();*/
