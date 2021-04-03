const sidebar = document.querySelector('.sidebar');
const openSideBarButton = document.querySelector('#button-open');
const containerGrid = document.querySelector('#container-grid');
const selectMode = document.querySelectorAll('[data-mode]');
const selectAction = document.querySelectorAll('[data-action]');
const canvasSelectButtons = document.querySelectorAll('.btn');
const selectContainer = document.getElementById('canvas-select');
const sketchContent = document.querySelectorAll('.sketch-content');

window.ondragstart = function () {
	return false;
};

let sideBarIsOpen = false;
let isDrawing = false;
let currentColor = 'black';
let mode = null;
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

initializer();

canvasSelectButtons.forEach((button) => {
	button.addEventListener('click', function (e) {
		let rows = e.target.getAttribute('data-rows');
		let columns = e.target.getAttribute('data-columns');

		setGridSize(rows, columns);
		executeGrid(rows, columns);
		startDrawing();
	});
});

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
		if (button.getAttribute('data-action') === 'canvas-size') {
			initializer();
			clear();
		}
	});
});

pickr.on('change', (color) => {
	let rgbColor = color.toRGBA().toString();
	currentColor = rgbColor;
});

function initializer() {
	selectContainer.classList.add('active');
	sketchContent.forEach((content) => {
		content.classList.add('blur');
	});
}

function startDrawing() {
	selectContainer.classList.remove('active');
	sketchContent.forEach((content) => {
		content.classList.remove('blur');
	});
}

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
	var randomColor = Math.floor(Math.random() * 16777215).toString(16);

	if (isDrawing && mode === 'pen') {
		e.target.style.backgroundColor = `${currentColor}`;
	}
	if (isDrawing && mode === 'rainbow') {
		e.target.style.backgroundColor = `#${randomColor}`;
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
	if (!sideBarIsOpen) {
		this.src = './img/dinosaur-active.svg';
		hideSideBarText(sideBarIsOpen);
		sideBarIsOpen = true;
	} else {
		this.src = './img/dinosaur.svg';
		hideSideBarText(sideBarIsOpen);
		sideBarIsOpen = false;
	}
	toggleSideBar();
}

function toggleSideBar() {
	const buttonContainer = document.querySelectorAll('.button-container');

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
