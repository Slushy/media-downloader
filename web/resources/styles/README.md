# Style Architecture

Following a SMACSS structure with BEM naming conventions

## Example Folder Structure
```
-- base/
    |-- _functions.scss
    |-- _mixins.scss
    |-- _variables.scss
    |-- _base.scss

-- layout/
    |-- _grid.scss
    |-- _header.scss
    |-- _sidebar.scss

-- module/            # holds micro layout styles, e.g. button layouts, navigations
    |-- _buttons.scss
    |-- _forms.scss

-- state/             # holds specific state code, e.g. how buttons look on hover
    |-- _state.scss
    
-- _shame.scss         # holds any temporary hacks that are intended to be fixed later
-- main.scss           # imports all styles
```
