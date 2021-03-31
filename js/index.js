window.ondragstart = function () {
	return false;
};

const sidebar = document.querySelector('.sidebar');
const openButton = document.querySelector('#button-open');
const containerGrid = document.querySelector('#container-grid');
const buttons = document.querySelectorAll('[data-select]');

let sideBarIsOpen = false;
let isDrawing = false;
let mode = 'none'; //pen, eraser, rainbow
let color = 'black';

setGridSize(160, 90);
executeGrid(160, 90);

//160x90
//32 x 18
//64 x 36

// make a container for buttons for readability
openButton.addEventListener('click', activeSideBar);
buttons.forEach((button) => {
	button.addEventListener('click', function () {
		// has e that determines what to do next then make a function for different purposes and toggle classlist and remove classlist for pen eraser rainbow
		// if (mode !== 'none') {
		// 	removeToggle();
		// }
		if (button.getAttribute('data-select') === 'pen') {
			if (mode !== 'pen') {
				removeToggle();
			}
			button.classList.toggle('active');
			mode = 'pen';
		}
		if (button.getAttribute('data-select') === 'rainbow') {
			if (mode !== 'rainbow') {
				removeToggle();
			}
			button.classList.toggle('active');
			mode = 'rainbow';
		}
		if (button.getAttribute('data-select') === 'eraser') {
			if (mode !== 'eraser') {
				removeToggle();
			}
			button.classList.toggle('active');
			mode = 'eraser';
		}
		if (button.getAttribute('data-select') === 'trash') {
			clear();
		}
	});
});

function setGridSize(columns, rows) {
	containerGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
	containerGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function executeGrid(columns, rows) {
	for (let i = 0; i < columns * rows; i++) {
		const gridElement = document.createElement('div');
		gridElement.classList = 'grid-element';
		gridElement.addEventListener('mouseover', changeColor);
		containerGrid.append(gridElement);
	}
	toggleDraw();
}

//change dependeing on user input
function changeColor(e) {
	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var h = randomInt(0, 360);
	var s = randomInt(42, 98);
	var l = randomInt(40, 90);

	if (isDrawing && mode === 'pen') {
		//&& mode !== none
		e.target.style.backgroundColor = 'black';
	}
	if (isDrawing && mode === 'rainbow') {
		//&& mode !== none
		e.target.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
	}
	if (isDrawing && mode === 'eraser') {
		//&& mode !== none
		e.target.style.backgroundColor = 'white';
	}
}

function toggleDraw() {
	containerGrid.addEventListener('mousedown', function () {
		isDrawing = true;
	});
	containerGrid.addEventListener('mouseup', function () {
		isDrawing = false;
	});
}

function clear() {
	let allElements = containerGrid.childNodes;
	allElements.forEach((element) => {
		element.style.backgroundColor = 'white';
	});
}

function removeToggle() {
	const activeButton = document.querySelectorAll('.toggleable');
	activeButton.forEach((button) => {
		button.classList.remove('active');
	});
	mode = 'none';
}

function activeSideBar() {
	const buttonContainer = document.querySelectorAll('.button-container');
	if (!sideBarIsOpen) {
		this.src = './img/dinosaur-active.svg';
		sideBarIsOpen = true;
	} else {
		this.src = './img/dinosaur.svg';
		sideBarIsOpen = false;
	}
	sidebar.classList.toggle('sidebar_big');
	buttonContainer.forEach((button) => {
		button.classList.toggle('button-container-big');
	});
}
