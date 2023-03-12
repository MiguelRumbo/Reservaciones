const groupsContainer = document.getElementById("groups-container");

function createGroupInputs(num) {
  groupsContainer.innerHTML = "";

  for (let i = 1; i <= num; i++) {
    const groupNum = i;

    const groupDiv = document.createElement("div");

    const adultsLabel = document.createElement("label");
    adultsLabel.innerText = `Adultos en el grupo ${groupNum}:`;
    const adultsSelect = document.createElement("select");
    adultsSelect.name = `adults-group-${groupNum}`;
    adultsSelect.required = true;
    for (let j = 1; j <= 4; j++) {
      const option = document.createElement("option");
      option.value = j;
      option.text = j;
      adultsSelect.add(option);
    }

    const minorsContainer = document.createElement("div");
    minorsContainer.classList.add("minors-container");

    adultsSelect.addEventListener("change", () => {
      minorsContainer.innerHTML = "";

      const numMinors =
        adultsSelect.value == 4 ? 0 : 4 - adultsSelect.value * 1;

      for (let k = 1; k <= numMinors; k++) {
        const minorLabel = document.createElement("label");
        minorLabel.innerText = `Edad del menor ${k}:`;
        const minorInput = document.createElement("input");
        minorInput.type = "number";
        minorInput.name = `minor-${groupNum}-${k}`;
        minorInput.required = true;

        minorsContainer.appendChild(minorLabel);
        minorsContainer.appendChild(minorInput);
      }
    });

    groupDiv.appendChild(adultsLabel);
    groupDiv.appendChild(adultsSelect);
    groupDiv.appendChild(minorsContainer);

    groupsContainer.appendChild(groupDiv);
  }
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const numGroups = parseInt(formData.get("num-groups"));
  let numAdults = 0;
  let numChildren = 0;
  let numChildrenInputs = 0;

  for (let i = 1; i <= numGroups; i++) {
    const adults = formData.get(`adults-group-${i}`);
    const minorsContainer = document
      .querySelector(`[name="adults-group-${i}"]`)
      .parentNode.querySelector(".minors-container");
    const minors = minorsContainer.querySelectorAll("input");

    numAdults += parseInt(adults);
    numChildrenInputs += minors.length;

    minors.forEach((minor) => {
      const age = parseInt(minor.value);
      if (age < 18) {
        numChildren++;
      }
    });
  }

  const total = numAdults + numChildren;
  const numRooms = Math.ceil(total / 2); // Calcula el número de habitaciones necesarias
  const roomCost = numRooms * 5000; // Calcula el costo total de las habitaciones
  const busTicketCost = (numAdults * 2000) + (numChildren * 1000); // Calcula el costo total de los boletos de autobús
  const totalCost = roomCost + busTicketCost;
  const windowFeatures =
    "menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=800,height=600";
  const win = window.open("", "formdata", windowFeatures);
  win.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Resultados del formulario</title>
      <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      
      h1, h2 {
        color: #00578b;
        text-align: center;
        text-transform: uppercase;
      }
      
      p {
        font-size: 18px;
        line-height: 1.5;
        margin: 0 0 10px;
        padding: 0 20px;
      }
      
      .container {
        background-color: #fff;
        border: 10px solid #00578b;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        margin: 50px auto;
        max-width: 600px;
        padding: 20px;
      }

      </style>
    </head>
    <body>
      <div class="container">
        <h1>Ticket</h1>
        <p>Total de personas: ${total}</p>
    <p>Adultos: ${numAdults}</p>
    <p>Menores: ${numChildren}</p>
    <h2>Habitaciones de 2 camas</h2>
    <p>Habitaciones necesarias: ${numRooms}</p>
    <h2>Costo por habitacion $5.000</h2>
    <p>Costo total de las habitaciones: $${roomCost.toLocaleString("es", {
      minimumFractionDigits: 0,
    })}</p>
    <h2>Costo por boleto: Adultos $2000 y Menores $1000</h2>
    <p>Costo total de los boletos de autobús: $${busTicketCost.toLocaleString(
      "es",
      { minimumFractionDigits: 0 }
    )}</p>
    <h1>Costo total del viaje: $${totalCost.toLocaleString("es", {
      minimumFractionDigits: 0,
    })}</h1>
    </div>
    </body>
    </html>
  `);
});

document.getElementById("num-groups").addEventListener("change", (event) => {
  const num = parseInt(event.target.value);
  createGroupInputs(num);
});
