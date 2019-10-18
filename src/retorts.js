let SWIFTBOT_FANCLUB = "478663825910923274"
let SPEAKEASY_SHITPOSTING = "615700979123486721"
let BTZ_TESTING = "548727225038405633"
let GENERAL_WHITELIST = [SWIFTBOT_FANCLUB, SPEAKEASY_SHITPOSTING, BTZ_TESTING]

function randomRetort(input) {
	return input[random(input.length)]
}

retortData = {
	"wuteat": ["A dick", "Penis", "Gyros", " Filet Mignon", "Steak", "Eat shit and die", "My ass", "Kebab", "Borscht", "Italian", " Happy Meal", "Nothing, fatty", "Stir fry", " MONGORIAN", "Sushi", " Casey's taco pizza", " Home Depot hotdog", "An entire fucking can of beans", "Chicken noodle soup", "Shepherd's pie", "Apple pie", "Eggplant", "Creamed corn", "Roasted corn", " Welsh cawl", "Beef with broccoli", "Korean Grilled Beef", "Roast pork and sweet potatoes", "Andouille and chicken Jambalaya", "Homemade foot-long sub", "Trail mix", "Potato soup", "Baked potato", " Chik-Fil-A", " Jesus Chicken", " Chipotle", " Taco Bell", " Five Guys", " Five Guys, but not the burger joint", " Crème fraîche", "A nice goat-cheese and hierloom tomato frittata, topped with a little crème fraîche", "Pan-roasted chicken", "A potato-encrusted scallop with lobster foam topped with some crème fraîche", "Asian slaw on flat bread, deconstructed and topped with a nice Parmesan aioli", "Baked ziti with basil and fresh mozzarella", "Corndog", "Candied apple", " Tide pods", "Crayons", "Raw, uncooked corn", "A shitload of olives", " Escargot", "Deli lunch meat sandwich", " Kentucky Friend Chicken", " Jell-O pudding cups", "Space cakes", "Edibles", "Skittles", "Turkey meat Lunchables", " Scooby-Snacks fruit snacks", " Froot-By-The-Foot"],
	"wutdrink": ["Unholy Trinity (1/2 Vodka, 1/2 Everclear, 1/2 Absinthe)", "Diet water, you grotesque fuck", "High quality H2O", "White wine", "Red wine", "Bong water", "Moonshine", " Mike's Hard lemonade, you pansy ass", " Mike's Harder lemonade, you slightly less pansy ass", "Vodka", "Kvass", " V8 fruit juice", "Bleach", "Gamer girl bath water", "Antifreeze", "An entire bottle of NyQuil", "Hot dog water", "Beer", " Naturdays", " White Claw", " Wild Turkey", " Majitos", " Cletus' backwoods moonshine", " Jägerbombs", " Red Bull and Windex 50/50", "Lemonade", " Coca-Cola", " Pepsi", " Dr. Thunder", " HeeHaw", " MTN DEW® AMP® GAME FUEL®", " Everclear", "Bourbon", "Gin and juice", "Riot juice", "Jungle juice", " Old Fashioned", " FireClean Weapons Oil", "Squirt", " Mexican pineapple soda", " Lester's Fixins ranch dressing soda (You fucking won't, pussy.)", "Prison wine", " Soviet-style fermented BMP Door Drank™", "Samogon", " Ginger Ale", "Sake", "Breast milk", "Brotein", " Mojito", " Long Island Ice Tea", " Arizona Ice Tea", " Cherry Limeade", "Grape drank", " Martini", "Fearless redneck", "Toilet water", "Dick sucker", "Dirty red-headed slut", " Jell-O shots", " UV Blue"],
	"howfuck": ["Definitely anal", "Rough anal", "Shut the fuck up, virgin", "succ", "Fellatio", "Cunnilingus", "Analingus", "Brojob (no homo)", "You shouldn't be having sex until after marriage, and only then in the missionary position for the sole purpose of procreation", "Doggy", "Army style", "Cowgirl", "Reverse cowgirl", "Amazon position", "Alaskan pipeline", "Make an angry dragon", "Balls deep. Literally put the balls inside there along with the penis", "Buttstuff, but just the tip to see how it feels", "Tittyfuck", "Don't kid yourself.  We both know you're just going to masturbate by yourself again", "Sixty-nine", "Pegging", "Slow missionary with uninterrupted, prolonged eye contact", "Slow missionary with uninterrupted, prolonged eye contact with your best homie", "Hotdog windshield wiper", "Sad, disinterested handjob", "Painting their face", "As if anyone would fuck you", "Fountain of youth", "Tongue-punch the fartbox", "Dutch rudder", " ICE/migrant child roleplay", "A good ol' fashioned dick sucking", "Suck on them toes", "Shake them titties, pop that pussy, let me see that doo-doo brown", "Dog + peanut butter", "Do that one thing where you strap yourself in and wrap a belt around your neck after weaving it through the bedframe or headboard so it's supporting all your weight, then start masturbating with fervor until your face starts to feel numb because you're beginning to hyperventilate and deprive your brain of oxygen from artery constriction, that way you pass out and lose consciousness when you climax for a super cool headrush.  Bring a spotter so @-Jake and @Trentv4 don't have to come get you 15 hours later after you've died and pissed and shit everywhere", "Make a DIY gloryhole and see what happens", "Over-the-pants handjob", "Bring in the gimp", "For five seconds like always", "Goatse tribute", "www.pornhub.com - You're not breaking the cycle tonight", "You should be denying others your essence so as to preserve the purity of your precious bodily fluids", "Throw on all of your Vietnam gear and have your partner wear those racist Asian-eye sunglasses. Then have her put on silk black pajamas and stand by the bed. Kick in the door and buttstroke her with an M16A1 and then bury her face into the mattress with one hand as you throw the rifle aside and undo your pants with the other. Have your way with her while shouting 'MANA-SAN LIKE THAT YOU FUCKING [slur] FUCK?!'. After you nut, drive to her home town immediately and light as much of it on fire as possible"],
	"wherefuck": ["In a classroom", "In the bedroom", "In a sidecar motorcycle", "In a hotel", "In the pool", "In a treehouse", "In a childrens' park", "In the rehab parking lot", "In an ambulance", "In an airplane", "In your dreams", "In a porta-shitter", "In the handicap stall", "In the backseat of your car", "In the front seat of your car", "In the woods, raw dogging, just like nature intended", "In your recliner", "At the airport terminal", "At the police station", "In your cousin's bathroom at your niece's bar mitzvah", "On the couch at your psych eval", "On the kitchen table", "On your desk", "On the couch", "Right here, right now.  Dick out, pants off", "In the shower", "On a balcony", "Against the wall", "In a foxhole you dug the night before after calling 1-(800) 344-7483 with your battle buddy (secretly homo)", "At my next concert", "At a house party", "In a dorm room", "On a football field", "In a cornfield. Watch out for @Jonsie", "In a cornfield. Watch out for @Jonsie. He likes to join in at the worst possible moment", "In the rice fields, motherfucker", "At your doctor's office", "At the DMV", "At the family reunion where you just met"],
	"Why you gotta be so mean?": ["You aren't worth the 0.00001c of server time it took to send this message", "You know how they say you're dark and handsome? They're wrong. You aren't even handsome in the dark.", "Because you're a fucking faggot.", "Because fuck you, that's why.", "Go fuck yourself.", "Because you touch yourself at night.", "We all get why your dad never came back from getting cigarettes now.", "Don't make me get my lawyers involved.", "Fuck off, retard.", "Like, what the fuck did you just fucking say about me, you little bitch? I'll have you know I am the most Basic Bitch to ever grace the music industry, and I've been involved in numerous Grammy Awards party nights, and I have over 300,000 confirmed SnapChat followers. I am trained in choreography and I'm the top female artist in the entire fucking world.  You are nothing to me but just another dollar sign.  I will wipe you the fuck out with a Twitter tag the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over Discord?  Think again, bitch. As we speak, I am contacting my secret squad of thots across the USA and your significant other is being sent nudes right now, so you better prepare for the storm, cocksucker:  The storm that wipes out the pathetic little thing you call your relationship. You're getting fucking dumped, kid. I can be anywhere, anytime, and I can put your fashion to shame with over seven hundred outfits, and that's just with my leotards.  Not only am I extensively trained in modeling for Victoria's Secret, but I have access to the entire subscriber base to my Tumblr page and I will use them to their full extent to wipe your flat ass off the face of the continent, you fucking thot. If only you could have known what savage retribution your little 'cute' comment was about to bring down upon you, maybe you would have held your fucking tongue but you can't even. You didn't, and now you're paying the price, you stupid whore. I will spread rumors all over and you will drown in them. We are never, ever ever getting back together, kiddo.", "You're a liar and pathetic.", "If a man talks shit, then I owe him nothing.", "You said I was obsessive and crazy.", "Your dog didn't run away, it killed itself.", "Grandma went into the nursing home specifically because she knew you'd never visit.", "I bet you could suck ten dicks in two minutes.", "I will end you.", "They're pity-fucking you and feel trapped because they think you'll kill yourself if they leave.", "You were dropped as a child.", "#metoo", "You look like a bitch.", "You're why we can't have nice things.", "One can only hope you have evidence leading to the arrest of Hillary Clinton so we won't have to put up with your shit much longer.", "You're the person people tell their kids they'll end up like if they don't go to school.", "If I had a terminal illness and the entire Avengers Cast walked into my room to ask what I wanted, I'd tell them to find a way to give you whatever it was that I had.", "Do you suck dicks?", "You ever get that suspicion people are only nice to you because they think you're retarded?  You're not wrong.", "If someone kicked your teeth in, it would be an improvement.", "Half of the people in here have you muted or just ignore you.", "You're a fucking retard.", "Go be retarded somewhere else.", "Why don't you just shut the fuck up and stop annoying everyone else?", "The only reason anyone keeps talking to you is because they think it would be too rude to stop once they started.", "You aren't even good enough to be hated. You're just sad.", "The only time someone thinks of you is when they need someone to pity.", "Everything out of your mouth isn't worth the time it took to say it.", "The only reason you were in a relationship is because you destroyed your partner's self confidence so badly they were afraid to date someone else.", "It's rude enough being alive when nobody wants you.", "Everyone who has ever left you was right.", "When you're being retarded, you're exceeding my expectations.", "I pity you.", "If I had an ass that looked like your face, I'd be ashamed to shit.", "You look like a smashed sack of assholes.", "Nobody cares about you enough to betray you.", "I wish I could be indifferent to you."]
}

retortCommands = {
	"=wuteat": {
		whitelist: GENERAL_WHITELIST,
		text: "%wuteat%"
	},
	"=wutdrink": {
		whitelist: GENERAL_WHITELIST,
		text: "%wutdrink%"
	},
	"=howfuck": {
		whitelist: GENERAL_WHITELIST,
		text: "%howfuck%"
	},
	"=wherefuck": {
		whitelist: GENERAL_WHITELIST,
		text: "%wherefuck%"
	},
	"=wutmeal": {
		whitelist: GENERAL_WHITELIST,
		lowerCase: true,
		text: `Try %wuteat% with some %wutdrink% to wash it down`
	},
	"=nightin": {
		whitelist: GENERAL_WHITELIST,
		lowerCase: true,
		text: "%howfuck% %wherefuck"
	},
	"=datenight": {
		whitelist: GENERAL_WHITELIST,
		lowerCase: true,
		text: `Try %wuteat% with some %wutdrink% to wash it down. Then later, %howfuck% %wherefuck%`
	},
	"=datenight-restricted-carer": {
		whitelist: GENERAL_WHITELIST,
		lowerCase: true,
		text: `Try %wuteat% with some %wutdrink% to wash it down. Then later, analingus %wherefuck%`
	},
	"Why you gotta be so mean?": {
		text: "%Why you gotta be so mean?%"
	},
	"=x": { text : "https://i.imgur.com/A2B0rnN.png" },
	"=dragonbbq": { text: "https://i.imgur.com/LJ4HLNZ.png" },
	"=tikka": { text : "https://i.imgur.com/aJS28DZ.png" },
	"=modcaboose": { text : "https://i.imgur.com/UpO2AFh.png" },
	"=rtmsass": { text : "https://i.imgur.com/ohljfpZ.png" },
	"=922r": { text : "https://i.imgur.com/mDYy8Xr.png" },
	"=erpderp": { text : "https://i.imgur.com/2RUvszk.png" },
	"=oldsie": { text : "https://i.imgur.com/qbsfTMs.png" },
	"=hesalite": { text : "https://media.discordapp.net/attachments/615700979123486721/615719757022232598/BARLOL2.png" },
	"=glock19": { text : "https://i.imgur.com/6ElOaLM.png" },
	"=pager": { text : "https://i.imgur.com/mt1MSYX.png" },
	"=monkeymasher": { text : "https://i.imgur.com/GBEI9ib.png" },
	"=sane": { text : "https://i.imgur.com/3zJ8FJl.jpg?2" },
	"=riotjuice": { text : "https://i.imgur.com/lYUXY35.png" },
	"=bluedrank": { text : "https://i.imgur.com/Bcy16QG.jp" },
	"=bartbeer": { text : "https://media.discordapp.net/attachments/615700979123486721/615719067495563294/BARTLOL.png" },
	"=bartban": { text : "https://i.imgur.com/Bc9rX2H.jpg" },
	"=omniban": { text : "https://i.imgur.com/BMExyVn.png" },
	"=pestban": { text : "https://i.imgur.com/Ic71HC1.jpg" },
	"=phtevenban": { text : "https://i.imgur.com/HYvk2pe.png" },
	"=larue": { text : "https://i.imgur.com/DKJZG8G.png" },
	"=omniball": { text : "https://i.imgur.com/WlHSFmX.png" },
	"=seaban": { text : "https://i.imgur.com/ZVQAH7M.png" },
	"=jonsie": { text : "https://i.imgur.com/V7F6E92.png" },
	"=brinnels": { text : "https://i.imgur.com/wQw7ljg.png" },
	"=bagel": { text : "https://i.imgur.com/gN6InD2.jpg" },
	"=headtap": { text : "https://media.discordapp.net/attachments/615700979123486721/615717723988688907/download_1.jpg" },
	"=nothan": { text : "https://i.imgur.com/CDiCyc8.jpg" },
	"=uhoh": { text : "https://media.discordapp.net/attachments/615700979123486721/615717027113467920/uhoh.png" },
	"=hopstop": { text : "https://cdn.discordapp.com/attachments/263696433591484416/557726736499081216/hopstop.png" },
	"=omnigag": { text : "https://media.discordapp.net/attachments/615700979123486721/615717017499992074/omniball.jpg" },
	"=bubba": { text : "https://i.imgur.com/G2esYMj.png" },
	"=omni": { text : "https://media.discordapp.net/attachments/615700979123486721/615717013628649474/image.jpg" },
	"=hop": { text : "https://i.imgur.com/OpeNMvT.png" },
	"=xod": { text : "https://i.imgur.com/KbwrDEe.png" },
	"=spaceytoxins": { text : "https://i.imgur.com/RSvJvJO.png" },
	"=slew": { text : "https://cdn.discordapp.com/attachments/615700979123486721/634446249713467392/unknown.png" }
}
