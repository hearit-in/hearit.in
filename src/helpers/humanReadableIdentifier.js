import { random } from 'lodash';

const adjectives = [
	"ti av ti",
	"lysende",
	"glad",
	"ekkel",
	"sær",
	"morsom",
	"energisk",
	"topp",
	"trist",
	"hårete",
	"ekte",
	"real",
	"modernistisk",
	"dank"
];

const substantives = [
	"stol",
	"lampe",
	"høyttaler",
	"meme",
	"sang",
	"lapskaus",
	"tøffel",
	"energi",
	"flææ",
	"mæff",
	"beezy",
	"paraply",
	"pære",
	"osteskive",
	"mann",
	"dame"
];

function randomElement(array) {
	return array[random(0, array.length - 1, false)];
}

export default function humanReadableIdentifier() {
	return [adjectives, substantives].map(randomElement).join(" ");
}
