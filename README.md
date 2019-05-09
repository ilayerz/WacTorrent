# WacTorrent

WacTorrent en ExpressJs + Socket.Io + Electron

Pour lancer ExpressJS:

<pre>
cd electron-quick-start/resources/app/myapp
npm install
npm start
</pre>

De base, ExpressJS sera sur localhost:3000 MAIS Socket.IO est sur le port 3010
Donc pour accéder à la page depuis le web ça sera sur <b>localhost:3010</b>

Pour lancer électron:

<pre>
cd electron-quick-start
npm install
npm start
</pre>

Electron permet de faire une appli depuis un fichier html ou depuis une url, du coup, on se sert de notre localhost:3010.
Electron ecoutera cette url et fera comme si on était sur un navigateur web.
