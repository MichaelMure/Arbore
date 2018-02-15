<p align="center">
<img src='https://raw.githubusercontent.com/MichaelMure/Arbore-qt/master/resources/logo/arbore-prelogo.png'>
</p>

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Arbore/Lobby)
[![codebeat badge](https://codebeat.co/badges/b645c684-c495-4010-87aa-54829b6e4279)](https://codebeat.co/projects/github-com-michaelmure-totallynotarbore-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1e15cfc3aa7e4bae9662d035ed720b0d)](https://www.codacy.com/app/batolettre/Arbore?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MichaelMure/Arbore&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/MichaelMure/Arbore.svg?branch=master)](https://travis-ci.org/MichaelMure/Arbore)
[![GitHub (pre-)release](https://img.shields.io/github/release/MichaelMure/TotallyNotArbore/all.svg)](https://github.com/MichaelMure/Arbore/releases/latest)

Arbore is a peer-to-peer file sharing application with the following caracteristics:
- targeted for private/low diffusion data between people that know each-others. Main use case: friends want to share between each-others their holidays pictures.
- low friction: it should be as easy as possible
- encryption should be used to maintain privacy and to control the diffusion of the data

This application is build on top of [IPFS](http://ipfs.io/).

----> [Download it here !](https://github.com/MichaelMure/Arbore/releases/latest) <----

![identity creation](https://user-images.githubusercontent.com/294669/29781730-2c971282-8c55-11e7-8725-b957a9a89b25.png)

![login](https://user-images.githubusercontent.com/294669/29781741-3082e4a2-8c55-11e7-9558-7a9ee8e68f3c.png)

![sharing](https://user-images.githubusercontent.com/294669/29781805-5d6a42da-8c55-11e7-9d9e-173c581cea99.png)

![shares](https://user-images.githubusercontent.com/294669/29781769-3f64b40a-8c55-11e7-95ef-f75292758c7d.png)

![chat](https://user-images.githubusercontent.com/294669/29781783-487a3ff6-8c55-11e7-9ec5-2a39b66ee50f.png)

## GETTING STARTED

1. Clone or download this repository
2. run `npm install` to install all the dependencies.
3. run `npm run dev` to launch the developement version

Installation package will be provided later.

## ROADMAP

### Version 1 (minimal first version)
* profile management
* basic contact management (adding with a hash)
* contact suggestion and privacy settings
* targeted sharing (notification and download)
* basic 1 to 1 chat

### Version 2 (encryption and chat)
* encryption (IPFS is currently working on encryption)

### Version 3
### contact-related features: 
* public sharing and contact following (kind of like Twitter)
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
>You can check out the full license [here](https://github.com/MichaelMure/Arbore/blob/master/LICENSE)

This project is licensed under the terms of the **GPL v3** license.

## Questions/feedback (or just want to help out?)
Every little bit of help counts!  

If you want to build something awesome or help out in any other way, please [contact us](https://gitter.im/Arbore/Lobby) :)
