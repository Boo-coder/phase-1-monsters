/*<h1>Monstr Inc.</h1>
    <div id='create-monster'></div>
    <div id='monster-container'></div>
    <button id="back">=></button>
    <button id="forward">=></button>*/
let allMonsters = [];

document.addEventListener("DOMContentLoaded", (e) => {
    const forward = document.getElementById("forward")
    forward.addEventListener("click", () => {
        console.log(allMonsters.length);
        const monsters = allMonsters.slice(0, 50)
        displayMonsters(monsters)
        allMonsters = allMonsters.slice(50);
    })

    fetch("http://localhost:3000/monsters")
    .then(res => res.json())
    .then(data => {
        allMonsters = [...data];
       const form = document.getElementById("create-monster");
       form.setAttribute("id", "new-monster");
       
        const label = document.createElement("label");

        const input = document.createElement("input");
        input.type = "text";
        input.name = "name";
        input.placeholder = "name..."

        const age = document.createElement("label");

        const ageInput = document.createElement("input");
        ageInput.type = "number";
        ageInput.name = "age";
        ageInput.placeholder = "age...";
        
        const desc = document.createElement("label");

        const descInput = document.createElement("textarea");
        descInput.name = "description";
        descInput.placeholder = "description..."

        const button = document.createElement("button");
        button.type = "submit";
        button.textContent = "Create"


        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
        form.appendChild(age);
        form.appendChild(ageInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(desc);
        form.appendChild(descInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(button);
  
     form.addEventListener("submit", (e) => {
        e.preventDefault();

        const newMonster = {
            name: input.value,
            age: parseInt(ageInput.value),
            desc: descInput.value
        };

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMonster),
        })
        .then(res => res.json())
        .then(data => {
            displayMonster(data);
             
            input.value = "";
            ageInput.value = "";
            descInput.value = "";
        })
     })
        const monsters = allMonsters.slice(0, 50);
        displayMonsters(monsters);
        allMonsters = allMonsters.slice(50);
    })
    .catch(error => console.error("Error with monsters:", error));
    

    
})

function displayMonsters(monsters){
    const monsterList = document.getElementById("monster-container");
        monsterList.innerHTML = "";

        monsters.forEach(monster => {
            const monsterDiv = document.createElement("div");
            const monsterName = document.createElement("h2");
            const monsterAge = document.createElement("p");
            const monsterDiscription = document.createElement("p");

            monsterName.textContent = monster.name;
            monsterAge.textContent = monster.age;
            monsterDiscription.textContent = monster.description;

            monsterDiv.appendChild(monsterName);
            monsterDiv.appendChild(monsterAge);
            monsterDiv.appendChild(monsterDiscription);


            monsterList.appendChild(monsterDiv);
        })
}


