def display_pokemon(pokemon, encounters, cached):
    # output data
    print("Search completed:")
    print("Pokemon id : {}".format(pokemon.ID))
    print("Name : {}".format(pokemon.name))
    print("Type : {}".format(pokemon.element))
    # output encounters
    encountersString= ""
    if (encounters != False) and (cached == False):
        for x in encounters:
            methodString = ""
            for y in x.methods:
                methodString+= y
            encountersString+= x.name+"("+methodString+") "
        # fix failed kanto encounter search
        if encountersString == "":
            encountersString= "-"
    else:
        encountersString= "-"
    pokemon.encounter = encountersString
    print("Encounters : {}".format(encountersString))
    # output stats
    statString = ""
    stats = vars(pokemon.stat)
    statString+= "".join("\n%s: %s" % item for item in stats.items())
    print("Stats :{}".format(statString))
    return pokemon