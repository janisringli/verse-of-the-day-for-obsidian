import { Plugin, Editor, requestUrl, RequestUrlParam } from "obsidian";
import { IncomingMessage } from "http";
import * as https from "https";
import { VerseSettingsTab } from "./settings";

interface VerseSettings {
	language: string;
	outgoingLink: boolean;
}
const DEFAULT_SETTINGS: Partial<VerseSettings> = {
	language: "en",
	outgoingLink: true,
};

export default class VerseOfTheDayPlugin extends Plugin {
	settings: VerseSettings;
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
	async onload() {
		await this.loadSettings();
		//TODO: Make this a setting inside a config
		this.addSettingTab(new VerseSettingsTab(this.app, this));

		this.addCommand({
			id: "insert-verse-of-the-day",
			name: "Insert Daily Verse",
			editorCallback: async (editor: Editor) => {
				const verseData = await this.getVerseOfTheDay(
					this.settings.language
				);
				let book;
				let number;
				if (verseData) {
					if (this.settings.outgoingLink == true) {
						//TODO: Make this a setting inside a config
						if (
							Array.from(verseData.index)[0] == "1" ||
							Array.from(verseData.index)[0] == "2" ||
							Array.from(verseData.index)[0] == "3"
						) {
							number = verseData.index.split(" ")[0];
							book =
								"[[" +
								number +
								". " +
								verseData.index.split(" ")[1] +
								"]]";
						} else {
							book = "[[" + verseData.index.split(" ")[0] + "]]";
						}
					} else {
						book = "";
					}
					const verseMd =
						//this is a comment to block the lint from moving the link to the next line
						//TODO:Change link to be dynamic
						`>[!bible] Verse of the Day - [ ${verseData.index}](${verseData.link}) ${book}
						>${verseData.verse}</br> - ${verseData.index}\n`;
					// Insert the verse at the current cursor position
					editor.replaceSelection(verseMd);
				} else {
					console.error("Failed to fetch verse data");
				}

				// editor.replaceRange(verse, editor.getCursor());
			},
		});
	}

	async onunload() {}

	async getVerseOfTheDay(
		userLanguage: string
	): Promise<{ verse: string; index: string; link: string } | null> {
		// Construct the URL using string interpolation

		return new Promise((resolve, reject) => {
			const options: RequestUrlParam = {
				method: "GET",
				url: `https://www.bible.com/${userLanguage}/verse-of-the-day`,
			};
			requestUrl(options)
				.then((response: any) => {
					let data = "";
					response.onData((chunk: any) => {
						data += chunk;
					});
					response.onEnd(() => {
						// Use the specified pattern to match the desired text
						const pattern =
							/<div class="mbs-3 border border-l-large border-black pli-1 plb-1 pis-2">(.*?)<\/div>/s;
						const match: RegExpMatchArray | null =
							data.match(pattern);

						if (match) {
							const verseContainer: string = match[1].trim();

							// Extract the verse from the divContent using slice
							const slicedVerse: string = verseContainer.slice(
								verseContainer.indexOf(">") + 1,
								verseContainer.indexOf("</a>")
							);
							const verseIndex: string = verseContainer.slice(
								verseContainer.indexOf('25">') + 4,
								verseContainer.indexOf("</p")
							);
							const verseLinkContainer = verseContainer.slice(
								verseContainer.indexOf("</a>") + 1,
								verseContainer.indexOf("<p")
							);
							const verseLink: string =
								"https://www.bible.com" +
								verseLinkContainer.slice(
									verseLinkContainer.indexOf("href=") + 6,
									verseLinkContainer.indexOf('">')
								);
							resolve({
								verse: slicedVerse,
								index: verseIndex,
								link: verseLink,
							});
						} else {
							console.error("No match found for pattern.");
							resolve(null);
						}
					});
				})
				.catch((error: any) => {
					console.error("Error:", error);
					reject(error);
				});
		});
	}
}
