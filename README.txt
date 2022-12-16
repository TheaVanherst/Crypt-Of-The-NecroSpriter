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
- Background image selection and toggle with the character preview.
    - 'Dance Floor' toggle and preview.
- Render speed slider based on beats per minute, based on tracks featured in that game.
    - A list of tracks featured in the game at each BPM step of 5, including bosses.

                                             INSTRUCTIONS:

To currentCharacter your animations, replace the spritesheets in the 'Characters' folder, and refresh the page.
After the page is refereshed, select the character your spritesheet has replaced to preview it in the
left hand window.

if you want any assistance in using the tool, designing sprites or have any
recommendations for the sprite renderer, contact me on Twitter or my discord TheaVanherst#1953.

                                               UPCOMING:

- A Working Scaling feature, with a slider to change the resolution size of the left hand side preview.
- Adding a working Armour, Weapon and tool slots to be togglable for the left hand side preview.
    # A weapon complete weapon, food and scroll selector in a new UI menu.
- A complete redesign and rehaul of how background mapping is applied.
    - Split the floor textures to individual images, to make them tileable.
- Add a foreground to the render preview, to show a closer resemblance to how sprites are rendered ingame.
- Selecting the "Amplified" mode will automatically toggle to Zone 5.
    - Amplified ground cable with accompanying sprite animation.
# A smaller preview window to accurately depict what the sprite looks like in game.
- Fix the pixel offset between the playerModel model and the ground texture to be flush and aligned correctly.