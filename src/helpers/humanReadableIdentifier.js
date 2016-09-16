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
	"rutete",
	"fortløpende",
	"midlertidig",
	"ortodoks",
	"Norsk",
	"fotogen",
	"saftig",
	"forskningsbasert",
	"statistisk",
	"særlig",
	"saklig",
	"usynlig",
	"helt uakseptabel",
	"deprimerende",
	"strategisk",
	
];

const substantives = [
	"lapskaus",
	"tøffel",
	"flææ",
	"mæff",
	"paraply",
	"pære",
	"osteskive",
	"mann",
	"dame",
	"bil",
	"fest",
	"Vegard",
	"gris",
	"kake",
	"Norge",
	"Ivar Aasen",
];

function randomElement(array) {
	return array[random(0, array.length - 1, false)];
}

export default function humanReadableIdentifier() {
	return [adjectives, substantives].map(randomElement).join(" ");
}
