

const names = [
	"Pam",
	"Ryan",
	"Dwight",
	"Michael",
	"Jim",
	"Andy",
	"Phyllis",
	"Angela",
	"Oscar",
	"Kelly",
	"Kevin",
	"Nate",
	"Stanley",
];

const pictureClasses = [
	"card__image--1",
	"card__image--2",
	"card__image--3",
	"card__image--4",
	"card__image--5",
	"card__image--6",
	"card__image--7",
	"card__image--8",
	"card__image--9",
	"card__image--10",
	"card__image--11",
	"card__image--12",
	"card__image--13",
];
let currentPictureIndex = 3;
// po prostu to jest jakas wartosc, ktora bedzie sie zmieniac
const leftArrow = document.querySelector(".card__arrow--left");
const rightArrow = document.querySelector(".card__arrow--right");
const cardImage = document.querySelector(".card__image");
const title = document.querySelector(".card__title");
const paragraph = document.querySelector(".quote");

leftArrow.addEventListener("click", () => {
	if (currentPictureIndex === 0) {
		// jesli jestesmy maksymalnie w lewo, to przy kolejnym kliku bedziemy mieli maksymalny indeks
		currentPictureIndex = pictureClasses.length - 1;
	} else {
		// w kazdym innym wypadku, czyli na przyklad 12 - odejmuje jeden
		currentPictureIndex = currentPictureIndex - 1;
	}
	cardImage.className = `card__image ${pictureClasses[currentPictureIndex]}`;
	title.innerText = names[currentPictureIndex];
	return currentPictureIndex;
});
rightArrow.addEventListener("click", () => {
	if (currentPictureIndex === pictureClasses.length - 1) {
		// jezeli jestesmy maksymalnie w prawo, jak klikniemy znowu, to ustawiamy 0
		currentPictureIndex = 0;
	} else {
		currentPictureIndex += 1;
	}
	cardImage.className = `card__image ${pictureClasses[currentPictureIndex]}`;
	title.innerText = names[currentPictureIndex];
	return currentPictureIndex;
});

// dodac nasluchiwanie na obrazku

// w zaleznosci od wybranego obrazka, kod w fetchu bedzie pobieral cytaty innej postaci

cardImage.addEventListener("click", () => {
	const URL = `https://thatswhattheysaid.p.rapidapi.com/theOfficequotes/${names[currentPictureIndex]}?id=${names[currentPictureIndex]}`;
	console.log(URL);
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "78fa2fb87dmsh2ba59fe48f26757p17dd78jsnb130beeef2ad",
			"X-RapidAPI-Host": "thatswhattheysaid.p.rapidapi.com",
		},
	};

	fetch(URL, options)
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error("Error, error, error");
			}
		})
		.then((data) => {
			console.log(data);
			paragraph.innerText = '"' + data[0].quote + '"';
		})
		.catch((err) => console.error(err));
});
