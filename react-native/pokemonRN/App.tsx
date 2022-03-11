/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   Image,
   View,
   Modal,
   Button,
   Alert,
   Pressable,
   FlatList,
   TextInput
 } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data')
      let result = null
      if(jsonValue != null){
        result = JSON.parse(jsonValue)
      }
      // console.log('get data json: ',JSON.parse(jsonValue));
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      return result;
    } catch(e) {
      // error reading value
    }
  }
  const storeData = async (value) => {
    console.log('trigger save data:', value);
    try {
      let checkFirst = Array.isArray(value);
      let jsonValue = JSON.stringify(value)
      if (checkFirst == false) {
        jsonValue = '[' + jsonValue + ']';
      }
      console.log('save data:', jsonValue);
      await AsyncStorage.setItem('data', jsonValue)
    } catch (e) {
      // saving error
      console.log('save error:', e);
    }
  }

  const Separator = () => (
    <View style={styles.separator} />
  );
  
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   const [modalVisible, setModalVisible] = useState(false);
   const [modalCacheVisible, setModalCacheVisible] = useState(false);
   const [searchPokemon, setSearchPokemon] = useState("");
   const [cachePokemon, setCachePokemon] = useState(null);
   const [displayPokemon, setDisplayPokemon] = useState("");
 
   const Item = ({ data }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        setDisplayPokemon(data);
        setModalCacheVisible(false);
      }}
    >
    <Text style={styles.title}># {data.id} {data.name}</Text>
    </Pressable>
  );

   useEffect(() => {
    getData().then((data) => {
      setCachePokemon(data);
      // console.log('promise result: ', data);
    });
    }, []);
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Text style={styles.titleHeader}>Welcome to PokeAPI</Text>
         <Image
           resizeMode="contain"
           style={styles.titleBanner}
           source={{uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'}}
         />
         <View style={styles.displayArea}>
         {displayPokemon == "" ? (
            <Text style={styles.emptyText}>Click the purple button to start a new search</Text>
            ) :
         (displayPokemon === "error" ? (
                  <Text style={styles.errorText}>Sorry, this pokemon is not available or the search is invalid</Text>
                ) : (
                  <>
                    <Text style={styles.displayText}># {displayPokemon.id} {displayPokemon.name}</Text>
                    <Image
                      resizeMode="contain"
                      style={styles.spriteBanner}
                      source={{uri: displayPokemon.sprite}}
                    />
                    <Text style={styles.displayText}>Type: {displayPokemon.type}</Text>
                    <Text style={styles.displayText}>Hp: {displayPokemon.Hp}</Text>
                    <Text style={styles.displayText}>Atk: {displayPokemon.Atk}</Text>
                    <Text style={styles.displayText}>Def: {displayPokemon.Def}</Text>
                    <Text style={styles.displayText}>S.Atk: {displayPokemon.S_Atk}</Text>
                    <Text style={styles.displayText}>S.Def: {displayPokemon.S_Def}</Text>
                    <Text style={styles.displayText}>Spd: {displayPokemon.Spd}</Text>
                  </>
                ))
         }
         </View>
         <Button
           onPress={() => setModalVisible(true)}
           title="Click to start"
           color="#841584"
           accessibilityLabel="Start searching for pokemon"
         />
         <Separator />
         <Button
           onPress={() => {
             if(cachePokemon!=null) {
               console.log('check cache:', cachePokemon);
              setModalCacheVisible(true);
             }
           }}
           title="Read data"
           color="green"
           accessibilityLabel="Load previous searches"
         />
         <Separator />
         <Button
           onPress={() => {
             AsyncStorage.clear();
             setCachePokemon(null);
            }}
           title="Clear data"
           color="red"
           accessibilityLabel="Clear previous searches"
         />
       </ScrollView>
       <Modal
           animationType="slide"
           transparent={true}
           visible={modalVisible}
           onRequestClose={() => {
             Alert.alert("Modal has been closed.");
             setModalVisible(!modalVisible);
           }}
         >
           <View style={styles.centeredView}>
             <View style={styles.modalView}>
               <Text style={styles.modalText}>Enter a pokemon or id: </Text>
               <TextInput
                 style={styles.input}
                 onChangeText={setSearchPokemon}
                 value={searchPokemon}
                 autoFocus={true}
               />
               <Pressable
                 style={[styles.button, styles.buttonClose]}
                 onPress={() => {
                   let checkCached = false;
                   if(cachePokemon != null){
                    for(let x=0;x<cachePokemon.length;x++) {
                      if (cachePokemon[x].id == searchPokemon || cachePokemon[x].name == searchPokemon){
                        setDisplayPokemon(cachePokemon[x]);
                        console.log("Cache Loaded");
                        checkCached = true;
                      }
                    }
                   }
                   if(!checkCached){
                    fetch('https://pokeapi.co/api/v2/pokemon/'+searchPokemon, {
                     method: 'GET',
                     headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json'
                     },
                   }).then((response) => response.json())
                   .then(async(json) => {
                     let typeString = "";
                     for(let x=0; x<json.types.length; x++){
                       typeString += json.types[x].type.name + " ";
                     }
                     let display = {
                       'id': json.id,
                       'name': json.name,
                       'type': typeString,
                       'sprite': json.sprites.front_default,                      
                       'Hp': json.stats[0].base_stat,
                       'Atk': json.stats[1].base_stat,
                       'Def': json.stats[2].base_stat,
                       'S_Atk': json.stats[3].base_stat,
                       'S_Def': json.stats[4].base_stat,
                       'Spd': json.stats[5].base_stat,                      
                     }
                     console.log("check display:", display);
                     setDisplayPokemon(display);
                     console.log('check cached:', cachePokemon);
                     if (cachePokemon != null){
                       let temp = [];
                       for (let x=0; x<cachePokemon.length; x++){
                        console.log('caching:', cachePokemon[x]);
                        temp.push(cachePokemon[x]);
                       }
                       temp.push(display);
                       setCachePokemon(temp);
                       storeData(temp);
                     }
                     else{
                      setCachePokemon(display);
                      storeData(display);
                     }
                     try {
                       // AsyncStorage.clear();
                       // let temp = [];
                       // let store = temp.push(display);
                       // const jsonValue = JSON.stringify(store)
                       // await AsyncStorage.setItem('data', jsonValue)
                     } catch (e) {
                       // saving error
                     }
                     console.log('success');
                     return json;
                   })
                   .catch((error) => {
                     setDisplayPokemon("error");
                     console.error(error);
                   });
                   }
                   setModalVisible(!modalVisible);
                   setSearchPokemon("");
                 }
               }
               >
                 <Text style={styles.textStyle}>Search Now</Text>
               </Pressable>
             </View>
           </View>
         </Modal>
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalCacheVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Saved Pokemon</Text>
            <FlatList
                data={(cachePokemon!=null)?cachePokemon.length>1?cachePokemon.sort(function(a, b){return a.id - b.id}):[cachePokemon]:[]}
                renderItem={({ item }) => <Item data={item}/>}
                keyExtractor={item => item.id}
            />
          </View>
        </View>
      </Modal>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   titleHeader: {
     fontSize: 32,
     textAlign: "center"
   },
   titleBanner:{
     width: "50%",
     alignSelf: "center",
     height: 100,
   },
   spriteBanner:{
     width: "50%",
     alignSelf: "center",
     height: 150,
   },
   errorText:{
     fontSize: 36,
     textAlign: "center",
     color: "red",
   },
   emptyText:{
     fontSize: 36,
     textAlign: "center",
     color: "green",
   },
   displayArea: {
     height: 400,
   },
   displayText: {
     fontSize: 18,
     textAlign: "center"
   }, 
   input: {
     height: 40,
     margin: 12,
     borderWidth: 1,
     padding: 10,
   },
   centeredView: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     marginTop: 22
   },
   modalView: {
     margin: 20,
     backgroundColor: "white",
     borderRadius: 20,
     padding: 35,
     alignItems: "center",
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5
   },
   modalText: {
     marginBottom: 15,
     textAlign: "center"
   },
   buttonClose: {
     padding:15,
     borderRadius: 5,
     backgroundColor: "#2196F3",
   },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    title: {
      fontSize: 24
    }
 });
 
 export default App;
 