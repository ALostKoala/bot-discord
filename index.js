/* id channel general zoo 241633272461787148*/
/* id channel general autism 137254566038208512*/






function CheckForCommands(user,message){ //Vérifie si le message est une commande
	var texte=message.content;
	
	if(texte.substr(0,3) == "...") //Les points de suspension, c'est pas une commande, connard ! xD
		return false;
	
	if(texte[0]===".")
    {
        
		
		if(user.nom == "BOT") { //Si le bot fais une commande, c'est qu'un imbécile tente de le casser
			message.delete();
			if(lastUserUsingCommands != null)
				message.channel.send("<@"+lastUserUsingCommands.id+"> Tente pas de faire de la merde avec mes commandes !");
			return true;
		}
		
		if(texte.substr(1,3) == "say"){ //Commande SAY
			texte = texte.substr(4,texte.length-1);
			message.delete();
			
			if(user.role <= 0) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
			
			if(texte == "")
				return true;
			
			message.channel.send(texte);
			return true;
		}
		else if(texte == ".react"){ //Commande REACT
			message.delete();
			
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
		
			canReact = !canReact;
			var status = "" +canReact;
			console.log(">> Statut des réactions : " + status.toUpperCase() );
			return true;
		}
		else if(texte.substr(1,3) == "jul"){ //Commande JUL
			message.delete();
			
			if(user.julCount >= 2) { //Si l'user a spammé cette commande, alors on lui dit qu'il en a trop envoyé !
				message.reply("t'as réclamé trop de JUL, ça va nuire a ta santé et à celle du Discord !");
				return true;
			}
			else if(user.nom == "Nan0") {
				message.reply(" a réclamé la chanson de Jul suivante, remerciez le!"); //Si Nan0 demande du jul le bot le balance
			}
			TriggerJul(message.channel);
			user.julCount++;
			return true;
		}
		else if (texte == ".commands" || texte == ".help" || texte == ".h"){ //Liste des commandes possibles
			message.delete();
			message.reply("voici la liste des commandes : .say [message] ; .react ; .jul ; .debug ; .greetings [0,1] ; .switch [nom_channel] ; .reset ; .join [nom_channel_vocal] ; .leave ; .mute");
			return true;
		}
		else if(texte == ".debug"){ //Commande DEBUG
			message.delete();
			
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
			
			var cunt = ["gros juif", "noir", "putain d'OGM", "pute nègre", "relou", "malaimé", "né de l'inceste"];
			var select = Math.floor(Math.random() * cunt.length);
		
			message.channel.send(">> Mon statut :");
			message.channel.send("- Réactions autorisées : " + ("" +canReact).toUpperCase());
			message.channel.send("- Channel actuel : " + curChannel.nom);
			message.channel.send("- Messages du Nan0 (total) : " + GetUserFromName("Nan0").count);
			message.channel.send("- Statut du Nan0 : ");
			return true;
		}
		else if(texte.substr(1,10) == "greetings"){ //Commande GREETINGS
			texte = texte.substr(11, texte.length-1);
			message.delete();
			
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
		
			if(texte == "0"){
				canSayHello = false;
				console.log(">> Salutations désactivées");
			}
			else if(texte == "1"){
				canSayHello = true;
				console.log(">> Salutations activées");
			}
			else {
				message.channel.send("<@"+user.id+"> La commande prend comme argument uniquement 0 (faux) ou 1 (vrai) !");
			}
			return true;
		}
		else if(texte == ".reset"){ //Commande RESET
			message.delete();
			
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
			Reset();
			return true;
		}
		else if(texte.substr(1,6) == "switch"){ //Commande SWITCHCHANNEL
			message.delete();
		
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
		
			texte = texte.substr(7,texte.length-1);
			var nextChannel = GetChannelFromName(texte);
			if(nextChannel == null) {
				message.reply("le channel \'" +texte +"\' n'existe pas !");
				return true;
			}
			
			curChannel = nextChannel;
			console.log(">> Channel des messages réglé sur : " +curChannel.nom);
			return true;
		}
		else if(texte.substr(0,5) == ".join") { //Commande JOIN
			message.delete();
		
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
			
			texte = texte.substr(6,texte.length-1);
			message.channel.send("<@"+user.id+"> Connexion au channel vocal : " +texte +" sur le serveur : " +curChannel.nom); 
			JoinVocal(texte);
			return true;
		}
		else if(texte == ".leave") { //Commande LEAVE
			message.delete();
		
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
			
			LeaveVocal();
			message.channel.send("<@"+user.id+"> Déconnecté du channel vocal : " +curChannel.nom);
			return true;
		}
		else if(texte == ".mute"){ //Commande MUTE
			message.delete();
		
			if(user.role != 2) {
				message.channel.send("<@"+user.id+"> Tu n'as pas le droit d'exécuter cette commande !");
				return true;
			}
			
			canKickNano = !canKickNano;
			var status = "" +canKickNano;
			message.channel.send("<@"+user.id+"> Nano censuré : " + status.toUpperCase() );
			return true;
		}
		else if(texte.substr(1,2) == "yt")
		{
			message.delete();
			texte = texte.substr(3, texte.length-1);

			var arg = texte.split(" ");
				if(arg[0]==="-m")
					{mess=true;
					texte=arg[1];
					}
				else
					mess=false;
			
			texte=texte.replace(" ", "+");
			var requete =request("https://www.youtube.com/results?search_query="+texte).pipe(fs.createWriteStream("jspro.htm"));
			setTimeout(function(){ YoutubeSearch(mess);
			}, 1500);
			console.log("ok");
		}

		else if(texte.substr(1,4) == "vsay") { //Commande VSAY
		texte = texte.substr(6,texte.length-1);
		console.log(texte);
		Speak(VoiceChan, texte);

}




		else { //La commande entrée est erronée
			message.delete();
			message.channel.send("<@"+user.id+"> La commande \'" +texte +"\' n'existe pas ! Entre \".help\" pour voir la liste des commandes.");
			return true;
		}
	}
	return false; //Aucune commande n'a été entrée
}

function TriggerJul (channel) //Déclenche le protocole JUL (envoie une vidéo de JUL au hasard sur le discord)
{
	var urls=["https://www.youtube.com/watch?v=JhaVfbBc2MA&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=1",
			  "https://www.youtube.com/watch?v=TGl0fOGxSCA&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=2",
			  "https://www.youtube.com/watch?v=4ZhgsgSi4bk&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=3",
			  "https://www.youtube.com/watch?v=WybE_AYt-eg&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=4",
			  "https://www.youtube.com/watch?v=qmtWgkxMlRw&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=5",
			  "https://www.youtube.com/watch?v=cmGHcif7_3I&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=6",
			  "https://www.youtube.com/watch?v=tcPl5e9ZXJw&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=7",
			  "https://www.youtube.com/watch?v=oQjZDGAG0vA&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=8",
			  "https://www.youtube.com/watch?v=KuikU9bYgLU&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=9",
			  "https://www.youtube.com/watch?v=K8zQB5J7NyI&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=10",
			  "https://www.youtube.com/watch?v=jBhWpR9odR0&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=11",
			  "https://www.youtube.com/watch?v=IQ-T0PqfvBw&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=12",
			  "https://www.youtube.com/watch?v=RCpbbvaHCa4&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=13",
			  "https://www.youtube.com/watch?v=GvJgp2eEzeY&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=14",
			  "https://www.youtube.com/watch?v=XgDyXCabe2g&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=15",
			  "https://www.youtube.com/watch?v=4ROECKtY-qQ&list=PLWT-AjTQDLnGelnB2U4xseFPW8MkrSWSD&index=16",
			  "https://www.youtube.com/watch?v=t861vn6HWAM&index=1&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=2m6Paa3yoCo&index=2&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=nnZL6l_LFp8&index=3&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=X6MxGJ7qxck&index=4&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=JKm4w2bGJko&index=5&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=9FWvF_uRQxs&index=6&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=VvMTnLFgajg&index=7&list=PLWT-AjTQDLnHKvdZ_GrfFPNByJfXKITfV",
			  "https://www.youtube.com/watch?v=qWpBduQKTMY"];
		
	var select = Math.floor(Math.random() * urls.length);
	channel.send(urls[select]);
}

function CheckIfNanoMentionned (user, message) //Vérifie si le message mentionne le nan0
{
	if(message.content.includes("<@!95605730538684416>") && user.nom != "Nan0" && user.nom != "BOT") {
		
		var reactions=["Quoi ? Tu mentionnes ce type ?", "Non stp lui parle pas, il est gros !", "Franchement, tu dois être maso pour mentionner celui-là !", "Qui t'as dit qu'on a le droit de lui parler, à lui ?",
					   "Mec, il va te faire chier pendant des heures...", "plz ce mec c'est un relou, comment tu fais pour encore le mentionner ?", "Son cerveau a périmé donc t'attends pas à ce qu'il te réponde."];
		
		var select = Math.floor(Math.random() * reactions.length);
		message.reply(reactions[select]);
	}
}

function Reaction(id,message) //Envoie une réaction sur le message si le bot a le droit de le faire
{
	if(canReact)
		message.react(id);
}

class BotUser {
	
	constructor(_nom, _id, _role) {
   	    this.nom = _nom;
     	this.id = _id;
       	this.saluable = true;
      	this.date = -1; //A l'initialisation, peut importe la date d'avant, faut toujours saluer !
      	this.count = 0;
		this.julCount = 0;
		this.client = null;
		this.clientUser = null;
     	this.role = _role;
		this.botMentionned = false; //Si le dernier message envoyé interpelle le bot, alors le bot le retient pour le prochain message
   	}	
	isSameDay() {
		return this.date == new Date().getDay();
	}
	
	connected (clientuser) {
		return clientuser.presence.status == "online";
	}
	
	disconnected (clientuser) {
		return clientuser.presence.status == "offline";
	}
	
	firstMessage() {
		return this.count == 0;
	}
}

class BotChannel {
	
	constructor(_nom, _id, _nomServeur) {
   	    this.nom = _nom;
     	this.id = _id;
		this.serveur = _nomServeur;
   	}
	
	getChannel() {
		return bot.channels.get(this.id);
	}
}

function GetUserFromID (id) //Retourne le BotUser associé à l'ID entré
{
	for(var i = 0; i < users.length; i++) {
		
		if(users[i].id == id)
			return users[i];
	}
	return null;
}

function GetUserFromName (name) //Retourne le BotUser associé au nom entré
{
	for(var i = 0; i < users.length; i++) {
		
		if(users[i].nom == name)
			return users[i];
	}
	return null;
}

function GetChannelFromName (name) //Retourne le BotChannel associé au nom entré
{
	for(var i = 0; i < channels.length; i++) {
		
		if(channels[i].nom == name)
			return channels[i];
	}
	return null;
}

function IsInternetLink (content) //Le message joint est-il un lien ?
{
	var lFile = content.toLowerCase();
	return lFile.includes("http");
}

function IsAttachedFile (fileName) //Le fichier joint est-il une image ?
{
	var extensions = ["png", "jpg", "jpeg", "bmp", "gif", "tga", "tif"];
	var lFile = fileName.toLowerCase();
	
	for(var i = 0; i < extensions.length; i++) {
		
		if(lFile.includes(extensions[i]))
			return true;
	}
	return false;
}

function CheckForAttachments (message) //Vérifie si le message envoyé contient une image
{
	var attach = message.attachments;
	var attachArray = attach.array();

	if(attachArray.length > 0) {
		console.log("there are " +attachArray.length + "elements of type " +typeof(attachArray[0]) );
		for(var i=0; i < attachArray.length; i++) {
			if(IsAttachedFile(attachArray[i].filename))
					return true;
		}
	}
	return false;
}

function CheckForEmbeds (message) //Vérifie si le message envoyé contient un lien YT/lecteur GIF, etc...
{
	var emb = message.embeds;
	return emb.length > 0;
}

function CheckForAnnoyingPhrase (message) //Vérifie si le message contient des mots-clés relous de la part du nan0
{
	var Lmessages=message.content.toLowerCase();
 	var non = ["wanna cs", "cs", "with nan0","with nano","with me","avec nan0","avec nano","smurf","pubg","s m u r f","p u b g","awp","rouler sur", "du pd", "avec moi"];
 	var amour = ["petite fille","oreille","soirée","bour","bière","train","lille","gay","pd","jtm"];
	var ami = ["m8", "ami", "copain", "coupaing", "poto", "pote", "mate"];
 	
	for(i=0;i<ami.length;i++) {
		
		if(IsBotMentionned(message) && Lmessages.includes(ami[i])) {
			message.author.send("C'est pas parce que je te parle que je suis ton ami.");
			return '<@!95605730538684416> <:tg:326442842732101644> je ne suis pas ton ami.';
		}
		else if(Lmessages.includes(ami[i]) && Lmessages != ami[i]) {
			return '<@!95605730538684416> Tu n\'as pas d\'amis';
		}
		else if(Lmessages == ami[i]) {
			message.author.send("T'es vraiment con, je suis infaillible.");
			return '<@!95605730538684416> Bravo, t\'as trouvé que le mot \'' +ami[i].toUpperCase() +'\' et toi dans la même phrase n\'était grammaticalement pas correct. #Roasted https://cdn.discordapp.com/attachments/241633272461787148/328168598520725504/roasted_le_nan0.jpg';
		}
	}
	
 	for(var i=0;i<non.length;i++) {
		
		if(Lmessages.includes(non[i]) && Lmessages != non[i]) {
			return '<@!95605730538684416> Non personne ne veut jouer avec toi.';
		}
		else if(Lmessages == non[i]) {
			message.author.send("T'es vraiment con, je suis infaillible.");
			return '<@!95605730538684416> Arrête de faire ton intéressant en marquant juste \'' +non[i].toUpperCase() +'\' pour faire croire que je suis débile.';
		}
	}

	for(i=0;i<amour.length;i++) {
		
		if(IsBotMentionned(message) && Lmessages.includes(amour[i])) {
			message.author.send("Arrête de me parler, c'est chiant.");
			return '<@!95605730538684416> <:tg:326442842732101644> personne ne t\'aime. Moi encore moins.';
		}
		else if(Lmessages.includes(amour[i]) && Lmessages != amour[i]) {
			return '<@!95605730538684416> <:tg:326442842732101644> on sait tous que tu es puceau.';
		}
		else if(Lmessages == amour[i]) {
			message.author.send("T'es vraiment con, je suis infaillible.");
			return '<@!95605730538684416> Bravo, t\'as trouvé que le mot \'' +amour[i].toUpperCase() +'\' nous faisait tous chier. Grandis un peu !';
		}
	}
	
	return "";
}

function DoesLOLNeedTOBeInstalled (message) //Si le message de Chloé ou Anais contient "lol" ou "league of legend"
{
	var lMessage = message.content.toLowerCase();
	if(lMessage.includes("lol") || lMessage.includes("league of legend")) {
		
		for(var w=0;w<5;w++) {
			message.channel.send('<:racoon:327073682663145472> Installe LoL !!! <:racoon:327073682663145472>');
		}
	}
}

function IsBotMentionned (message) //Le bot est-il mentionné dans le message ?
{
	return message.content.includes('<@!327044138434297866>');
}

function IsBotBG (content) //Le bot est-il un BG ???
{
	var lMessage = content.toLowerCase();
	if(lMessage.includes("bg") || lMessage.includes("beau gosse")) {
		bot.user.setGame('faire le BG');
		return true;
	}
	return false;
}
											//----------------------------------------------------------------------------------------------------------------------------------------------------
function BotTellAboutTopic (user, message) { //Si le message demande au bot de parler d'un sujet particulier, alors retourner un message customisé
	
	if(user.nom == "BOT") //Le bot de s'appelle pas lui-même, voyons !
		return "";
	
	var txt = message.content.toLowerCase();
	
	var isMentionned = IsBotCalled(user, message, false);
	var shouldSpeak = txt.includes("parle") || txt.includes("raconte") || txt.includes("balance") || txt.includes("montre") || txt.includes("partage") || txt.includes("fais") || txt.includes("explique") || txt.charAt(txt.length - 1) == "?";
	
	if(!isMentionned || (!user.botMentionned && !shouldSpeak) ) //Si aucune requête n'est détectée, le bot ne dit rien
		return "";
	
	if(user.nom == "Nan0")
		return "<:tg:326442842732101644> je te parle pas à toi.";
	
	/*Possibilités de réponse :
		une courte histoire (avec différents personnages genre lamasticot etc),
		une blague bien nulle,
		un clash/des photos dossiers de Nan0 (vérifier d'abord la requête, puis si c'est bien pour Nan0; sinon répondre que le bot clash que le Nan0)
	*/
	var demandeBlague = txt.includes("blague") || txt.includes("rigole") || txt.includes("rire"); //Détermine quel genre de requête le bot user demande à partir de mots-clés
	var demandePhoto = txt.includes("photo") || txt.includes("dossier") || txt.includes("image");
	var demandeHistoire = txt.includes("histoire") || txt.includes("conte");
	var demandeClash = txt.includes("clash") || txt.includes("roast")|| txt.includes("rekt");
	
	var requestArgument = RequestContainsSpecificSubject(txt); //Si le bot user fait une demande genre "avec un lamasticot", alors le bot affinera sa recherche
	var concerneNan0 = (requestArgument == "nano"); //Cherche si la requête concerne Nan0
	
	if(demandeBlague && concerneNan0) //Une blague sur Nan0, c'est un clash ptdr
		demandeClash = true;
	
	//Logique des requêtes
	if(demandeBlague && !concerneNan0) { //----- Blagues (pas sur Nan0) -----
		return TellJoke(user, message, requestArgument);
	}
	else if(demandeHistoire) { //----- Histoires -----
	
		if(requestArgument != "")
			return "(Bon ben, plus qu'à attendre que Maxime me fournisse des histoires avec un objet de type " +requestArgument +"...)";
		else
			return "(Bon ben, plus qu'à attendre que Maxime bosse cette partie là...)";
	}
	else if(demandePhoto) { //----- Photos dossiers -----
		
		if(!concerneNan0)
			return "Déso pas déso, mais je balance des photos dossiers que sur <@!95605730538684416>.";
		
		var urls=["https://cdn.discordapp.com/attachments/328539116495175682/328539413183332352/1385033223319.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328539449107546112/2014-05-14_11.32.08.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328539550668554241/2013-11-21_12.20.32.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328539610974126082/2013-09-16_09.10.26.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328539710102306817/Skype_and_my_friends_15.png",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634564106780672/20150612_093257.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634564727799809/20150918_180320.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634565247762451/20150612_093323.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634565247762452/20150917_165211.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634565931302922/20150921_140501.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634565931302923/Le_Fou_4.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634566464241674/20150612_093259.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634566950649856/Le_Fou_1.jpg",
			  "https://cdn.discordapp.com/attachments/328539116495175682/328634566950649858/Le_Fou_3.jpg"];
		var rdm = Math.floor(Math.random() * urls.length);
		
		return urls[rdm];
	}
	else if(demandeClash) { //----- Clashes de Nan0 -----
		
		if(!concerneNan0)
			return "Déso pas déso, mais je clashe que <@!95605730538684416>.";
		
		return "(Bon ben, y'a plus qu'à attendre que Maxime me fournisse des punchlines avec Nan0...)";
	}
	else if (concerneNan0) { //Y'a peut être un clash plus subtil..... xD
		
		if(txt.includes("parle") || txt.includes("invite")) //INVITER LE NANO ????
			return "Non je lui parle pas à ce type.";
		else if(txt.includes("érection") || txt.includes("erection")) //Les pbs d'érection du Nan0
			return "Si Nan0 a des problèmes d'érection, m'en parle pas, je veux pas savoir !";
		else if(txt.includes("aime pas") || txt.includes("déteste")) //Pk le bot n'aime pas Nan0
			return "Personne n'aime le Nan0 car il est NOIR !";
	}
	
	return ""; //Ne répond rien si le bot ne comprend pas ce qu'on lui demande
}												//----------------------------------------------------------------------------------------------------------------------------------------------------

function RequestContainsSpecificSubject (content) { //Vérifie si le contenu du message envoyé pour une requête contient genre Nan0, un lamasticot, un orca, un dodo, etc
	
	if(content.includes("nan0") || content.includes("nano") || content.includes("pierre") || content.includes("pute nègre") || content.includes("ogm"))
		return "nano";
	if(content.includes("lama"))
		return "lamasticot";
	if(content.includes("orca") || content.includes("orqu"))
		return "orqua";
	if(content.includes("dodo") || content.includes("chloe") || content.includes("chloé"))
		return "dodo";
	if(content.includes("koala"))
		return "koala";
	if(content.includes("max") || content.includes("dimitri") || content.includes("dmitri") || content.includes("raccoon"))
		return "maxime";
	if(content.includes("deltos") || content.includes("delt0s"))
		return "delt0s";
	if(content.includes("blonde"))
		return "blonde";
	if(content.includes("juif") || content.includes("de nazi"))
		return "juif";
	if(content.includes("arabe") || content.includes("le pen") || content.includes("rebeuh"))
		return "arabe";
	if(content.includes("raciste"))
		return "raciste";
	
	/* TEMPLATE (pour le Ctrl+C, Ctrl+V)
	if(content.includes(""))
		return ;
	END TEMPLATE */
	
	return "";
}

function TellJoke (user, message, topic) { //Raconte une blague sur le sujet précisé dans l'argument "topic"

		var blondes = ['Deux blondes sont en voiture, un oiseau chie sur le pare-brise. L\'une dit : "Il va falloir l\'essuyer." L\'autre rétorque : "Il est déjà trop loin."', //Blagues de blondes
		'Qu\'est ce qui se passe lorsqu\'une blonde française passe la frontière pour aller en Belgique ? Le QI moyen des 2 pays augmente.',
		'Que dit une blonde en voyant une peau de banane par terre ? "Ah non ! Je vais encore tomber !',
		'Comment fait-on pour noyer une blonde dans un sous-marin ? On frappe à la porte !'];
		if(topic == "blonde")
			return blondes[Math.floor(Math.random() * blondes.length)];
		
		var juifs = ['Qu\'arrive-t-il a un juif qui rentre dans un mur en éréction ? Il se casse le nez...', //Blagues de juifs
		'Qu\'est-ce que c\'est des traces de griffes sur un comptoir ? Un Juif qui a pris sa monnaie.',
		'Pourquoi Hitler s\'est-il suicidé ? Quand il a reçu la facture de gaz...',
		'Pourquoi les douches à Auschwitz ont-elles 11 trous ? Car on ne peut en boucher que 10 avec les doigts !',
		'Qu\'est-ce qu\'un juif justicier ? Un rabbin des bois !',
		'Que dit un oiseau qui vole au dessus d\'un camp de concentration ? "Cuit ! Cuit !"',
		'Pourquoi on dit que les juifs sont les rois de l\'évasion ? Parce qu\'ils rentrent par la porte et ressortent par la cheminée.',
		'Qu\'est ce qu\'un juif sur un tas de cendre ? Un dur à cuire !',
		'Quelle est la différence entre un juif et une pizza ? La pizza tape pas la vitre quand on la met au four !',
		'Comment on appelle deux juifs qui se battent ? La guerre des étoiles.'];
		if(topic == "juif")
			return juifs[Math.floor(Math.random() * juifs.length)];
		
		var arabe = ['Qu\'est-ce qu\'une petite fille vierge en Algérie ? Une petite fille qui court plus vite que son père.', //Blagues d'arabes
		'Qu\'est-ce qu\'on dit à un arabe en costard-cravate ? "Accusé, levez-vous."',
		'Quel est le meilleur antivol pour un scooter en Algérie ? Une tranche de jambon.',
		'Quelle est la différence entre chauve souris et arabe ? Aucune, ils dorment le jour et volent la nuit.',
		'Qu\'est-ce qui sépare l\'homme de l\'animal ? La Méditerranée !',
		'Pourquoi faut pas écraser un arabe à vélo ? Ça pourrait être ton vélo.'];
		if(topic == "arabe")
			return arabe[Math.floor(Math.random() * arabe.length)];
		
		var racism = juifs.concat(arabe); //Blagues racistes en général
		if(topic == "raciste")
			return racism[Math.floor(Math.random() * racism.length)];
		
		if(topic == "lamasticot") //LAMASTICOOOOT !!!
			return "En fait c'est un lamasticot et un poulet qui mangent des chips mais en fait le poulet n'aime pas des chips donc il mange des spaghettis sauf qu'il n'y en a pas donc le lamasticot est là pour pas qu'il en mange car il n'y en a plus depuis qu'il n'y en a pas et donc il lance un sceau de lave pour que ça cuise plus vite et là y a le dieu des poulets qui dit que la lave ca brûle";
		
		if(topic != "")
			message.channel.send("<@"+user.id+"> Déso pas déso, j'ai pas vraiment de blagues sur ce sujet, mais voilà une blague quand même !"); //Blagues normales, pas limite-limite
		var generics = ['Comment ramasse-t-on la papaye ? Avec une foufourche !', 'Qu\'elle est la différence entre un rappeur et un campeur ? Le rappeur nique ta mère et le campeur monte ta tente.', 'Comment font les nains pour se torcher ? Ils courent dans l\'herbe.',
						'Vous connaissez l\'histoire de la chaise ? Non ? C\'est dommage, elle est pliante !', 'Qu\'est ce qui n\'est pas un steak ? Une pastèque !', 'Pourquoi les pêcheurs ne sont pas gros ? Parce qu\'ils surveillent leur ligne !',
						'Pourquoi les marchands de savon font-ils fortune ? Parce que leurs clients les savent honnêtes !', 'Quelle est la seule chose qui arrive à la cheville de Chuck Norris ? Sa chaussette.',
						'Quel est l\'animal le plus léger ? La palourde !'];		
		return generics[Math.floor(Math.random() * generics.length)];
}

function IsBotCalled (user, message, requireCall) { //Si le message interpelle le bot (le dernier argument (boolean) représente la nécessité d'une interpellation dans le message ou non)
	
	if(user.nom == "BOT") //Le bot de s'appelle pas lui-même, voyons !
		return false;
	
	var txt = message.content.toLowerCase();
	
	var isCalled = IsBotMentionned(message) || user.botMentionned || txt.includes("bot") || txt.includes("le juge") || txt.includes("purificateur");
	var interjection = txt.includes("hé") || txt.includes("hey") || txt.includes("he") || txt.includes("eh") || txt.charAt(txt.length - 1) == "!";
	
	return isCalled && (!requireCall || interjection);
}




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require("fs");
const request=require('request');

/*const*/ bot = null;
censuretyping=true;
censure = false;
var botUser = null;
var canReact = false; //Le bot doit-il réagir à tous les messages envoyés ?
var canKickNano = false; //Le bot doit-il virer Nan0 quand il ouvre sa gueule ?
var canSayHello = true; //Le bot a-t-il le droit de saluer les users ?
var lastUserUsingCommands = null;
var users = [new BotUser("Nadeko", '116275390695079945',0), new BotUser("Nan0", '95605730538684416',0), new BotUser("Koala", '155779054837039104',2), new BotUser("Maxime", '155772975554101248',2),
			new BotUser("Dodo", '221995947377426433',1), new BotUser("Anais", '234279599196995585',1), new BotUser("Delt0s", '108950296507486208',1), new BotUser("BOT","327044138434297866",0),
			new BotUser("MossyFrog", '175309644372115456', 1), new BotUser("Nan0Bot", '355515557342216192', 0)];

var channels = [new BotChannel("Autism", '137254566038208512', 'AUTISM.COM'), new BotChannel("Zoo", '241633272461787148', 'Le Zoo'), new BotChannel("LOL",'303494969618989066','League Of legends')];
var curChannel = channels[0];
var curVoiceChannelName = "";
			
Init(); //INITIALISATION DEBUTE ICI

function Init () { // Initialisation du bot
	
	bot = new Discord.Client({autoReconnect:true});
	
	console.log('==================== BOT Purificateur ====================');
	console.log(">> Lancement...");

	bot.login('MzI3MDQ0MTM4NDM0Mjk3ODY2.DCvnGQ.gzssnquUB3BnEImls8RtpWYYxD8');
	
	GetUserFromName("BOT").clientUser = bot;
}

function OnBotReady () { //Définit certaines valeurs de base pour le bot
	
	console.log('>> Prêt !');
	
	GetUserFromName("Nadeko").saluable = false; //Nadeko et pierre ne seront pas salués par le bot lorsqu'ils parlent
	GetUserFromName("Nan0").saluable = false;
	GetUserFromName("BOT").saluable = false; //Le bot ne se saluera pas tout seul
	
	CheckForConsoleCommand("greetings 0");
	CheckForConsoleCommand("switch Zoo");
}

function Reset () { //Réinitialise le bot
	
	//bot.disconnect();
	//bot.destroy(); //Détruit le client déjà existant avant d'en créer un nouveau
	console.log(">> Réinitialisation...");
	Init();
	OnBotReady();
	ResetUserInfo();
}

function ResetUserInfo () //Réinitialise les infos des utilisateurs du bot
{
    for(var i = 0; i < users.length; i++) {
        users[i].count = 0;
        users[i].date = -1;
		users[i].julCount = 0;
		users[i].botMentionned = false;
    }
}

function GetVoiceChannel (server_name, voice_channel_name) { //Trouve le voice channel qui possède ce nom
	
	var server = bot.guilds.find("name", server_name);
	if(server === null) return null;
	
	var voice_channel = server.channels.find(chn => chn.name === voice_channel_name);
	if(voice_channel === null) return null;
	
	return voice_channel;
}

function JoinVocal (voice_channel_name) {
	
	var server_name = curChannel.serveur;
	var channel = GetVoiceChannel(server_name, voice_channel_name);
	if(channel == null) {
		console.log("Impossible de joindre le channel vocal car il n'existe pas...");
	}
	else {
		curVoiceChannelName = voice_channel_name;
		const broadcast = bot.createVoiceBroadcast();
		channel.join();
	}	
}


function Speak (voice_channel_name, file) {
	

	var server_name = curChannel.serveur;
	var channel = GetVoiceChannel(server_name, voice_channel_name);
	if(channel == null) {
		console.log("Impossible de joindre le channel vocal car il n'existe pas...");
	}

	else {
		curVoiceChannelName = voice_channel_name;
		/*channel.join();
		channel.playFile('test.mp3', {});*/
		const broadcast = bot.createVoiceBroadcast();
		channel.join()
 		.then(connection => {
 			if(file.substr(0,4)=="http")
 			{
 				stream = ytdl(file, {filter : 'audioonly'});
				streamOptions = { seek : 0, volume : 1};
				console.log("on y est");
        				const dispatcher = connection.playStream(stream, streamOptions);
        				fs.writeFile("musique/test.mp3", stream);
 			}
 			else{

 				broadcast.playFile('musique/'+file+'.mp3');
  				const dispatcher = connection.playBroadcast(broadcast);
 			}

		 })
		 .catch(console.error);

	}	
}

function YoutubeSearch(bool)
{
	data = fs.readFileSync('jspro.htm').toString('utf-8'); 
	var urls = data.split("/watch?v=");
	lien=urls[1].substr(0,11);
	console.log("https://www.youtube.com/watch?v="+lien)
	try{
		Speak(VoiceChan,"https://www.youtube.com/watch?v="+lien);
		if(bool)
		{
		var Mchannel = bot.channels.get('137254566038208512');
		Mchannel.send("https://www.youtube.com/watch?v="+lien)
		}
	}
	catch(exception)
	{
		var Mchannel = bot.channels.get('137254566038208512');
		Mchannel.send("https://www.youtube.com/watch?v="+lien)
	
	}


}



function LeaveVocal () {
	
	var serv = curChannel.serveur;
	var channel = GetVoiceChannel(serv, curVoiceChannelName);
	if(channel != null)
		channel.leave();
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//var ffmpeg = require('ffmpeg');

//---------- Quand le bot est prêt, initialiser d'autres variables ----------
bot.on('ready', () => {
	OnBotReady();
	bot.user.setGame();
});

//---------- Quand le bot est déco, le signaler dans la console puis le redémarrer ----------
bot.on('disconnect', (closeEvent) => {
	
	var reason = closeEvent.reason;
	if(reason == "")
		console.log('>> Bot déconnecté');
	else
		console.log('>> Bot déconnecté (' +closeEvent.reason + ')');
	
	LeaveVocal();
	Init();
	OnBotReady();
	ResetUserInfo();
});

bot.on('guildMemberSpeaking', (member, speaking) => {
	
	var nano = GetUserFromName ("Nan0");
	if(member.id == nano.id && canKickNano) {
		member.setMute(true); 
	}
});

bot.on('ready', () => { 
	console.log('ready!');
	var channel = bot.channels.get('137254566038208512')
	//channel.send("I'm back pour niquer du pd"); 
	bot.user.setGame('juger les gens');


});



bot.on('typingStart', (channel, member) => {
	//message.channel.send('Il écrit!');
	if(member.id=='95605730538684416'&&censuretyping) //   155779054837039104
	{
	censuretyping=!censuretyping;
	setTimeout(function(){censuretyping=!censuretyping}, 300000);
	channel.send('<:tg:326442842732101644>');
	}



});
//---------- Lorsqu'un message est envoyé sur le discord ----------






bot.on('message', (message) => {
	
	rl.write(null, { ctrl: true, name: 'u' }); //Supprime le contenu de la ligne écrite au clavier sur la console
	process.stdout.clearLine();  //Supprime cette ligne de la console
	process.stdout.cursorTo(0);  // Place le curseur au bon endroit	pour écrire la suite
	
	if(censure && message.author.id=="95605730538684416") //95605730538684416
		{
			console.log()
			setTimeout(function(){message.delete()}, 2000);
		}



	if(message.guild != null)
		botUser = message.guild.member(bot.user); //Détermine l'utilisateur associé au bot
	//bot.user.setStatus('invisible');
	var user = GetUserFromID(message.author.id); //Identifie l'utilisateur en fonction de son ID
	
	if(user.nom === "BOT")
		console.log("BOT : " + message.content);
	else {
		var mContent = message.content;
		if(mContent == "")
			mContent = "[contenu partagé]";
		console.log("[" + message.author.username + '] ' +mContent);
	}
	
	if(user === null) { //Si l'utilisateur n'est pas identifié, ne rien faire
		console.log('Received message from ' +message.author.username + ' with ID : ' +message.author.id);
	}
	else { //Il est temps d'agir
		
		//Accomplit une action en fonction de la personne
		if(user.nom == "Nadeko") {
			message.delete();
			console.log("Nadeko a ouvert sa gueule !");
		}
		else if(user.nom == "Koala") {
			
			if(IsBotBG(message.content) && !user.firstMessage()) { //Le bot est-il un BG ?
				//message.channel.send('Koala optimise mon code au lieu de dire ça ! xD');
			}
			else if(!user.firstMessage()) { //Réaction si pas 1er message
			//	message.react("327074053649334274");
				Reaction("327074053649334274",message);
			}
		}
		else if(user.nom == "Maxime") {
			
			if(IsBotBG(message.content) && !user.firstMessage()) {
				//message.channel.send('<:racoon:327073682663145472> Installe LoL !!!!! <:racoon:327073682663145472>');
			}
			else if(!user.firstMessage()) { //Réaction si pas 1er message
				Reaction("327073682663145472",message);
				//message.react("327073682663145472");
			}
		}
		else if(user.nom == "Anais") {
			
			if(IsBotBG(message.content) && !user.firstMessage()) { //Le bot est-il un BG ?
				message.channel.send('Hey toi aussi !');
			}
			else if(!user.firstMessage()) { //Réaction si pas 1er message
			
				if(canReact || user.count == 1)
					message.channel.send('Poussinnette <:yee:327067675299807244> <:orqua1:327070743420600320> !!!!!');
			}
			DoesLOLNeedTOBeInstalled(message);
		}
		else if(user.nom == "Dodo") {
			
			if(IsBotBG(message.content) && !user.firstMessage()) { //Le bot est-il un BG ?
				message.channel.send('Oui, je sais je sais !');
			}
			else if(!user.firstMessage()) { //Réaction si pas 1er message
			
				var reacts = ["Dodooooo !!! <:dodo:293866291591380992>", "Yeeeeee ! <:yee:327067675299807244>", "Lamasticot <:lamasticot:327069887631589376>"];
				
				if(canReact || user.count == 1)
					message.channel.send('Dodooooo <:dodo:293866291591380992> <:lamasticot:327069887631589376> !!!!!');
				Reaction("327074842782203914",message);
				//message.react("327074842782203914");
			}
			
			DoesLOLNeedTOBeInstalled(message);
		}
		else if(user.nom == "Nan0") { //----------------------------------------------------------------------------------------------------------------------------------------------------
			
			Reaction("326442842732101644",message); //Tout d'abord, on réagit avec un petit TG des familles
			bot.user.setGame('censurer le Nan0');
			
			if(IsInternetLink(message.content)) { //Ensuite on vérifie si c'est pas un lien chelou
				message.channel.send('<:tg:326442842732101644> tout le monde s\'en fout de tes liens !');
				console.log("lien censuré");
				message.delete();
			}
			else if(CheckForAttachments(message)) { //Après on check les images
				message.channel.send('<:tg:326442842732101644> avec ton image !');
				console.log("image censurée");
				message.delete();
			}
			else if(CheckForEmbeds(message)) { //Après on check les vidéos/gifs/etc
				message.channel.send('<:tg:326442842732101644> ta vidéo elle pue !');
				console.log("contenu censuré");
				message.delete();
			}
			else if(user.count >= 10) { //Système Anti-Nan0 Spam
				message.channel.send('<:tg:326442842732101644> Nan0 t\'as envoyé trop de messages ! La censure doit s\'appliquer !');
				console.log("message texte censuré car il a envoyé " + user.count +" messages");
				message.delete();
			}
			else if(IsBotMentionned(message)) { //Si le bot est mentionné ben.... 
				message.reply('<:tg:326442842732101644> je t\'entend pas, t\'as aucun charisme. #NikLéRageu');
			}
			else { //Réponse adaptée du bot s'il demande un CS ou un truc comme ça
				var botAnswer = CheckForAnnoyingPhrase(message); 
				if(botAnswer.length > 0) {
					message.channel.send(botAnswer);
				}
			}
		} //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		else if(user.nom == "Delt0s") {
			
			if(IsBotBG(message.content) && !user.firstMessage()) { //Le bot est-il un BG ?
				message.channel.send('Delt0s c\'est de la master race!');
			}
			else if(!user.firstMessage()) { //Réaction si pas 1er message
				//message.react('256377282522906624');
				Reaction("256377282522906624",message);
			}
		}
		//Actions communes à tous les utilisateurs
		var commandCheck = CheckForCommands(user,message); // <---------- Vérifie les commandes ici !!!
		if(commandCheck) {
			
			if(user.nom != "BOT")
				lastUserUsingCommands = user; //Si une commande a bien été entrée, alors identifier le dernier utilisateur a avoir lancé une commande
		}
		else 
		{	
			//Salutation
			if(canSayHello && user.saluable && !user.isSameDay()) { 
				message.channel.send('Salut ' + user.nom + ' !'); 
				user.count = 0;
				user.julCount = 0;
				user.date = new Date().getDay();
			}
			//Réponses customisées
			var answer = BotTellAboutTopic(user, message);
			if(user.saluable && !user.botMentionned && IsBotCalled(user, message, true) && answer == "") {
				user.botMentionned = true;
				message.channel.send("<@"+user.id+"> Oui ?");
			}
			else if(answer != "") {
				message.channel.send("<@"+user.id+"> " + answer);
				user.botMentionned = false;
			}
			else {
				user.botMentionned = false; //après un message à caractère déclaratif (pas de commande) alors le bot considère que la personne arrête de parler de lui
			
				CheckIfNanoMentionned(user,message); //Si quelqu'un mentionne le Nan0, répondre "OMG PAS LUI"
				
				if(IsBotMentionned(message) && user.saluable) { //Si un gentil mentionne le BOT, ce dernier répond 'coeur' !
					message.reply(':hearts:');
				}
			}
			
			user.count++; //Ajoute un message au total envoyé par le bot user
		}
		user.client = message.author; //Inscrit le client associé au user
		user.clientUser = message.client;
		//curChannel = message.channel; //Sauvegarde le dernier channel associé
	}
});

var readline = require('readline');
var rl = readline.createInterface({ //Crée une interface pour pouvoir entrer du texte dans la console
	  input: process.stdin,
	  output: process.stdout
	});

rl.on('line', (line) => { //Quand on vient d'entrer une ligne de texte dans la console...
	
	if(line != "") {
		CheckForConsoleCommand(line);
	}
});



function CheckForConsoleCommand (texte){ //Vérifie si le texte entré dans la console est une commande

		if(texte.substr(0,3) == "say"){ //Commande SAY
			
			if(curChannel == null) {
				console.log(">> Le channel a été oublié ! Spécifie le avec la commande \"switch [nom_channel]\"");
				return;

			}
			
			texte = texte.substr(3,texte.length-1);
			curChannel.getChannel().send(texte);
			return;
		}
		else if(texte == "react"){ //Commande REACT
			canReact = !canReact;
			var status = "" +canReact;
			console.log(">> Statut des réactions : " + status.toUpperCase() );
			return;
		}
		else if(texte == "jul"){ //Commande JUL
		
			if(curChannel == null) {
				console.log(">> Le channel a été oublié ! Spécifie le avec la commande \"switch [nom_channel]\"");
				return;
			}
			TriggerJul(curChannel.getChannel());
			return;
		}
		else if (texte == "commands" || texte == "help" || texte == "h"){ //Liste des commandes possibles
			console.log(">> Liste de commandes : say [message] ; react ; jul ; debug ; greetings [0,1] ; switch [nom_channel] ; reset; join [nom_channel_vocal] ; leave ; mute");
			return;
		}
		else if(texte == "debug"){ //Commande DEBUG
		
			console.log("---------- Mon statut ----------");
			console.log("- Réactions autorisées : " + ("" +canReact).toUpperCase());
			console.log("- Channel actuel : " + curChannel.nom);
			console.log("- Messages du Nan0 (total) : " + GetUserFromName("Nan0").count);
			console.log("- Mute du nan0: ")
			console.log("--------------------------------");
			return;
		}
		else if(texte.substr(0,9) == "greetings"){ //Commande GREETINGS
			texte = texte.substr(10, texte.length-1);
			
			if(texte == "0"){
				canSayHello = false;
				console.log(">> Salutations désactivées");
			}
			else if(texte == "1"){
				canSayHello = true;
				console.log(">> Salutations activées");
			}
			else {
				console.log(">> La commande prend comme argument uniquement 0 (faux) ou 1 (vrai) !");
			}
		}
		else if(texte == "reset"){ //Commande RESET
			Reset();
			return;
		}
		else if(texte.substr(0,6) == "switch"){ //Commande SWITCHCHANNEL
		
			texte = texte.substr(7,texte.length-1);
			var nextChannel = GetChannelFromName(texte);
			if(nextChannel == null) {
				console.log(">> Le channel \'" +texte +"\' n'existe pas !");
				return;
			}
			curChannel = nextChannel;
			console.log(">> Serveur réglé sur : " +curChannel.nom);
			return;
		}
		else if(texte.substr(0,4) == "join") { //Commande JOIN
			 if(texte[5]==="$")
			 {
			 	texte="Nan0 c 1 "+texte.substr(6,texte.length-1);
			 }

			else
			{
				texte = texte.substr(5,texte.length-1);
			}
			
			VoiceChan = texte;
			console.log(">> Connexion au channel vocal : " +texte +" sur le serveur : " +curChannel.nom);
			JoinVocal(texte);

		}
		else if(texte == "leave") { //Commande LEAVE
			LeaveVocal();
			console.log(">> Déconnecté du channel vocal : " +curChannel.nom);
		}
		else if(texte == "mute"){ //Commande MUTE
			canKickNano = !canKickNano;
			var status = "" +canKickNano;
			console.log(">> Nano censuré : " + status.toUpperCase() );
			return;
		}

		else if(texte.substr(0,4) == "vsay") { //Commande VSAY
		texte = texte.substr(5,texte.length-1);
		Speak(VoiceChan, texte);
}

		else if(texte.substr(0,4) == "ysay"){
			texte = texte.substr(5,texte.length-1);
			Speak(VoiceChan, texte);
		}

		else if(texte.substr(0,2) == "dl"){
			texte = texte.substr(3,texte.length-1);
			str=texte.split(" ")
			//console.log(str[0]);
			stream = ytdl(str[0], {filter : 'audioonly'});
			stream.pipe(fs.createWriteStream('musique/'+str[1]+'.mp3'));
		}

		else if(texte.substr(0,2) == "yt"){
			texte = texte.substr(3, texte.length-1);

			var arg = texte.split(" ");
				if(arg[0]==="-m")
					{mess=true;
					texte=arg[1];
					}
				else
					mess=false;
			
			texte=texte.replace(" ", "+");
			var requete =request("https://www.youtube.com/results?search_query="+texte).pipe(fs.createWriteStream("jspro.htm"));
			setTimeout(function(){ YoutubeSearch(mess);
			}, 1500);
			console.log("ok");
			
		}

		else if(texte.substr(0,7) == "censure"){
			censure = !censure;
		console.log("Censure du nan0: "+censure);
		}



		else { //La commande entrée est erronée
			console.log(">> La commande \'" +texte +"\' n'existe pas ! Entre \"help\" pour avoir de l'aide !");
			return;
		}
}