import verseOfTheDayPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class VerseSettingsTab extends PluginSettingTab {
	plugin: verseOfTheDayPlugin;
	containerEl: HTMLElement; // Add containerEl property
	constructor(app: App, plugin: verseOfTheDayPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty(); // Clear the container if it's not empty
		containerEl.createEl("h1", { text: "Settings" });

		new Setting(containerEl)
			.setName("Language")
			.setDesc("Language of the verse")
			.addDropdown((dropdown: any) => {
				dropdown.addOption("en", "English");
				dropdown.addOption("af", "Afrikaans");
				dropdown.addOption("am", "Amharic");
				dropdown.addOption("ar", "Arabic");
				dropdown.addOption("as", "Assamese");
				dropdown.addOption("be", "Belarusian");
				dropdown.addOption("bg", "Bulgarian");
				dropdown.addOption("bn", "Bengali");
				dropdown.addOption("ca", "Catalan");
				dropdown.addOption("ckb", "Central Kurdish");
				dropdown.addOption("cs", "Czech");
				dropdown.addOption("cy", "Welsh");
				dropdown.addOption("da", "Danish");
				dropdown.addOption("de", "German");
				dropdown.addOption("el", "Greek");
				dropdown.addOption("en-GB", "English (United Kingdom)");
				dropdown.addOption("eo", "Esperanto");
				dropdown.addOption("es", "Spanish");
				dropdown.addOption("es-ES", "Spanish (Spain)");
				dropdown.addOption("et", "Estonian");
				dropdown.addOption("fa", "Persian");
				dropdown.addOption("fi", "Finnish");
				dropdown.addOption("fr", "French");
				dropdown.addOption("gu", "Gujarati");
				dropdown.addOption("he", "Hebrew");
				dropdown.addOption("hi", "Hindi");
				dropdown.addOption("hr", "Croatian");
				dropdown.addOption("ht", "Haitian Creole");
				dropdown.addOption("hu", "Hungarian");
				dropdown.addOption("hy", "Armenian");
				dropdown.addOption("id", "Indonesian");
				dropdown.addOption("ig", "Igbo");
				dropdown.addOption("is", "Icelandic");
				dropdown.addOption("it", "Italian");
				dropdown.addOption("ja", "Japanese");
				dropdown.addOption("ka", "Georgian");
				dropdown.addOption("km", "Khmer");
				dropdown.addOption("kn", "Kannada");
				dropdown.addOption("ko", "Korean");
				dropdown.addOption("lt", "Lithuanian");
				dropdown.addOption("lv", "Latvian");
				dropdown.addOption("mk", "Macedonian");
				dropdown.addOption("ml", "Malayalam");
				dropdown.addOption("mn", "Mongolian");
				dropdown.addOption("mr", "Marathi");
				dropdown.addOption("ms", "Malay");
				dropdown.addOption("my", "Burmese");
				dropdown.addOption("my-MM", "Burmese (Myanmar)");
				dropdown.addOption("ne", "Nepali");
				dropdown.addOption("nl", "Dutch");
				dropdown.addOption("no", "Norwegian");
				dropdown.addOption("pa", "Punjabi");
				dropdown.addOption("pl", "Polish");
				dropdown.addOption("pt", "Portuguese");
				dropdown.addOption("pt-PT", "Portuguese (Portugal)");
				dropdown.addOption("ro", "Romanian");
				dropdown.addOption("ru", "Russian");
				dropdown.addOption("si", "Sinhala");
				dropdown.addOption("sk", "Slovak");
				dropdown.addOption("sl", "Slovenian");
				dropdown.addOption("sn", "Shona");
				dropdown.addOption("sq", "Albanian");
				dropdown.addOption("sr", "Serbian");
				dropdown.addOption("sv", "Swedish");
				dropdown.addOption("sw", "Swahili");
				dropdown.addOption("ta", "Tamil");
				dropdown.addOption("te", "Telugu");
				dropdown.addOption("tg", "Tajik");
				dropdown.addOption("th", "Thai");
				dropdown.addOption("tl", "Tagalog");
				dropdown.addOption("tr", "Turkish");
				dropdown.addOption("uk", "Ukrainian");
				dropdown.addOption("ur", "Urdu");
				dropdown.addOption("uz", "Uzbek");
				dropdown.addOption("vi", "Vietnamese");
				dropdown.addOption("yo", "Yoruba");
				dropdown.addOption("zu", "Zulu");
				dropdown
					.setValue(this.plugin.settings.language)
					.onChange((value: any) => {
						this.plugin.settings.language = value;
						this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName("Outgoing link")
			.setDesc(
				"Adds a outgoing link to the header that leads to another file inside your vault, for example [[John]]"
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.outgoingLink)
					.onChange((value) => {
						this.plugin.settings.outgoingLink = value;
						this.plugin.saveSettings();
					})
			);
	}
}
