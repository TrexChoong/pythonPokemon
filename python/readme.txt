This program is written in Python 3.9.6

Steps to run program:
1. navigate to project directory
2. install requirements with "pip3 install -r requirements.txt" or "pip install -r requirements.txt"
3. run program with "python3 app.py" or "python app.py"

Test flow:
1. Clear all text from cachedPokemon.txt
2. First query from any pokemon registers entry in cachedPokemon.txt
3. Repeated query reads from cache
4. To test for expired behaviour, make sure there is no 001 bulbasaur entry cached, then enter expired, this will enter a 001 bulbasaur entry dated at 1/8/2021. Doing another search for bulbasaur will now trigger the cache update

Development Thoughts:
Due to the scale of the program, the optimization of module directory could be further divided to pokemon and encounter relative to classes. Same goes to app.py that are suppose to breakdown according to scale.

Print() are being left intact to represent Test Driven Development and serve as a potential guide for writing tests. 