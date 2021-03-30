const sidebar = document.querySelector('.sidebar');
const containerGrid = document.querySelector('#container-grid');
const expandButton = document.querySelector('#button-open');

let drawing = false;
let open = false;
expandButton.addEventListener('click', activeHover);

expandButton.onclick = function () {
	sidebar.classList.toggle('sidebar_big');
};

// setGridSize(16, 9);
// fillGrid(16, 9);
setGridSize(160, 90);
fillGrid(160, 90);

function setGridSize(columns, rows) {
	containerGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
	containerGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function fillGrid(columns, rows) {
	for (let i = 0; i < columns * rows; i++) {
		const gridElement = document.createElement('div');
		const gridContainer = document.querySelector('#container-grid');
		gridElement.classList = 'grid-element';
		gridElement.addEventListener('mouseover', changeColor);
		gridContainer.appendChild(gridElement);
	}
}

function changeColor(e) {
	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var h = randomInt(0, 360);
	var s = randomInt(42, 98);
	var l = randomInt(40, 90);

	// e.target.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
	e.target.style.backgroundColor = 'black';
}

function activeHover() {
	if (!open) {
		this.src = './img/dinosaur-active.svg';
		open = true;
	} else {
		this.src = './img/dinosaur.svg';
		open = false;
	}
}
