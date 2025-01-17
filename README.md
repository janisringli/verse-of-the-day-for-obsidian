## Verse of the Day for Obsidian

-   Add the Verse of the day provided by [YouVersion](https://www.bible.com) to your notes simply by using the command pallet from obsidian

[![Build for Bible Reference Project](https://github.com/tim-hub/obsidian-bible-reference/actions/workflows/build.yml/badge.svg)](https://github.com/janisringli/verse-of-the-day-for-obsidian/actions/workflows/build.yml)
[![verse of the day for obsidian user discussion forum](https://img.shields.io/badge/Issues-green)](https://github.com/janisringli/verse-of-the-day-for-obsidian/issues)

> These will be very appreciate for the project development. 👍
>
> -   👉 `Star` the Project
> -   ☕️ **Buy me a coffee** @[buymeacoffee](https://buymeacoffee.com/janisringli)
> -   ❤️ Provide Feedback in [`Issues`](https://github.com/janisringli/verse-of-the-day-for-obsidian/issues)

---

## About
<img width="500" alt="image" src="https://github.com/janisringli/verse-of-the-day-for-obsidian/assets/80834609/371cb0a6-fa8b-4235-8dab-233f0aa041f6">


## How to use

1. Open a note in Obsidian.md application
2. Click on the line where you want the verse to go
3. Open the Command pallet with `cmnd + p` or `ctrl + p`
4. Search for "insert verse of the day"
5. Select "Verse of the Day: Insert daily verse"


## Automation Instructions 
To automate using the "Verse of the Day" feature with Templater, follow these steps:
### Prerequisites
- Ensure you have installed the [[https://github.com/SilentVoid13/Templater|Templater]] plugin in your system.

### Steps to Set Up Automation
#### 1. Enable Trigger on New File Creation:
- Go to Templater settings and verify that the option "Trigger Templater on new file creation" is toggled on.

#### 2. Select the Template Folder:
- Confirm that the correct folder is selected as the "Template folder" in Templater settings.

#### 3. Add the Automation Command:
- Insert the following command into the template you wish to automate:
 ```<%* this.app.commands.executeCommandById("verse-of-the-day:insert-verse-of-the-day") %>```

#### 4. Create a New File:
- Use the template with the command added to create a new file. The automation will execute automatically.

### Additional Tips
-Ensure your template structure is correct and that the Templater plugin is active in your workspace.
-Test the setup with a dummy file before integrating it into your workflow.

Enjoy your automated "Verse of the Day" experience!


## Contribution and Credits

-   All different kinds of contributions are welcome,
-   Credits: [YouVersion](https://bible.com)

---

<a href="https://www.buymeacoffee.com/janisringli" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

> Special Thanks to all my coffee buyer's
>
> -   [Janis Ringli](https://github.com/janisringli)
