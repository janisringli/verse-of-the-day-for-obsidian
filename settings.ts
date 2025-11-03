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
		const LANGUAGE_DEFAULT_VERSIONS: Record<string, string> = {
			en: "111", // New International Version (NIV)
			af: "6", // Afrikaans 1983
			am: "1260", // አዲሱ መደበኛ ትርጒም
			ar: "195", // المُبَسَّطَةُ
			be: "1723", // Біблія (пераклад В. Сёмухі)
			bg: "23", // Ревизиран
			ca: "335", // Bíblia Catalana, Traducción Interconfesional (BCI)
			ckb: "503", // كوردی سۆرانی ستانده‌رد
			cs: "15", // Bible 21 (B21)
			cy: "394", // Beibl Cymraeg Newydd Diwygiedig 2004 (BCND)
			da: "20", // Bibelen på Hverdagsdansk (BPH)
			de: "73", // Hoffnung für alle (HFA)
			el: "173", // Η Αγία Γραφή (Παλαιά και Καινή Διαθήκη)(TGV)
			es: "149", // Reina Valera (RVR1960)
			fa: "118", // هزارۀ نو
			fi: "330", // Kirkkoraamattu 1992 (FB92)
			fr: "133", // Parole de Vie 2017 (PDV2017)
			he: "24", // Habrit Hakhadasha/Haderekh (HD)
			hi: "1628", // सरल हिन्दी बाइबल (HSS)
			hr: "2475", // Biblija: suvremeni hrvatski prijevod (SHP)
			ht: "1957", // 1998 Haïtienne (HAT98)
			hu: "920", // Revised Hungarian Bible (RÚF)
			hy: "2329", // Նոր վերանայված Արարատ Աստվածաշունչ (ՆՎԱԱ)
			id: "306", // Alkitab Terjemahan Baru (TB)
			ig: "1624", // Baịbụlụ Nsọ nʼIgbo Ndị Ugbu a (TB)
			it: "122", // Nuova Riveduta 2006 (NR06)
			ja: "83", // リビングバイブル (JCB)
			km: "85", // ព្រះគម្ពីរភាសាខ្មែរបច្ចុប្បន្ន ២០០៥ (គខប)
			ko: "86", // 현대인의 성경 (KLB)
			lt: "86", // A. Rubšio ir Č. Kavaliausko vertimas su Antrojo Kanono knygomis (LBD-EKU)
			lv: "488", // 1965. gada Bībeles izdevuma revidētais teksts (RT65)
			mk: "1501", // Свето Писмо: Стандардна Библија 2006 (66 книги) (MK2006)
			ml: "2431", // സമകാലിക മലയാളവിവർത്തനം (MCV)
			mn: "1590", // Ариун Библи 2013 (АБ2013)
			mr: "3260", // पवित्रशास्त्र, मराठी समकालीन आवृत्ती (MRCV)
			ms: "377", // Alkitab Berita Baik (ABB)
			my: "386", // Judson Bible (JBMLE)
			ne: "1483", // नेपाली नयाँ संशोधित संस्करण (NNRV)
			nl: "1990", // Herziene Statenvertaling (HSV)
			no: "102", // Norsk Bibel 88/07 (NB)
			pl: "2095", // Biblia, to jest Pismo Święte Starego i Nowego Przymierza Wydanie pierwsze 2018 (SNP)
			pt: "211", // Nova Tradução na Linguagem de Hoje (NTLH)
			ro: "191", // Biblia sau Sfânta Scriptură cu Trimiteri 1924, Dumitru Cornilescu (VDC)
			ru: "143", // Новый русский перевод (НРП)
			sk: "3835", // Nádej pre kazdého (NPK)
			sn: "32", // Bhaibheri Dzvene MuChiShona Chanhasi (BDSC)
			sq: "292", // Bibla Shqip "Së bashku" 2020 (me DK) (AL1)
			sr: "1969", // Novi srpski prevod (NSPL)
			sv: "1223", // Svenska Folkbibeln 2015 (SFB15)
			sw: "74", // Biblia Habari Njema (BHN)
			ta: "2730", // இந்திய சமகால தமிழ் மொழிப்பெயர்ப்பு 2022 (TCV)
			te: "1787", // పరిశుద్ధ గ్రంథము O.V. Bible (TELUBSI)
			th: "174", // ฉบับมาตรฐาน (THSV11)
			tl: "399", // Magandang Balita Bible (Revised) (RTPV05)
			tr: "3763", // Temel Türkçe Tercüme (TTT)
			uk: "3269", // Новий Переклад Українською (НПУ)
			vi: "1638", // Kinh Thánh Hiện Đại (KTHD)
			
		};
		const { containerEl } = this;

		containerEl.empty(); // Clear the container if it's not empty

		new Setting(containerEl)
			.setName("Language")
			.setDesc("Language of the verse")
			.addDropdown((dropdown: any) => {
				dropdown.addOption("en", "English");
				dropdown.addOption("af", "Afrikaans");
				dropdown.addOption("am", "Amharic");
				dropdown.addOption("ar", "Arabic");
				dropdown.addOption("be", "Belarusian");
				dropdown.addOption("bg", "Bulgarian");
				dropdown.addOption("ca", "Catalan");
				dropdown.addOption("ckb", "Central Kurdish (Sorani)");
				dropdown.addOption("cs", "Czech");
				dropdown.addOption("cy", "Welsh");
				dropdown.addOption("da", "Danish");
				dropdown.addOption("de", "German");
				dropdown.addOption("el", "Greek");
				dropdown.addOption("es", "Spanish");
				dropdown.addOption("fa", "Persian (Farsi)");
				dropdown.addOption("ht", "Haitian Creole");
				dropdown.addOption("hr", "Croatian");
				dropdown.addOption("hu", "Hungarian");
				dropdown.addOption("fi", "Finnish");
				dropdown.addOption("fr", "French");
				dropdown.addOption("he", "Hebrew");
				dropdown.addOption("hi", "Hindi");
				dropdown.addOption("ckb", "Central Kurdish (Sorani)");
				dropdown.addOption("id", "Indonesian");
				dropdown.addOption("ig", "Igbo");
				dropdown.addOption("it", "Italian");
				dropdown.addOption("ja", "Japanese");
				dropdown.addOption("km", "Khmer");
				dropdown.addOption("lt", "Lithuanian");
				dropdown.addOption("lv", "Latvian");
				dropdown.addOption("mk", "Macedonian");
				dropdown.addOption("ml", "Malayalam");
				dropdown.addOption("mn", "Mongolian");
				dropdown.addOption("mr", "Marathi");
				dropdown.addOption("ms", "Malay");
				dropdown.addOption("my", "Burmese");
				dropdown.addOption("ne", "Nepali");
				dropdown.addOption("nl", "Dutch");
				dropdown.addOption("no", "Norwegian");
				dropdown.addOption("pl", "Polish");
				dropdown.addOption("pt", "Portuguese");
				dropdown.addOption("ro", "Romanian");
				dropdown.addOption("ru", "Russian");
				dropdown.addOption("sk", "Slovak");
				dropdown.addOption("sn", "Shona");
				dropdown.addOption("sq", "Albanian");
				dropdown.addOption("sr", "Serbian");
				dropdown.addOption("sv", "Swedish");
				dropdown.addOption("sw", "Swahili");
				dropdown.addOption("ta", "Tamil");
				dropdown.addOption("te", "Telugu");
				dropdown.addOption("th", "Thai");
				dropdown.addOption("tl", "Tagalog");
				dropdown.addOption("tr", "Turkish");
				dropdown.addOption("uk", "Ukrainian");
				dropdown.addOption("vi", "Vietnamese");
				dropdown.addOption("yo", "Yoruba");
				dropdown.addOption("zu", "Zulu");
				dropdown
					.setValue(this.plugin.settings.language)
					.onChange(async (value: string) => {
						// Use async for saveSettings
						this.plugin.settings.language = value;

						// 1. Set the default version based on the selected language
						this.plugin.settings.versionId =
							LANGUAGE_DEFAULT_VERSIONS[value] || "111";

						// 2. Save settings
						await this.plugin.saveSettings();

						// 3. IMPORTANT: Re-render the settings tab to update the "Translation" dropdown options
						this.display(); // <--- THIS IS THE FIX
					});
			});
		new Setting(containerEl)
			.setName("translation")
			.setDesc("Select the Bible translation to use")
			.addDropdown((dropdown) => {
				if (this.plugin.settings.language === "en") {
					dropdown.addOption("1", "King James Version (KJV)");
					dropdown.addOption(
						"111",
						"New International Version (NIV)"
					);
					dropdown.addOption("59", "English Standard Version (ESV)");
					dropdown.addOption("1204B", "World English Bible (WEB)");
					dropdown.addOption(
						"2692",
						"New American Standard Bible (NASB)"
					);
					dropdown.addOption("114", "New King James Version (NKJV)");
					dropdown.addOption("116", "New Living Translation (NLT)");
				}
				if (this.plugin.settings.language === "af") {
					dropdown.addOption("6", "Afrikaans 1983");
					dropdown.addOption("117", "Nuewe Lewende Vertaling");
					dropdown.addOption("3499", "Die Bybel 2020-vertaling");
					dropdown.addOption("50", "Die Boodskap");
				}
				if (this.plugin.settings.language === "am") {
					dropdown.addOption("1260", "አዲሱ መደበኛ ትርጒም");
					dropdown.addOption("3198", "አማርኛ 2005");
					dropdown.addOption("3867", "አማርኛ 1962");
				}
				if (this.plugin.settings.language === "ar") {
					dropdown.addOption("195", "المُبَسَّطَةُ");
					dropdown.addOption("101", "كتاب الحياة");
					dropdown.addOption("13", "الكتاب المقدس");
				}
				if (this.plugin.settings.language === "be") {
					dropdown.addOption("1723", "Біблія (пераклад В. Сёмухі)");
				}
				if (this.plugin.settings.language === "bg") {
					dropdown.addOption("23", "Ревизиран");
				}
				if (this.plugin.settings.language === "ca") {
					dropdown.addOption(
						"335",
						"Bíblia Catalana, Traducción Interconfesional (BCI)"
					);
				}
				if (this.plugin.settings.language === "ckb") {
					dropdown.addOption("503", "كوردی سۆرانی ستانده‌رد");
				}
				if (this.plugin.settings.language === "cs") {
					dropdown.addOption("15", "Bible 21 (B21)");
				}
				if (this.plugin.settings.language === "cy") {
					dropdown.addOption(
						"394",
						"Beibl Cymraeg Newydd Diwygiedig 2004 (BCND)"
					);
				}
				if (this.plugin.settings.language === "da") {
					dropdown.addOption("20", "Bibelen på Hverdagsdansk (BPH)");
				}
				if (this.plugin.settings.language === "de") {
					dropdown.addOption("73", "Hoffnung für alle (HFA)");
					dropdown.addOption("157", "Schlachter (SCH2000)");
					dropdown.addOption("51", "Lutherbibel 192 (DELUT)");
					dropdown.addOption("57", "Elberfelder Bibel (ELB)");
				}
				if (this.plugin.settings.language === "el") {
					dropdown.addOption(
						"173",
						"Η Αγία Γραφή (Παλαιά και Καινή Διαθήκη)(TGV)"
					);
				}
				if (this.plugin.settings.language === "es") {
					dropdown.addOption("149", "Reina Valera (RVR1960)");
					dropdown.addOption(
						"127",
						"Nueva Traducción Viviente (NTV)"
					);
					dropdown.addOption(
						"128",
						" Nueva Versión Internacional (NVI)"
					);
					dropdown.addOption(
						"176",
						"Traducción en Lenguaje Actual (TLA)"
					);
					dropdown.addOption(
						"146",
						"Reina Valera Contemporánea (RVC)"
					);
				}
				if (this.plugin.settings.language === "fa") {
					dropdown.addOption("118", "هزارۀ نو");
				}
				if (this.plugin.settings.language === "fi") {
					dropdown.addOption("330", "Kirkkoraamattu 1992 (FB92)");
				}
				if (this.plugin.settings.language === "fr") {
					dropdown.addOption("133", "Parole de Vie 2017 (PDV2017)");
					dropdown.addOption(
						"93",
						"La Sainte Bible par Louis Segond 1910 (LSG)"
					);
					dropdown.addOption("21", "La Bible du Semeur 2015 (BDS)");
				}
				if (this.plugin.settings.language === "he") {
					dropdown.addOption("24", "Habrit Hakhadasha/Haderekh (HD)");
				}
				if (this.plugin.settings.language === "hi") {
					dropdown.addOption("1628", "सरल हिन्दी बाइबल (HSS)");
				}
				if (this.plugin.settings.language === "hr") {
					dropdown.addOption(
						"2475",
						"Biblija: suvremeni hrvatski prijevod (SHP)"
					);
				}
				if (this.plugin.settings.language === "ht") {
					dropdown.addOption("1957", "1998 Haïtienne (HAT98)");
				}
				if (this.plugin.settings.language === "hu") {
					dropdown.addOption("920", "Revised Hungarian Bible (RÚF)");
					dropdown.addOption("84", "Karoli Bible 1908 (HUNK)");
					dropdown.addOption(
						"1239",
						"Magyar Bibliatársulat új fordítású Bibliája (HUNB)"
					);
				}
				if (this.plugin.settings.language === "hy") {
					dropdown.addOption(
						"2329",
						"Նոր վերանայված Արարատ Աստվածաշունչ (ՆՎԱԱ)"
					);
				}
				if (this.plugin.settings.language === "id") {
					dropdown.addOption("306", "Alkitab Terjemahan Baru (TB)");
				}
				if (this.plugin.settings.language === "id") {
					dropdown.addOption("306", "Alkitab Terjemahan Baru (TB)");
					dropdown.addOption(
						"27",
						"Alkitab dalam Bahasa Indonesia Masa Kini (BIMK)"
					);
					dropdown.addOption(
						"320",
						"Terjemahan Sederhana Indonesia (TSI)"
					);
					dropdown.addOption(
						"2727",
						"Firman Allah Yang Hidup (FAYH)"
					);
				}
				if (this.plugin.settings.language === "ig") {
					dropdown.addOption(
						"1624",
						"Baịbụlụ Nsọ nʼIgbo Ndị Ugbu a (TB)"
					);
				}
				if (this.plugin.settings.language === "it") {
					dropdown.addOption("122", "Nuova Riveduta 2006 (NR06)");
				}
				if (this.plugin.settings.language === "ja") {
					dropdown.addOption("83", "リビングバイブル (JCB)");
				}
				if (this.plugin.settings.language === "km") {
					dropdown.addOption(
						"85",
						"ព្រះគម្ពីរភាសាខ្មែរបច្ចុប្បន្ន ២០០៥ (គខប)"
					);
				}
				if (this.plugin.settings.language === "ko") {
					dropdown.addOption("86", "현대인의 성경 (KLB)");
				}
				if (this.plugin.settings.language === "lt") {
					dropdown.addOption(
						"86",
						"A. Rubšio ir Č. Kavaliausko vertimas su Antrojo Kanono knygomis (LBD-EKU)"
					);
				}
				if (this.plugin.settings.language === "lv") {
					dropdown.addOption(
						"488",
						"1965. gada Bībeles izdevuma revidētais teksts (RT65)"
					);
				}
				if (this.plugin.settings.language === "mk") {
					dropdown.addOption(
						"1501",
						"Свето Писмо: Стандардна Библија 2006 (66 книги) (MK2006)"
					);
				}
				if (this.plugin.settings.language === "ml") {
					dropdown.addOption("2431", "സമകാലിക മലയാളവിവർത്തനം (MCV)");
				}
				if (this.plugin.settings.language === "mn") {
					dropdown.addOption("1590", "Ариун Библи 2013 (АБ2013)");
				}
				if (this.plugin.settings.language === "mr") {
					dropdown.addOption(
						"3260",
						"पवित्रशास्त्र, मराठी समकालीन आवृत्ती (MRCV"
					);
				}
				if (this.plugin.settings.language === "ms") {
					dropdown.addOption("377", "Alkitab Berita Baik (ABB)");
				}
				if (this.plugin.settings.language === "my") {
					dropdown.addOption("386", "Judson Bible (JBMLE)");
				}
				if (this.plugin.settings.language === "ne") {
					dropdown.addOption(
						"1483",
						"नेपाली नयाँ संशोधित संस्करण (NNRV)"
					);
					dropdown.addOption(
						"1711",
						"सरल नेपाली पवित्र बाइबल (सरल नेपाली)"
					);
					dropdown.addOption("2671", "पवित्र बाइबल (NERV)");
					dropdown.addOption(
						"3261",
						"पवित्र बाइबल, नेपाली समकालीन संस्करण (NCV)"
					);
				}
				if (this.plugin.settings.language === "nl") {
					dropdown.addOption(
						"1990",
						"Herziene Statenvertaling (HSV)"
					);
					dropdown.addOption("328", "NBG-vertaling 1951 (NBG51)");
					dropdown.addOption("75", "Het Boek (HET)");
					dropdown.addOption(
						"165",
						"Statenvertaling (Importantia edition) (STV)"
					);
				}
				if (this.plugin.settings.language === "no") {
					dropdown.addOption("102", "Norsk Bibel 88/07 (NB)");
				}
				if (this.plugin.settings.language === "pl") {
					dropdown.addOption("2095", "Biblia, to jest Pismo Święte Starego i Nowego Przymierza Wydanie pierwsze 2018 (SNP)");
					dropdown.addOption("138", "UWSPÓŁCZEŚNIONA BIBLIA GDAŃSKA (UBG)");
					dropdown.addOption("319", "Nowa Biblia Gdańska (NBG)");
					dropdown.addOption("3490", "Biblia Warszawska 1975 (BW1975)");
				}
				if (this.plugin.settings.language === "pt") {
					dropdown.addOption("211", "Nova Tradução na Linguagem de Hoje (NTLH)");
					dropdown.addOption("1608", "Almeida Revista e Atualizada (ARA)");
					dropdown.addOption("129", "Nova Versão Internacional - Português (NVI)");
					dropdown.addOption("1930", "Bíblia Sagrada, Nova Versão Transformadora (NVT)");
					dropdown.addOption("212", "Almeida Revista e Corrigida (ARC)");
				}
				if (this.plugin.settings.language === "ro") {
					dropdown.addOption("191", "Biblia sau Sfânta Scriptură cu Trimiteri 1924, Dumitru Cornilescu (VDC)");
					dropdown.addOption("126", "Noua Traducere Românească (NTR)");
					dropdown.addOption("1454", "Biblia în Versiune Actualizată 2018 (BVA)");
					dropdown.addOption("903", "Biblia Traducerea Fidela 2015 (BTF2015)");
				}
				if (this.plugin.settings.language === "ru") {
					dropdown.addOption("143", "Новый русский перевод (НРП)");
				}
				if (this.plugin.settings.language === "sk") {
					dropdown.addOption("3835", "Nádej pre kazdého (NPK)");
				}
				if (this.plugin.settings.language === "sn") {
					dropdown.addOption("32", "Bhaibheri Dzvene MuChiShona Chanhasi (BDSC)");
					dropdown.addOption("1960", "Shona Bible 1949, revised 2002 (SNA2002)");
					dropdown.addOption("2262", "Bhaibhiri Idzva rechiShona (SCLB)");
				}
				if (this.plugin.settings.language === "sq") {
					dropdown.addOption("292", "Bibla Shqip \"Së bashku\" 2020 (me DK) (AL1)");
				}
				if (this.plugin.settings.language === "sr") {
					dropdown.addOption("1969", "Novi srpski prevod (NSPL)");
				}
				if (this.plugin.settings.language === "sv") {
					dropdown.addOption("1223", "Svenska Folkbibeln 2015 (SFB15)");
					dropdown.addOption("154", "Bible 2000 (B2000)");
					dropdown.addOption("916", "nuBibeln (NUB)");
				}
				if (this.plugin.settings.language === "sw") {
					dropdown.addOption("74", "Biblia Habari Njema (BHN)");
					dropdown.addOption("164", "Maandiko Matakatifu ya Mungu Yaitwayo Biblia (SUV)");
					dropdown.addOption("2647", "Neno: Bibilia Takatifu 2025 (NENO)");
					dropdown.addOption("1818", "Swahili Revised Union Version (SRUV)");
				}
				if (this.plugin.settings.language === "ta") {
					dropdown.addOption("2730", "இந்திய சமகால தமிழ் மொழிப்பெயர்ப்பு 2022 (TCV)");
				}
				if (this.plugin.settings.language === "te") {
					dropdown.addOption("1787", "పరిశుద్ధ గ్రంథము O.V. Bible (TELUBSI)");
				}
				if (this.plugin.settings.language === "th") {
					dropdown.addOption("174", "ฉบับมาตรฐาน (THSV11)");
					dropdown.addOption("275", "พระคัมภีร์ไทย ฉบับ 1971 (THB1971)");
					dropdown.addOption("179", "พระคริสตธรรมคัมภีร์ไทย ฉบับอมตธรรมร่วมสมัย (TNCV)");
					dropdown.addOption("203", "พระคริสตธรรมคัมภีร์: ฉบับอ่านเข้าใจง่าย (THA-ERV)");
				}
				if (this.plugin.settings.language === "tl") {
					dropdown.addOption("399", "Magandang Balita Bible (Revised) (RTPV05)");
					dropdown.addOption("1264", "Ang Salita ng Diyos (ASD)");
					dropdown.addOption("2169", "Ang Biblia (1905/1982) (ABTAG)");
					dropdown.addOption("2195", "Ang Biblia, 2001 (ABTAG01)");
				}
				if (this.plugin.settings.language === "tr") {
					dropdown.addOption("3763", "Temel Türkçe Tercüme (TTT)");
				}
				if (this.plugin.settings.language === "uk") {
					dropdown.addOption("3269", "Новий Переклад Українською (НПУ)");
				}
				if (this.plugin.settings.language === "vi") {
					dropdown.addOption("1638", "Kinh Thánh Hiện Đại (KTHD)");
				}
				if (this.plugin.settings.language === "yo") {
					dropdown.addOption("911", "Bíbélì Mímọ́ ní Èdè Yorùbá Òde-Òní (BOMY)");
					dropdown.addOption("2754", "Bibeli Mimọ (YBCV)");
					dropdown.addOption("207", "Yoruba Bible (YCE)");
				}
				if (this.plugin.settings.language === "zu") {
					dropdown.addOption("286", "IBHAYIBHELI ELINGCWELE (ZUL59)");
					dropdown.addOption("3500", "IsiZulu 2020 (ZUL20)");
					dropdown.addOption("3846", "Contemporary Zulu Bible 2024 (CZB24)");
				}


				dropdown.setValue(this.plugin.settings.versionId);
				dropdown.onChange((value) => {
					this.plugin.settings.versionId = value;
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
