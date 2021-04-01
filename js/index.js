const sidebar = document.querySelector('.sidebar');
const openSideBarButton = document.querySelector('#button-open');
const containerGrid = document.querySelector('#container-grid');
const selectMode = document.querySelectorAll('[data-mode]');
const selectAction = document.querySelectorAll('[data-action]');

window.ondragstart = function () {
	return false;
};

let sideBarIsOpen = false;
let isDrawing = false;
let mode = null;
let currentColor = 'black';
const pickr = Pickr.create({
	el: '.color-picker',
	theme: 'monolith',
	default: 'black',
	padding: 0,
	position: 'right-middle',
	swatches: [
		'rgba(244, 67, 54, 1)',
		'rgba(233, 30, 99, 1)',
		'rgba(156, 39, 176, 1)',
		'rgba(103, 58, 183, 1)',
		'rgba(63, 81, 181, 1)',
		'rgba(33, 150, 243, 1)',
	],

	components: {
		preview: true,
		opacity: true,
		hue: true,
		interaction: {
			hex: true,
			rgba: true,
			input: true,
		},
	},
});

pickr.on('change', (color) => {
	let rgbColor = color.toRGBA().toString();
	currentColor = rgbColor;
});

setGridSize(160, 90);
executeGrid(160, 90);

//160x90
//32 x 18
//64 x 36

openSideBarButton.addEventListener('click', openSideBar);

selectMode.forEach((button) => {
	button.addEventListener('click', function () {
		if (mode !== button.getAttribute('data-mode')) {
			removeToggle();
			button.classList.toggle('active');
		}
		if (mode === button.getAttribute('data-mode')) {
			return removeToggle();
		}
		mode = button.getAttribute('data-mode');
	});
});

selectAction.forEach((button) => {
	button.addEventListener('click', function () {
		if (button.getAttribute('data-action') === 'trash') clear();
		if (button.getAttribute('data-action') === 'color') pickr.show();
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
		gridElement.addEventListener('mouseover', draw);
		containerGrid.append(gridElement);
	}
	toggleDraw();
}

function draw(e) {
	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var h = randomInt(0, 360);
	var s = randomInt(42, 98);
	var l = randomInt(40, 90);

	if (isDrawing && mode === 'pen') {
		e.target.style.backgroundColor = `${currentColor}`;
	}
	if (isDrawing && mode === 'rainbow') {
		e.target.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
	}
	if (isDrawing && mode === 'eraser') {
		e.target.style.backgroundColor = null;
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
		element.style.backgroundColor = null;
	});
}

function removeToggle() {
	const activeButton = document.querySelectorAll('.toggleable');
	activeButton.forEach((button) => {
		button.classList.remove('active');
	});
	mode = null;
}

function openSideBar() {
	const buttonContainer = document.querySelectorAll('.button-container');
	if (!sideBarIsOpen) {
		this.src = './img/dinosaur-active.svg';
		hideSideBarText(sideBarIsOpen);
		sideBarIsOpen = true;
	} else {
		this.src = './img/dinosaur.svg';
		hideSideBarText(sideBarIsOpen);
		sideBarIsOpen = false;
	}
	sidebar.classList.toggle('sidebar_big');
	buttonContainer.forEach((button) => {
		button.classList.toggle('button-container-big');
	});
}

function hideSideBarText(param) {
	if (param === false) {
		sidebar.querySelectorAll('a').forEach((element) => {
			element.classList.remove('sidebar-hide');
		});
	} else {
		sidebar.querySelectorAll('a').forEach((element) => {
			element.classList.add('sidebar-hide');
		});
	}
}
