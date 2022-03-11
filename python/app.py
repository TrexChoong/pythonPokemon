
import os
from copy import deepcopy
from datetime import datetime, timedelta
from Modules.getPokemon import get_pokemon
from Modules.getEncounters import get_encounters
from Modules.displayPokemon import display_pokemon
from Modules.storePokemon import read_pokemon, append_pokemon, replace_pokemon

first = False
replace = False
cache = ""
if os.stat("cachedPokemon.txt").st_size > 0:
    cache = read_pokemon("cachedPokemon.txt")
else:
    first = True
print("Welcome to Pokemon Guide")
search = input("Search for a pokemon: ")

# -----------------------------------------------------------------------------
# todo: test input for expired, remove at production
if search == "expired":
    pokemon = get_pokemon("bulbasaur", True)
    # determine kanto encounters
    if pokemon:
        # print("Check A, code={}".format(pokemon.name))
        encounters = get_encounters(pokemon.encounterUrl)
        pokemonEncounter = display_pokemon(pokemon, encounters, False)
        append_pokemon("cachedPokemon.txt", pokemonEncounter, first)
        exit()
# -----------------------------------------------------------------------------

pokemonCached = ""
# iterate cache
for x in cache:
    # print("Check cache, code={}".format(x.name))
    # print("Check cache id, code={}".format(x.ID))
    # print("Check cache datetime, code={}".format(x.datetime))
    if (x.name == search) or (str(x.ID) == search):
        # print("Check cache datetime, code={}".format(x.datetime))
        # replace if older than 7 days
        expired = datetime.now() - timedelta(days=7)
        # print("Check delta datetime, code={} {}".format(expired, datetime(2021,7,12)<expired))
        if x.datetime < expired:
            replace = True
        pokemonCached = x

if (pokemonCached == "") or (replace == True):
    pokemon = get_pokemon(search, False)
    # determine kanto encounters
    if pokemon:
        # print("Check A, code={}".format(pokemon.name))
        encounters = get_encounters(pokemon.encounterUrl)
        pokemonEncounter = display_pokemon(pokemon, encounters, False)
        if replace == False:
            append_pokemon("cachedPokemon.txt", pokemonEncounter, first)
        else:
            # search and replace existing pokemon
            cacheModified = deepcopy(cache)
            # print("Check copied cache, code={}".format(cacheModified))
            for x in cacheModified:
                if (x.name == search) or (str(x.ID) == search):
                    x.datetime = datetime.now()
                    # print("Check cache datetime, code={}".format(x.datetime))
            # print("Check modified cache, code={}".format(cacheModified))
            print("Updating pokemon in cache...")
            replace_pokemon("cachedPokemon.txt", cacheModified)
else:
    print("Reading pokemon from cache...")
    display_pokemon(pokemonCached, pokemonCached.encounter, True)
    