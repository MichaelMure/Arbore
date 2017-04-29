<p align="center">
<img src='https://raw.githubusercontent.com/MichaelMure/Arbore-qt/master/resources/logo/arbore-prelogo.png'>
</p>

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/TotallyNotArbore/Lobby)

## DESCRIPTION

Arbore is a peer-to-peer file sharing application with the following caracteristics:
- targeted for private/low diffusion data between people that know each-others. Main use case: friends want to share between each-others their holidays pictures.
- low friction: it should be as easy as possible
- encryption should be used to maintain privacy and to control the diffusion of the data

This application will be build on top of [IPFS](http://ipfs.io/).

![login snapshot](https://raw.githubusercontent.com/MichaelMure/TotallyNotArbore/5ffc00385bd863596038dc1546fb2b8e90d3cc8f/resources/arbore%20login%20page.png)

![registration snapshot](https://github.com/MichaelMure/TotallyNotArbore/blob/5ffc00385bd863596038dc1546fb2b8e90d3cc8f/resources/arbore%20registration%20page.png)

![sharing snapshot](https://github.com/MichaelMure/TotallyNotArbore/blob/5ffc00385bd863596038dc1546fb2b8e90d3cc8f/resources/arbore%20sharing%20page.png)

## FEATURES

Arbore v1.0 (release date: TBD)  
* Arbore is a desktop application (Windows, Mac, Linux compatible)  
* allows digital file sharing (e.g. holiday pictures)     
* uses a P2P (peer-to-peer) network  
P2P means a decentralized solution  
(avoids centralized servers hosted by private corporations  
that can claim rights to and access your private data)   
P2P means there is no file size limitations to the data shared.  
* Social F2F (friend-to-friend) capabilities  

This application is written with Javascript x.x  

Arbore is built on top of the [IPFS (InterPlanetary File System)](http://ipfs.io/) protocol:  
[(Learn more about IPFS on Wikipedia)](https://en.wikipedia.org/wiki/InterPlanetary_File_System)  

## GETTING STARTED
Clone this repo to your desktop and run `npm install` to install all the dependencies.

To run the developement version, run `npm run dev`

## ROADMAP

### Version 1 (minimal first version)
* profile management
* basic contact management (adding with a hash)
* targeted sharing (notification and download)

### Version 2 (encryption and chat)
* encryption (IPFS is currently working on encryption)
* basic 1 to 1 chat (not really a priority but it actually helps me to test ipfs's pubsub and the rest is not that difficult)

### Version 3
### contact-related features: 
* public sharing and contact following (kind of like Twitter)
* contact suggestion and privacy settings
* contact blocking (for abuse)
* contact groups
* contact management: mitigation strategy (maintaining your contacts files online because you like them)
* profile "migration" with notification of contacts
* on-demand custom app packaging with a first contact for extra-simple onboarding

### content-related features:
* reliable and efficient download status tracking (when available; details ipfs/go-ipfs#3866)
* reception confirmation
* content: re-share
* better share description, maybe with markdown ?
* content: fancy share's content visualization (for instance, for pictures with a slideshow or carousel)
* internationalization

### misc:
* mobile version using react native
* enhanced chat (offline, history, group chat, encryption ...) maybe using orbit.chat
* ability to close the main windows while still having the app running + system tray icon with stats

## License
>You can check out the full license [here](https://github.com/MichaelMure/TotallyNotArbore/blob/master/LICENSE)

This project is licensed under the terms of the **GPL v3** license.

## Questions/feedback (or just want to help out?)
Every little bit of help counts!  

If you want to build something awesome or help out in any other way, please [contact us](https://gitter.im/TotallyNotArbore/Lobby) :)
