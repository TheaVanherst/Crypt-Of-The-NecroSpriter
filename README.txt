        ██████╗██████╗ ██╗   ██╗██████╗ ████████╗     ██████╗ ███████╗    ████████╗██╗  ██╗███████╗           
       ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝    ██╔═══██╗██╔════╝    ╚══██╔══╝██║  ██║██╔════╝           
       ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║       ██║   ██║█████╗         ██║   ███████║█████╗             
       ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║       ██║   ██║██╔══╝         ██║   ██╔══██║██╔══╝             
       ╚██████╗██║  ██║   ██║   ██║        ██║       ╚██████╔╝██║            ██║   ██║  ██║███████╗           
        ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝        ╚═════╝ ╚═╝            ╚═╝   ╚═╝  ╚═╝╚══════╝           
                                                                                                              
       ███╗   ██╗███████╗ ██████╗██████╗  ██████╗ ███████╗██████╗ ██████╗ ██╗████████╗███████╗██████╗         
       ████╗  ██║██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██╔════╝██╔══██╗        
       ██╔██╗ ██║█████╗  ██║     ██████╔╝██║   ██║███████╗██████╔╝██████╔╝██║   ██║   █████╗  ██████╔╝        
       ██║╚██╗██║██╔══╝  ██║     ██╔══██╗██║   ██║╚════██║██╔═══╝ ██╔══██╗██║   ██║   ██╔══╝  ██╔══██╗        
       ██║ ╚████║███████╗╚██████╗██║  ██║╚██████╔╝███████║██║     ██║  ██║██║   ██║   ███████╗██║  ██║        
       ╚═╝  ╚═══╝╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝        
                                                       
                       A Javascript Crypt Of The Necromancer Spritesheet Renderer

                                               FEATURES:

- Character selection from the base game, Amplified DLC and the Synchrony DLC.
- Dynamic clothing selection, based on the character selected.
    - 'Amplification mode' toggle and preview from the Amplified DLC.
- Equipment animation preview with character specific offsets & settings.
    - Helmet, Weapon, Wrist and Boot equipables.
    - Charm, Shovel, Torch and Hip equipables.
    - Special and Shield toggles equipables.
- Allows directory changes between individual items.

- Background image selection and toggle with the character preview.
    - 8 different floor types, including a dance floor mode and a multiplier mode.
- Foreground render preview, to show a closer resemblance to how sprites are rendered ingame.
    - 10 total foregrounds included by default with additional expandability.

- Individual frame selecting, alongside render previewing based on BPM.
- Render speed slider based on beats per minute, based on tracks featured in that game.
    - A list of tracks featured in the game at each BPM step of 5, including bosses.
- Scaling feature, with a slider to change the resolution size of the left hand side preview.
- Two different render modes, linear and the more accurate in-game beat driven render.



INSTRUCTIONS:

To test your animations, replace the spritesheets in the 'Characters' folder, and click the refresh icon under the render preview.
Refreshing the page will do the same thing, although may reset custom directory enteries you may have inserted for that character
  as no cookie system is currently present in the current version of the software.

Feel free to insert new character sheets or items into the folder you want to assosiate the directory to.
If you're using already existing spritesheets in the folder, you can just use the character selector to change to the assosiated spritesheet.

You can also change them using the URL directory by just typing the directory it's in and the file name + format.
Examples of how to specify the directory are displayed in the text-boxes beforehand as an example.
Eg; "file root"/"imagename"."format".

NOTES:

Each spritesheet is individually programmable per character based on the directory.
So if you wish to change the spritesheet directory for a specific character, select the character you wish to change, 
  and type it in the assosiated field, you then can change character to whomever you want and the directory data will be locally stored. 
If you wish to reset the custom enteries, simply refresh the page and everything will be set back to the default directories.

Different characters have different file formatting, so be aware of the file naming convetions Crypt of the Necrodancer has, 
  as a lot of these adjustments are pre-baked into the code to try and compensate for such. 
  So I would just recommend to not try to change the naming convention too much.

Directories on launch are determined by the data that is in 'JS_Libraries/characterData.js'.
Change the url directory and save, on page refresh it will then default to the new directory you inserted.

UPCOMING:
                                               
- Selecting the "Amplified" mode will automatically toggle to Zone 5.
    - Amplified ground cable with accompanying sprite animation.
- Add a URL changer for individual characters.
- Rework the Unique Equipables



if you want any assistance in using the tool, designing sprites or have any
recommendations for the sprite renderer, contact me on Twitter or my discord TheaVanherst#1953.
