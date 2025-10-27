const cron = require("node-cron");
const simpleGit = require("simple-git");
const git = simpleGit();

cron.schedule("*/10 * * * *", async () => {
    try {
        await git.add(".");
        await git.commit(`Auto commit: ${new Date().toLocaleString()}`);
        await git.push("origin", "main");
        console.log("✅ Auto commit & push done");
    } catch (error) {
        console.error(error);
    }
});
