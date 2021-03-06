const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
	if(args.length == 0) return message.channel.send(argsError("Veuillez mettre une commande.", "1 argument attendu.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	let command = args[0];
	let commandName;
	if(client.commands.has(command)) commandName = command;
	else if(!client.commands.has(command) || client.commands.get(client.aliases.has(command))) {
		try {commandName = client.commands.get(client.aliases.get(command)).config.name;} catch(e) {}
	}
	if(client.commands.has(commandName) || client.commands.get(client.aliases.has(commandName))) {
		commandName = client.commands.get(commandName) || client.commands.get(commands.aliases.get(command));
		let commandTotal = commandName.run.toString();
		if(commandTotal.length > 2000) {
			for(let i = 0; i < commandTotal.length/1990; i++) {
				message.channel.send("```js\n"+commandTotal.slice(i*1990, (i+1)*1990)+"```");
			}
		} else {
			message.channel.send(`\`\`\`js\n${commandName.run.toString()}\`\`\``);
		}
	} else {
		return message.channel.send(argsError("Cette commande n'a pas été trouvée.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	}

}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["gc"],
	serverForced: false
}

module.exports.help = {
	description: "Renvoie le code d'une [commande].",
	utilisations: `getcode [commande]`,
	exemples: ``
}