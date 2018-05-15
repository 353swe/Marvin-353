
# Marvin-353
<!--- Il nome è abbastanza carino per Elena --->
<!--- Davanti ai nomi propri di persona, anche femminili, non va l'articolo. --->
# Group 353

Members of group 353:

 - [Cailotto Mirco](https://github.com/M9k)
 - [Giorato E. Riccardo](https://github.com/Giorat)
 - [Marcon Valentina](https://github.com/ValeMarcon)
 - [Marraffa Gianluca](https://github.com/gmarraffa)
 - [Mattiazzo Elena](https://github.com/elenamattiazzo)
 - [Singh Parwinder](https://github.com/SinghParwinder)
 - [Stocco Davide](https://github.com/Stocci)


Installation
============

Software Requirements
---------------------

-   Python 2.X (NOT 3.X)
-   Node
-   Yarn or NPM (recommended Yarn on Windows)
-   [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/) (v.52
    or more) or [Google Chrome](https://www.google.com/intl/en/chrome/)
    (v.57 or more)
-   A MetaMask digital wallet

**WARNING:** If you use a mobile device, like a smartphone or a tablet,
you need to use Mozilla Firefox.\
In addition to these, there is the need to have a C language compiler,
which is used for the compilation of web3 library.\
Under Linux system the compilation uses GCC, under \*BSD system it can
use both GCC or Clang, either works fine, the default one provided with
the system should work without any problem, otherwise install GCC.\
Under Windows the required C compiler is MSCV, other compilers will not
be recognized. To install MSVC, the required library and Python
automatically you can run the following command after the installation
of Node and Yarn (or NPM):

    yarn install --global --production windows-build-tools

or

    npm install --global --production windows-build-tools

If the last version of Node doesn't work correctly, especially under
\*BSD system, update and upgrade the system itself by following their
respective support guides on official websites, because it can require
some new library not present in older systems.

Requirements for Windows
------------------------
-   Operative systems: Windows 7, 8 or 10, 32-bit or 64-bit;
-   Processor: Pentium 4 or newer processor that supports SSE2;
-   RAM: 1GB of RAM / 2GB of RAM for the 64-bit version;
-   Hard drive: 1GB of hard drive space;
-   Internet connection: required for resolve dependencies.

Requirements for Mac
--------------------

-   Operative systems: macOS 10.9 or higher;
-   Processor: Intel x86 processor;
-   RAM: 512MB of RAM;
-   Hard drive: 1GB of hard drive space;
-   Internet connection: required for resolve dependencies.

Requirements for Linux and BSD
------------------------------

-   GTK+: 3.4 or higher;
-   GLib: 2.22 or higher;
-   Pango: 1.14 or higher;
-   X.Org: 1.0 or higher (1.7 or higher is recommended);
-   libstdc++: 4.6.1 or higher;
-   Processor: Pentium 4 or newer processor that supports SSE2;
-   RAM: 512MB of RAM;
-   Hard drive: 1GB of hard drive space;
-   Internet connection: required for resolve dependencies.

Set up
------

Download and unzip Marvin folder, copy it from the CD attached to the
documentation, if present, or download it through Git using the
following command:

    git clone https://github.com/353swe/Marvin-353.git

Then enter the folder and download all the required node-modules using
npm or yarn:

    cd Marvin-353
    yarn install

or

    cd Marvin-353
    npm install

In case of problems check that all the requirements are fulfilled, work
fine and are included in the PATH environment variable. For more
information about the environment variables see the help of your
operating system.

Run
---

To run Marvin, at first run a local Ethereum blockchain with the
following command, if on Windows:

    yarn run testrpc-win

or, on Linux or BSD:

    yarn run testrpc

If do you prefer npm to yarn, just change \"yarn\" with \"npm\" in the commands.

Then migrate the university contract on the blockchain:

    yarn run migrate

Finally compile and start Marvin in develop mode:

    yarn run start

At this point the default browser will open on the page
<http://127.0.0.1:8080>, if it doesn't happen then open it manually.\
MetaMask has to be set to use the local network, for further info read
the user guide.

Deploy on Ropsten Infura
------------------------

First sign up an Infura account using this link:
<https://infura.io/signup>.\
Once it's done, write down the personal Api Key given by Infura for the
Ropsten Network. It can be read in the given URL, for example
http://ropsten.infura.io/XXXX, where the XXXX is the key.
Then open the file \"truffle.js\" in the root of Marvin, insert the Api
Key after infura\_apikey and insert a mnemonic of an Ethereum address
with some funds on the Ropsten network.
Free Eth for the Ropsten network can be acquired from
<https://faucet.metamask.io>.

Now all is ready to migrate the university contract on the Ropsten
blockchain:

    yarn run migrateropsten


To build Marvin in such a way that it can use the deployed contract just
run:

    yarn run build-prod

It will generate the static page into the folder \"dist\", ready to be
uploaded to any host, for example <http://Surge.sh>.\
To get further info about Surge.sh you can read the official guide on
<https://surge.sh/help/getting-started-with-surge>, the deploy can be
automatically done from Travis or other CI platform.


Donation
============
Ethereum: 0xd5BF166370Ff79A1854a4CACfE583973D337Fbcb \
BitCoin: 1AL37969Wuky8mg6TLYxryiCs4nXY6qE8E
