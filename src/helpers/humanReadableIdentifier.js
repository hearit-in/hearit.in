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
	"tøffel",
	"flæææææææ",
	"departement",
	"biff",
	"pils",
	"paraply",
	"pære",
	"osteskive",
	"mann",
	"dame",
	"bil",
	"fest",
	"gris",
	"kake",
	"Norge",
	"Ivar Aasen",
	"\"jeg\"-person",
];

function randomElement(array) {
	return array[random(0, array.length - 1, false)];
}

export default function humanReadableIdentifier() {
	return [adjectives, substantives].map(randomElement).join(" ");
}
