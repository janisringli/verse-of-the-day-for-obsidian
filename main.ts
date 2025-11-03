import { Plugin, Editor, requestUrl, RequestUrlParam } from "obsidian";
import { VerseSettingsTab } from "./settings";

interface VerseSettings {
	language: string;
	outgoingLink: boolean;
	versionId: string;
}
const DEFAULT_SETTINGS: VerseSettings = {
	language: "en",
	outgoingLink: true,
	versionId: "111",
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
		console.info("loading Verse of the Day plugin");
		await this.loadSettings();
		//TODO: Make this a setting inside a config
		this.addSettingTab(new VerseSettingsTab(this.app, this));

		this.addCommand({
			id: "insert-verse-of-the-day",
			name: "Insert Daily Verse",
			editorCallback: async (editor: Editor) => {
				const verseData = await this.getVerseOfTheDay(
					this.settings.language,
					this.settings.versionId ?? DEFAULT_SETTINGS.versionId
				);
				let book;
				let number;
				if (verseData) {
					if (this.settings.outgoingLink == true) {
						//TODO: Make this a setting inside a config
						if (
							Array.from(verseData.reference)[0] == "1" ||
							Array.from(verseData.reference)[0] == "2" ||
							Array.from(verseData.reference)[0] == "3"
						) {
							number = verseData.reference.split(" ")[0];
							book =
								"[[" +
								number +
								". " +
								verseData.reference.split(" ")[1] +
								"]]";
						} else {
							book =
								"[[" + verseData.reference.split(" ")[0] + "]]";
						}
					} else {
						book = "";
					}
					const verseMd =
						//this is a comment to block the lint from moving the link to the next line
						//TODO:Change link to be dynamic
						`>[!bible] Verse of the Day - [ ${verseData.reference}](${verseData.link}) ${book}
                        >${verseData.verse}</br> - ${verseData.reference}\n`;
					// Insert the verse at the current cursor position
					editor.replaceSelection(verseMd);
				} else {
					console.error("Failed to fetch verse data");
				}
			},
		});
	}

	async onunload() {}

	async getVerseOfTheDay(
		userLanguage: string,
		versionId: string // Renamed to versionId for clarity
	): Promise<{ verse: string; reference: string; link: string } | null> {
		console.info("Getting verse of the day");

		const options: RequestUrlParam = {
			method: "GET",
			url: `https://www.bible.com/${userLanguage}/verse-of-the-day`,
		};
		console.log(`https://www.bible.com/${userLanguage}/verse-of-the-day`);
		try {
			const response = await requestUrl(options);

			// Assuming response.text() contains the HTML
			const data: string =
				typeof response === "string" ? response : response.text;

			// Use the specified pattern to match the desired text
			const pattern =
				/<a class="w-full no-underline" href="(\/\w{2}\/bible\/\d{1,4}\/.*?)"/;
			const match = data.match(pattern);

			if (match != null) {
				const versePath: string = match[1];

				
				const targetPath = versePath.replace(
					/\/\d+\//,
					`/${versionId}/`
				);

				const versionRequest: RequestUrlParam = {
					method: "GET",
					url: `https://www.bible.com/${targetPath}`,
				};
				try {
					const versionResponse = await requestUrl(versionRequest);

					// 🆕 1. Define the pattern for extracting the full URL from the JSON-like data
					const urlPattern = /"@id":"(.*?)"/;

					// 2. Perform the URL matching
					const urlMatch = versionResponse.text.match(urlPattern);

					// 3. Extract the full URL
					let fullLinkURL = "";
					if (urlMatch && urlMatch.length > 1) {
						fullLinkURL = urlMatch[1]; // e.g., https://www.bible.com/bible/111/MAT.9.37-38.NIV
					}


					// 4. Define other necessary Regular Expression patterns
					const versionPattern =
						/p class="text-text-light dark:text-text-dark text-17 md:text-19 leading-default md:leading-comfy font-aktiv-grotesk font-medium mbe-2">(.*?)<\/p>/;
					const headingPattern =
						/h2 class="text-text-light dark:text-text-dark font-bold font-aktiv-grotesk">(.*?)<\/h2>/;

					// 5. Perform the HTML content matching
					const versionMatch =
						versionResponse.text.match(versionPattern);
					const headingMatch =
						versionResponse.text.match(headingPattern);

					// 6. Extract and return the data if all matches are successful
					if (
						versionMatch &&
						versionMatch.length > 1 &&
						headingMatch &&
						headingMatch.length > 1 &&
						fullLinkURL 
					) {
						// Extract the text from the capturing groups
						const verseText: string = versionMatch[1];
						const fullReference: string = headingMatch[1];

						// The final returned object
						return {
							reference: fullReference,
							verse: verseText,
							link: fullLinkURL,
						};
					}
					console.log(
						"One or more required pieces of data failed to match."
					);
					return null; 
				} catch (error) {
					console.error(
						"An error occurred during the version request:",
						error
					);
					return null;
				}

				
			} 
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
		return null;
	}
}
