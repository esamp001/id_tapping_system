const cron = require("node-cron");
const simpleGit = require("simple-git");
const git = simpleGit();

cron.schedule("*/5 * * * *", async () => {
    const now = new Date().toLocaleString();
    console.log(`⏱️ Running auto commit at ${now}...`);

    try {
        await git.add(".");
        await git.commit(`Auto commit: ${now}`);
        await git.push("origin", "main");
        console.log(`✅ Auto commit & push done at ${now}`);
    } catch (error) {
        console.error(`❌ Error at ${now}`, error);
    }
});
