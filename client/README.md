# Structure of project:

Module looks like this:
  - %module_name%
    - index.js -- A module can export something.
    - components
      - %component_name%
        - "index.jsx?"
        - %component_name%.spec.js -- test files on jest.
        - images -- component images.
        - scss folder or "%component_name%.scss" file wich will import in "index.jsx?".
          - "index.scss"
          - "%your_file_name%.scss"
    - containers
    - "common.scss" -- common scss of module.
    - "utils.js" -- common js of module.
    - "constants.js" -- constants of module.
      
The core module -- common components, images, scss.

# Redux
  
We use the Ducks propsal:
    https://github.com/erikras/ducks-modular-redux
