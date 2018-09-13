console.log("DOM loaded");

const hogUrl = 'http://localhost:3000/hogs';
const hogList = document.getElementById("hog-list");
const hogForm = document.getElementById("hog-form");

fetch(hogUrl)
	.then(resp => resp.json())
	.then(addHogsToPage)

function addHogsToPage(hogs){
	hogs.forEach(addHogToPage);
}

function addHogToPage(hog){
	let checked = hog.greased == true ? 'checked' : ''

	hogList.innerHTML += `
		<div id=${hog.id}>
			<h3>${hog.name}</h3>
			<p>Specialty: ${hog.specialty}</p>
			<p>Award: ${hog.award}</p>
			<p>Weight: ${hog.weight}</p>
			<p>Greased: <input data-id="${hog.id}" class="toggle" type="checkbox" name="greased" value="greased" ${checked}><br></p>
			<button class="delete" data-id="${hog.id}">Delete</button>
		</div>
		----------------------
		`
}

hogForm.addEventListener("submit", addNewHog);

function addNewHog(event) {
	event.preventDefault();
	const name = document.getElementById("hog-form").children[0].value;
	const specialty = document.getElementById("hog-form").children[2].value;
	const award = document.getElementById("hog-form").children[8].value;
	const weight = document.getElementById("hog-form").children[6].value;
	const greased = document.getElementById("hog-form").children[4].checked;

	fetch(hogUrl, {
		method: "POST",
		headers: {
			"Accepts": "application/json",
			"Content-Type": "application/json; charset=utf-8"
		},
		body: JSON.stringify({
			name: name,
			specialty: specialty,
			award: award,
			weight: weight,
			greased: greased
		})
	})
	.then(resp => resp.json())
	.then(addHogToPage)
}

hogList.addEventListener("change", handleChange);

function handleChange(event) {
	// if (event.target.checked) {
	// 	console.log("checked")
	// } else {
	// 	console.log("unchecked")
	// }

	fetch((hogUrl + `/${event.target.dataset.id}`), {
		method: "PATCH", 
		headers: {
			"Accepts": "application/json",
			"Content-Type": "application/json; charset=utf-8"
		}
	})
	// debugger
}

hogList.addEventListener("click", handleClick);

function handleClick(event) {
	// debugger
	if (event.target.className == "delete") {
		event.target.parentElement.remove();
	
	fetch((hogUrl + `/${event.target.dataset.id}`), {
		method: "DELETE",
		headers: {
			"Accepts": "application/json",
			"Content-Type": "application/json; charset=utf-8"
		}
	}) 
	.then(resp => resp.json())
	}
}





